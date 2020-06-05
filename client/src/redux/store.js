import { createStore } from 'redux';
import { colaboratorAction, productAction, orderProductAction, orderAction } from './actions'

const colaboratorReducer = (state = {}, action = {}) => {
    if (action.type === colaboratorAction.SET) {

        const temp = []
        action.colaborators.forEach(element => {
            temp.push({
                id: element.id,
                name: element.name,
                type: element.type
            })
        });


        state.colaborators = action.colaborators
        state.tableColaborators = temp
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
