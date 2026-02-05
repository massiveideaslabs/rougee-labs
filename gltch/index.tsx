import React from 'react';
import ReactDOM from 'react-dom/client';
import GltchApp from './GltchApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GltchApp />
  </React.StrictMode>
);
