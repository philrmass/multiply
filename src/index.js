import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';

//import store from './redux/store';

import './styles/normalize.css';
import './styles/index.css';
import App from './components/App';

/*
 <Provider store={store}>
   <App />
 </Provider>,
*/
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

console.log('mulitply started');
