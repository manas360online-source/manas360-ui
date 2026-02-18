import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/i18n';
import './src/styles/accessibility.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import ErrorBoundary from './src/components/ErrorBoundary';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

const meta = import.meta as ImportMeta & { env?: { PROD?: boolean } };
const isProd = Boolean(meta.env?.PROD);
if ('serviceWorker' in navigator && isProd) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('[PWA] Service worker registration failed:', error);
    });
  });
}
