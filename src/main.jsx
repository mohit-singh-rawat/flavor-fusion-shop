import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

createRoot(document.getElementById("root")).render(
  <Provider store={configureStore({})}>
    <App />
  </Provider>
);
