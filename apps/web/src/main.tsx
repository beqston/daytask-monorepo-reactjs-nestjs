import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setupInterceptors } from "./api/api";
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// register interceptor Redux Store
setupInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}>
      <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);