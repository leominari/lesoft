import { ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { colaboratorAction } from '../../redux/actions';


class dColaborator {
    getAllColaborators() {
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

    getName(id, data) {
        if (data.length > 0) {
            const temp = data.filter(colaborators => colaborators.id === id)
            return temp.name
        }
        return null
    }

    getType(id, data) {
        data.forEach(element => {
            if (element.id === id)
                return element.type
        });

    }
}


export default dColaborator