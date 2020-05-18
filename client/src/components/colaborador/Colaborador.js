import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd'
import './styles/colab.css'

import Axios from 'axios'

import { getToken } from '../../utils/auth';

export default function Colaborador() {

    const [colaboradores, setColaboradores] = useState([])
    const [novoDado, Adicionado] = useState(false)

    useEffect(() => {
        async function CarregaColaboradores() {
            const response = await fetch('/api/colaborador/todos')
            const data = await response.json();
            const resp = []
            data.forEach(element => {
                resp.push({
                    key: element.id,
                    nome: element.nome,
                    tipo: element.tipo
                })
            });
            setColaboradores(resp)
        }
        CarregaColaboradores()
    }, [novoDado])

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



    // METODOS

    function ModalColab() {

        const [ModalVisible, isVisible] = useState(false)
        const showModal = () => isVisible(true);

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const validateMessages = {
            required: '${label} é necessário!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        const CadastrarColaborador = values => {
            console.log(getToken());
            Axios.post('/api/colaborador/new', { 
                values: values.user,
                token: getToken()
            }).then(response => {
                console.log(response.data)
            })
            isVisible(false)
        };

        const FecharModal = e => {
            isVisible(false)
        };


        return (
            <div>
                <Button onClick={showModal}>
                    Novo Colaborador
                    </Button>
                <Modal
                    title="Novo Colaborador"
                    visible={ModalVisible}
                    footer={false}
                    onCancel={FecharModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={CadastrarColaborador} validateMessages={validateMessages}>

                        <Form.Item name={['user', 'nome']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'tipo']} label="Tipo" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button className="distancia-direita10" type="primary" onClick={FecharModal} >
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cadastrar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )

    }
}

