import React from 'react'

export function tableProduct(data) {
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


export const tableColaborator = (data) => {
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
