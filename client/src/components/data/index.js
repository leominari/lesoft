import { getToken } from "../../utils/auth";
import Axios from "axios";
import { store } from "../../redux/store";

export const dataToColabTable = (data) => {
    const array = []
    data.forEach(element => {
        array.push({
            key: element.id,
            nome: element.nome,
            tipo: element.tipo
        })
    });
    return array
}


export const carregaColaboradores = () => {
    async function get() {
        const getUrl = '/api/colaborador/todos' + getToken()
        const response = await Axios.get(getUrl)
        store.dispatch({
            type: "CARREGA_COLABORADORES",
            colaboradores: dataToColabTable(response.data)
        })
    }

    get()
}
