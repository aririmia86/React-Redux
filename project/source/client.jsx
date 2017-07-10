import React from 'react';
import { render } from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { StaticRouter } from 'react-router-dom';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import messages from './messages.json';

import Pages from './pages/containers/Page';

addLocaleData([...en, ...es]);

const locale = navigator.languages.indexOf('es') === 0
? 'es'
: 'en'
;

render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <StaticRouter>
      <Pages />
    </StaticRouter>
  </IntlProvider>,
  document.getElementById('render-target'),
);
