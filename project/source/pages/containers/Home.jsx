import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../posts/containers/Post.jsx';
import api from '../../api.js';
import Loading from '../../shared/containers/Loading.jsx';
import styles from './Page.css';


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
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

    this.setState({
      loading: true,
      async () => {
        try {
          const posts = await api.posts.getList(this.state.page);
          this.setState({
            // Al array de posts anyadir al final los nuevos posts
            posts: this.state.posts.concat(posts),
            page: this.state.page + 1,
            loading: false,
          });
        }
        catch (error) {
          console.error(error);
          this.setState({
            loading: false
          });
        }
      }
    });
  }


  render() {
    return (
      <section name="Home" className={styles.section}>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>
      </section>
    );
  }
}

export default Home;
