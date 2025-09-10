import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store/redux/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
