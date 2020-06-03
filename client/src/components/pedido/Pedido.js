import React, { useState } from 'react'
import { Table } from 'antd'
import './styles/pedido.css'
import Axios from 'axios'

import { getToken } from '../../utils/auth';
import ModalPedido from './ModalPedido'

export default function Pedido() {

    const [pedidos, setPedidos] = useState([])


    const columns = [
        {
            title: 'Código do Pedido',
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

    //EFFECTS


    React.useEffect(() => {
        CarregaPedidos()
    }, [])



    return (
        <div>
            <ModalPedido />
            <Table dataSource={pedidos} columns={columns} className="distancia-botao" />
        </div>
    );



    // METODOS

    async function CarregaPedidos() {
        const getUrl = '/api/pedidos/todos' + getToken()
        const response = await Axios.get(getUrl)
        const resp = []
        response.data.forEach(element => {
            resp.push({
                key: element.id,
                nome: element.nome,
                preco: element.preco,
                unidade: element.unidade
            })
        });
        setPedidos(resp)
    }


}

