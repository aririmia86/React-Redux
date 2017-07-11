import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Post from '../../posts/containers/Post';
import api from '../../api';
import Loading from '../../shared/components/Loading';
import styles from './Page.css';
import Title from '../../shared/components/Title';
import actions from '../../actions';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await api.posts.getList(this.props.page);

    this.props.dispatch(actions.setPost(posts));

    this.setState({
      loading: false,
    });
  }

  handleScroll() {
    if (this.state.loading) {
      return null;
    }

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    // Cuando el usuario este a menos de 300 pixeles del final, cargar nuevos posts
    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true },
      async () => {
        try {
          const posts = await api.posts.getList(this.props.page);

          this.props.dispatch(actions.setPost(posts));

          this.setState({
            loading: false,
          });
        } catch (error) {
          console.error(error);
          this.setState({
            loading: false,
          });
        }
      },
    );
  }


  render() {
    return (
      <section name="Home" className={styles.section}>
        <Title>
          <FormattedMessage id="title.home" />
        </Title>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  page: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    page: state.posts.page,
    posts: state.posts.entities,
  };
}

export default connect(mapStateToProps)(Home);
