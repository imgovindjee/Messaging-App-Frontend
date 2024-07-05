import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'

import store from './redux/Store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
          <App />
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
