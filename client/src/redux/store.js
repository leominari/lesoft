import { createStore } from 'redux';
import { colaboratorAction, productAction, orderProductAction, orderAction } from './actions'
import dOrder from '../components/data/dOrder'

const colaboratorReducer = (state = [], action = {}) => {
    if (action.type === colaboratorAction.SET) {
        state = action.colaborators
        return state;
    }
    return state;
}

const productReducer = (state = [], action = {}) => {
    if (action.type === productAction.SET) {

        const temp = []
        let key = 0
        action.products.forEach(element => {
            temp.push({
                key: key,
                id: element.id,
                name: element.name,
                price: element.price,
                unity: element.unity
            })
            key++
        });


        state.products = action.products
        state.tableProducts = temp

        return state;
    }
    return state;
}

const orderProductReducer = (state = [], action = {}) => {
    if (action.type === orderProductAction.ADD) {
        state.push(action.products)
        return state
    }

    if (action.type === orderProductAction.REMOVE) {
        const prods = state
        state = prods.filter(prod => prod.key != action.product)
        return state
    }

    return state;
}

const orderReducer = (state = [], action = {}) => {
    if (action.type === orderAction.SET) {
        state = action.orders
        return state;
    }

    return state;
}





export const ColaboratorStore = createStore(colaboratorReducer)
export const ProductStore = createStore(productReducer)
export const OrderStore = createStore(orderReducer)
export const OrderProductStore = createStore(orderProductReducer)
