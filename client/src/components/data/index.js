import { getToken } from "../../utils/auth";
import Axios from "axios";
import { ProductStore, OrderStore } from "../../redux/store";
import { productAction, orderAction } from "../../redux/actions";


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

