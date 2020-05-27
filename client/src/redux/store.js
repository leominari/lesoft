import { createStore } from 'redux';


const colaboradorReducer = (state = [], action = {}) => {
    if (action.type === "CARREGA_COLABORADORES") {
        return [...action.colaboradores];
    }

    if (action.type === "ATUALIZA_COLABORADORES") {
        return [...action.colaboradores];
    }
    return state;
}

const produtoReducer = (state = [], action = {}) => {
    if (action.type === "CARREGA_PRODUTOS") {
        return [...action.produtos];
    }

    if (action.type === "ATUALIZA_PRODUTOS") {
        return [...action.produtos];
    }
    return state;
}

const pedidoReducer = (state = {}, action = {}) => {
    if (action.type === "set_product_list") {
        // return [...action.produtos];
        return state
    }

    return state;
}





export const ColaboradorStore = createStore(colaboradorReducer)
export const ProdutoStore = createStore(produtoReducer)
export const PedidoStore = createStore(pedidoReducer)