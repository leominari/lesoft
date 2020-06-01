import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { ColaboradorStore } from '../../redux/store'
import { carregaColaboradores } from '../data'
import ModalColaborador from './ModalColaborador'
import './styles/colab.css'

export default function Colaborador() {

    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
        ColaboradorStore.subscribe(() => {
            setColaboradores(ColaboradorStore.getState())
        })
        carregaColaboradores();
    }, [])

    const columns = [
        {
            title: 'Código do Colaborador',
            dataIndex: 'id',
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
            <ModalColaborador />
            <Table dataSource={colaboradores} columns={columns} className="distancia-botao" />
        </div>
    );

}

