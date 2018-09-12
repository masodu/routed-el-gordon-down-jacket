import { combineReducers } from 'redux'
import productDetailReducer from './productDetails'

const rootReducer = combineReducers({
    productDetail: productDetailReducer,
})

export default rootReducer