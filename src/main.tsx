import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App, store } from './app'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
