import { OrderStore, ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { orderAction } from '../../redux/actions';

var colaborators = {
    colaborators: [1, 2, 3]
}

function setColaborators(){
    colaborators = ColaboratorStore.getState()
}


const dOrder = {
    colaborators: [],
    set: () => {
        async function get() {
            const getUrl = '/api/order/getall' + getToken()
            const response = await Axios.get(getUrl)
            OrderStore.dispatch({
                type: orderAction.SET,
                orders: response.data
            })
        }
        setColaborators()
        get()
    },

    getName: (data) => {
        forEach()

        return "Fulano"
    },

    getType: (id, data) => {
        data.forEach(element => {
            if (element.id === id)
                return element.type
        });

    }
}


export default dOrder