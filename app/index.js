import 'reset.css/reset.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MainApp from './main';

const el = document.getElementById('app');

render(
  <AppContainer>
    <MainApp />
  </AppContainer>, el);

if (module.hot) {
  module.hot.accept('./main', () => {
    const NextApp = require('./main').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      el
    );
  });
}
