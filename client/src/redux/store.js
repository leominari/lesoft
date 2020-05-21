import { combineReducers, createStore } from 'redux';


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
        return [...action.colaboradores];
    }

    if (action.type === "ATUALIZA_PRODUTOS") {
        return [...action.colaboradores];
    }
    return state;
}



const reducers = combineReducers({
    colaborador: colaboradorReducer,
    produto: produtoReducer
})


export const store = createStore(reducers)
