import React from 'react';
import { render } from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import Pages from './pages/containers/Page.jsx';

render (
  <StaticRouter>
    <Pages />
  </StaticRouter>,
  document.getElementById('render-target'),
)