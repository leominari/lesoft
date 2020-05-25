import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import './styles/prod.css'

import ModalProduto from './ModalProduto'
import { ProdutoStore } from '../../redux/store';
import { carregaProdutos } from '../data';



export default function Produto() {

    const [produtos, setProdutos] = useState([])


    useEffect(() => {
        ProdutoStore.subscribe(() => {
            setProdutos(ProdutoStore.getState())
        })
        carregaProdutos()
    }, [])

    const columns = [
        {
            title: 'Código do Produto',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'

        },
        {
            title: 'Preço',
            dataIndex: 'preco',
            key: 'preco'
        },
        {
            title: 'Unidade',
            dataIndex: 'unidade',
            key: 'unidade'
        },
    ];

    return (
        <div>
            <ModalProduto />
            <Table dataSource={produtos} columns={columns} className="distancia-botao" />
        </div>
    );



    // METODOS


}

