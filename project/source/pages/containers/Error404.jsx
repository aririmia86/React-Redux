import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../shared/components/Title';

function Error404() {
  return (
    <section name="Error404">
      <Title>
        Error 404
      </Title>
      <Link to="/">
        Go back to home
      </Link>
    </section>
  );
}

export default Error404;
