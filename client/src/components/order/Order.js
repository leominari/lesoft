import React, { useState } from 'react'
import { Table, Button } from 'antd'
import ModalPedido from './ModalOrder'
import { OrderStore, ColaboratorStore } from '../../redux/store';
import './styles/pedido.css'
import dColaborator from '../data/dColaborator';
import dOrder from '../data/dOrder';

export default function Order() {
    const Order = new dOrder()    
    const [orders, setOrders] = useState([])


    const columns = [
        {
            title: 'Código do Pedido',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Vendedor',
            dataIndex: 'idSalesman',
            key: 'idSalesman'

        },
        {
            title: 'Cliente',
            dataIndex: 'idClient',
            key: 'idClient'
        },
        {
            title: 'Preço',
            dataIndex: 'finalPrice',
            key: 'finalPrice'
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date'
        },
    ];

    React.useEffect(() => {
        OrderStore.subscribe(() => {
            Order.actualizeData()
            setOrders(Order.tableData())
        })
        Order.getAllOrders()
    }, [])



    return (
        <div>
            <ModalPedido />
            <Button onClick={() => { console.log(orders) }}>Ver Pedidos</Button>
            <Table dataSource={orders} columns={columns} className="distancia-botao" />
        </div>
    );

}

