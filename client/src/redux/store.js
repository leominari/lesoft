import { createStore } from 'redux';
import { colaboratorAction, productAction, orderProductAction, orderAction } from './actions'

const colaboratorReducer = (state = [], action = {}) => {
    if (action.type === colaboratorAction.SET) {
        return [...action.colaborators];
    }
    return state;
}

const productReducer = (state = [], action = {}) => {
    if (action.type === productAction.SET) {
        return [...action.products];
    }
    return state;
}

const orderProductReducer = (state = [], action = {}) => {
    if (action.type === orderProductAction.ADD) {
        state.push(action.products)
        return state
    }

    if (action.type === orderProductAction.DELETE) {
        const prods = state
        state = prods.filter(prod => prod.key != action.product)
        return state
    }

    return state;
}

const orderReducer = (state = {}, action = {}) => {
    if (action.type === orderAction.SET) {
        return [...action.orders]
    }

    return state;
}





export const ColaboratorStore = createStore(colaboratorReducer)
export const ProductStore = createStore(productReducer)
export const OrderStore = createStore(orderReducer)
export const OrderProductStore = createStore(orderProductReducer)
