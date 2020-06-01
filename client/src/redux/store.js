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

const pedidoProdutoReducer = (state = [], action = {}) => {
    if (action.type === "CARREGA_PRODUTO") {
        state.push(action.produtos)
        return state
    }

    return state;
}

const pedidoReducer = (state = {}, action = {}) => {
    if (action.type === "CARREGA_PEDIDO") {
        return [...action.pedidos];
    }

    if (action.type === "ATUALIZA_PEDIDOS") {
        return [...action.pedidos];
    }
    return state;
}





export const ColaboradorStore = createStore(colaboradorReducer)
export const ProdutoStore = createStore(produtoReducer)
export const PedidoStore = createStore(pedidoReducer)
export const PedidoProdutoStore = createStore(pedidoProdutoReducer)
