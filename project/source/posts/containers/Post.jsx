import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';

class Post extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  async componentDidMount() {
    if (!!this.state.user && !!this.state.comments) {
      return this.setState({
        loading: false
      });
    }
    const [
      user,
      comments,
    ] = await Promise.all([
      //Promise.resolve(null) devuelve nulo
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
      api.posts.getComments(this.props.id),
    ]);

    this.setState({
      loading: false,
      //Si trajimos datos de usuario de esta peticion usamos dichos datos, si no los sacamos del estado
      user: user || this.state.user,
      comments: comments || this.state.comments,
    })
  }
  render() {
    return(
      <article id={`post-${this.props.id}`}>
        <Link to={`/post/${this.props.id}`}>
          <h2> {this.props.title} </h2>
        </Link>
        <p>
          {this.props.body}
        </p>
        {!this.props.loading && (
          <div>
            <Link to={`/user/${this.state.user.id}`}>
              {this.state.user.name}
            </Link>
            <span>
              Hay {this.state.comments.length} comentarios
            </span>
          </div>
        )}
      </article>
    )
  }
}

Post.propTypes= {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Post;
