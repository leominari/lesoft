import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { ProductStore } from '../../redux/store';
import { productAction } from '../../redux/actions';


const dProduct = {

    set: () => {
        async function get() {
            const getUrl = '/api/products/getall' + getToken()
            const response = await Axios.get(getUrl)
            ProductStore.dispatch({
                type: productAction.SET,
                products: response.data
            })
        }
    
        get()
    },

    getName: (id, data) => {
        if (data.length > 0) {
            const temp = data.filter(product => product.id === id)
            return temp.name
        }
        return null
    },

    getType: (id, data) => {
        data.forEach(element => {
            if (element.id === id)
                return element.type
        });

    }
}


export default dProduct