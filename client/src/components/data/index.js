import { getToken } from "../../utils/auth";
import Axios from "axios";
import { ColaboratorStore, ProdutoStore, PedidoStore, ProductStore, OrderStore } from "../../redux/store";
import { colaboratorAction, productAction, orderAction } from "../../redux/actions";



export const getColaborators = () => {
    async function get() {
        const getUrl = '/api/colaborator/getall' + getToken()
        const response = await Axios.get(getUrl)
        ColaboratorStore.dispatch({
            type: colaboratorAction.SET,
            colaborators: response.data
        })
    }

    get()
}


export const getProducts = () => {
    async function get() {
        const getUrl = '/api/products/getall' + getToken()
        const response = await Axios.get(getUrl)
        ProductStore.dispatch({
            type: productAction.SET,
            products: response.data
        })
    }

    get()
}


export const getOrders = () => {

    async function get() {
        const getUrl = '/api/orders/getall' + getToken()
        const response = await Axios.get(getUrl)
        // const resp = []
        OrderStore.dispatch({
            type: orderAction.SET,
            orders: response.data
        })
    }

    get()
}

