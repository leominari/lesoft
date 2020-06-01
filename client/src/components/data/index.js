import { getToken } from "../../utils/auth";
import Axios from "axios";
import { ColaboradorStore, ProdutoStore } from "../../redux/store";




//COLABORADOR
export const dataToColabTable = (data) => {
    const array = []
    let i = 0
    data.forEach(element => {
        array.push({
            key: i,
            id: element.id,
            nome: element.nome,
            tipo: element.tipo
        })
        i++
    });
    return array
}


export const carregaColaboradores = () => {
    async function get() {
        const getUrl = '/api/colaborador/todos' + getToken()
        const response = await Axios.get(getUrl)
        ColaboradorStore.dispatch({
            type: "CARREGA_COLABORADORES",
            colaboradores: dataToColabTable(response.data)
        })
    }

    get()
}


//PRODUTO
export const dataToProdTable = (data) => {
    const array = []
    let i = 0
    data.forEach(element => {
        array.push({
            key: i,
            id: element.id,
            nome: element.nome,
            preco: element.preco,
            unidade: element.unidade
        })
        i++
    });
    return array
}


export const carregaProdutos = () => {
    async function get() {
        const getUrl = '/api/produtos/todos' + getToken()
        const response = await Axios.get(getUrl)
        ProdutoStore.dispatch({
            type: "CARREGA_PRODUTOS",
            produtos: dataToProdTable(response.data)
        })
    }

    get()
}