import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

import App from './app/app';

import store from './store'
import { StoreProvider } from 'easy-peasy';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </StrictMode>
);
