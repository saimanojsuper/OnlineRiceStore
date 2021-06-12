import  React  from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {createStore} from 'redux';
import allReducer from './redux/reducers'
import {Provider} from 'react-redux'

const reduxStore = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
        <Provider store={reduxStore}>
           <App />
        </Provider>
, document.getElementById('root'));