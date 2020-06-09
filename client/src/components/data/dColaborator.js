import { ColaboratorStore } from '../../redux/store';
import { getToken } from '../../utils/auth';
import Axios from 'axios';
import { colaboratorAction } from '../../redux/actions';


class dColaborator {
    Colaborators = []

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

    actualizeData() {
        this.Colaborators = ColaboratorStore.getState()
    }

    tableData() {
        const temp = []
        this.Colaborators.forEach(element => {
            temp.push({
                key: element.id,
                name: element.name,
                type: element.type
            })
        });
    }


    getName(id) {
        if (this.Colaborators.length > 0) {    
            return this.Colaborators[id-1].name
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