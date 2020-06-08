import { createStore } from 'redux';
import { colaboratorAction, productAction, orderProductAction, orderAction } from './actions'
import dOrder from '../components/data/dOrder'

const colaboratorReducer = (state = {}, action = {}) => {
    if (action.type === colaboratorAction.SET) {

        const temp = []
        action.colaborators.forEach(element => {
            temp.push({
                key: element.id,
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

        const temp = []
        action.orders.forEach(element => {

            let date = new Date(element.created_at)
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            temp.push({
                key: element.id,
                idClient: element.idColaborator,
                idSalesman: element.idSalesman,
                finalPrice: 'R$ ' + Number(element.finalPrice).toFixed(2),
                date: day + '/' + month + '/' + year
            })
        });


        state.orders = action.orders
        state.tableOrders = temp

        return state;
    }

    return state;
}





export const ColaboratorStore = createStore(colaboratorReducer)
export const ProductStore = createStore(productReducer)
export const OrderStore = createStore(orderReducer)
export const OrderProductStore = createStore(orderProductReducer)
