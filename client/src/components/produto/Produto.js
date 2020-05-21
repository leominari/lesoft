import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, notification } from 'antd'
import './styles/prod.css'
import Axios from 'axios'

import { getToken } from '../../utils/auth';
import { ColaboradorReducer } from '../../redux/store'

export default function Produto() {

    const [produtos, setProdutos] = useState([])
 
    
    useEffect(() => {
        async function CarregaProdutos() {
            const getUrl = '/api/produtos/todos' + getToken()
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
            setProdutos(resp)
        }
        CarregaProdutos()
        
    }, [])

    const columns = [
        {
            title: 'Código do Produto',
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

    return (
        <div>
            <ModalCadastro />
            <Table dataSource={produtos} columns={columns} className="distancia-botao" />
        </div>
    );



    // METODOS

    function ModalCadastro() {

        const [ModalVisible, isVisible] = useState(false)
        const showModal = () => isVisible(true);

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const validateMessages = {
            required: '${label} é necessário!'
        };


        const CadastrarProduto = async function (values) {
            const response = await Axios.post('/api/produtos/new', {
                ...values.produto,
                token: getToken()
            })
            if (response.data.status_code == 200) {
                // Adicionado(!novoDado)
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
                    Novo Produto
                    </Button>
                <Modal
                    title="Novo Produto"
                    visible={ModalVisible}
                    footer={false}
                    onCancel={FecharModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={CadastrarProduto} validateMessages={validateMessages}>

                        <Form.Item name={['produto', 'nome']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['produto', 'preco']} label="Preço" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['produto', 'unidade']} label="Unidade" rules={[{ required: true }]}>
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

