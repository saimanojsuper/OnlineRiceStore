import {combineReducers} from 'redux';
import FetchProductReducer from './setProductReducer'



const allReducers = combineReducers( {
    fetchProductsFromRedux:FetchProductReducer
})

export default allReducers;
