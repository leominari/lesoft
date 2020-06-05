import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { ColaboratorStore } from '../../redux/store'
import { getColaborators } from '../data'
import ModalColaborador from './ModalColaborator'
import './styles/colab.css'


export default function Colaborador() {

    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
        ColaboratorStore.subscribe(() => {
            setColaboradores(ColaboratorStore.getState())
        })
        getColaborators();
    }, [])

    const columns = [
        {
            title: 'Código do Colaborador',
            dataIndex: 'id',
            key: 'key'

        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'

        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type'
        },
    ];

    return (
        <div>
            <ModalColaborador />
            <Table dataSource={colaboradores} columns={columns} className="distancia-botao" />
        </div>
    );

}

