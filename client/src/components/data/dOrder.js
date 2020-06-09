import { OrderStore, ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import { orderAction } from '../../redux/actions';
import Axios from 'axios';
import dColaborator from './dColaborator';

class dOrder {
    Colaborators = []
    Order = []


    constructor() {
    }

    actualizeData() {
        this.Colaborators = ColaboratorStore.getState()
        this.Order = OrderStore.getState()
    }

    toString() {
        // console.log(this.Colaborators)
        // console.log(this.Products)
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

    tableData() {
        const temp = []
        const colab = new dColaborator()
        colab.getAllColaborators()
        colab.actualizeData()
        this.Order.forEach(element => {

            let date = new Date(element.created_at)
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let nameColab = colab.getName(element.idColaborator)
            let nameSalesman = colab.getName(element.idSalesman)
            console.log(element.idColaborator)
            temp.push({
                key: element.id,
                idClient: nameColab,
                idSalesman: nameSalesman,
                finalPrice: 'R$ ' + Number(element.finalPrice).toFixed(2),
                date: day + '/' + month + '/' + year
            })
        });
        return temp
    }


}

export default dOrder