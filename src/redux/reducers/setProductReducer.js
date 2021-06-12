import res from '../../api/items.json';

const productReducer = (initialState=res,action) =>{
    switch(action.type){
        case 'FETCH_PRODUCTS':
            return {
                 initialState:res
            }
        default: return{
            initialState
        }
    }
}

export default productReducer;