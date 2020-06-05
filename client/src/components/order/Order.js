import React, { useState } from 'react'
import { Table, Button } from 'antd'
import ModalPedido from './ModalOrder'
import { OrderStore } from '../../redux/store';
import { getOrders } from '../data';
import './styles/pedido.css'

export default function Order() {
    const data = []

    const [orders, setOrders] = useState([])


    const columns = [
        {
            title: 'Código do Pedido',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Vendedor',
            dataIndex: 'name',
            key: 'name'

        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client'
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price'
        },
    ];

    //EFFECTS


    React.useEffect(() => {
        OrderStore.subscribe(() => {
            setOrders(OrderStore.getState())
        })
        getOrders()
    }, [])



    return (
        <div>
            <ModalPedido />
            <Button onClick={() => { console.log(orders) }}>Ver Pedidos</Button>
            <Table dataSource={data} columns={columns} className="distancia-botao" />
        </div>
    );

}

