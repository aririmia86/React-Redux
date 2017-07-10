import React, { PropTypes } from 'react';
import { FormattedHTMLMessage } from 'react-intl';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        <FormattedHTMLMessage
          id="comment.meta.author"
          values={{
            name: props.name,
            email: props.email,
          }}
        />
      </div>
      <p>
        {props.body}
      </p>
    </article>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default Comment;
