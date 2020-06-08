import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { ColaboratorStore } from '../../redux/store'
import ModalColaborator from './ModalColaborator'
import './styles/colab.css'
import dColaborator from '../data/dColaborator'

export default function Colaborator() {
    const Colaborator = new dColaborator()
    const [colaborators, setColaborators] = useState({
        colaborators: [],
        tableColaborators: []
    })

    useEffect(() => {
        ColaboratorStore.subscribe(() => {
            setColaborators(ColaboratorStore.getState())
        })
        Colaborator.getAllColaborators()
    }, [])

    const columns = [
        {
            title: 'Código do Colaborador',
            dataIndex: 'key',
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
            <ModalColaborator />
            <Table dataSource={colaborators.tableColaborators} columns={columns} className="distancia-botao" />
        </div>
    );

}

