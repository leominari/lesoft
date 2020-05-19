import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, notification } from 'antd'
import './styles/colab.css'

import Axios from 'axios'

import { getToken } from '../../utils/auth';

export default function Colaborador() {

    const [colaboradores, setColaboradores] = useState([])
    const [novoDado, Adicionado] = useState(false)

    useEffect(() => {
        async function CarregaColaboradores() {
            const getUrl = '/api/colaborador/todos' + getToken()
            const response = await Axios.get(getUrl, { token: getToken() })
            const resp = []
            console.log(response.data)
            response.data.forEach(element => {
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
            required: '${label} é necessário!'
        };


        const CadastrarColaborador = async function (values) {
            const response = await Axios.post('/api/colaborador/new', {
                ...values.user,
                token: getToken()
            })
            if (response.data.status_code == 200) {
                Adicionado(!novoDado)
                isVisible(false)
            } else {
                notification.open({
                    message: 'Erro no Cadastro',
                    description:
                        'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
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

