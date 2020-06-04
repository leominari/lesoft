import React, { useState } from 'react'
import { Table, Button } from 'antd'
import './styles/pedido.css'
import Axios from 'axios'

import { getToken } from '../../utils/auth';
import ModalPedido from './ModalPedido'
import { PedidoStore } from '../../redux/store';
import { carregaPedidos } from '../data';
export default function Pedido() {
    const data = []

    const [pedidos, setPedidos] = useState([])


    const columns = [
        {
            title: 'Código do Pedido',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Vendedor',
            dataIndex: 'nome',
            key: 'nome'

        },
        {
            title: 'Cliente',
            dataIndex: 'preco',
            key: 'preco'
        },
        {
            title: 'Preço',
            dataIndex: 'unidade',
            key: 'unidade'
        },
    ];

    //EFFECTS


    React.useEffect(() => {
        PedidoStore.subscribe(() => {
            setPedidos(PedidoStore.getState())
        })
        carregaPedidos()
    }, [])



    return (
        <div>
            <ModalPedido />
            <Button onClick={() => { console.log(pedidos) }}>Ver Pedidos</Button>
            <Table dataSource={data} columns={columns} className="distancia-botao" />
        </div>
    );



    // METODOS



}

