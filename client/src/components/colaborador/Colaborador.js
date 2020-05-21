import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { store } from '../../redux/store'
import { carregaColaboradores } from '../data'
import ModalColab from './ModalColab'
import './styles/colab.css'

export default function Colaborador() {

    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
        store.subscribe(() => {
            setColaboradores(store.getState().colaborador)
        })
        carregaColaboradores();
    }, [])

    const columns = [
        {
            title: 'Código do Colaborador',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'

        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo'
        },
    ];

    return (
        <div>
            <ModalColab />
            <Table dataSource={colaboradores} columns={columns} className="distancia-botao" />
        </div>
    );

}

