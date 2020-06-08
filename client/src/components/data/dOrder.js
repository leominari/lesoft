import { OrderStore, ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import { orderAction } from '../../redux/actions';
import Axios from 'axios';


class dOrder {
    Colaborators  = (ColaboratorStore.getState()).colaborators
    Products  = ColaboratorStore.getState()

    constructor() {

    }
    
    toString(){
        console.log(this.Colaborators)
        console.log(this.Products)
    }


    getAllOrders() {
        async function get() {
            const getUrl = '/api/order/getall' + getToken()
            const response = await Axios.get(getUrl)
            OrderStore.dispatch({
                type: orderAction.SET,
                orders: response.data
            })
        }
        get()
    }

    getName() {

    }

}

export default dOrder