import 'semantic-ui-css/semantic.min.css'

import { StoreContext, store } from './app/stores/store'

import App from './app/layout/App'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
)
