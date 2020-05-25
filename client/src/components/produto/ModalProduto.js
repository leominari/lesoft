import React, { useState } from 'react'
import { ColaboradorStore, ProdutoStore } from '../../redux/store'
import { Button, Modal, Form, Input, notification } from 'antd'
import Axios from 'axios'
import { getToken } from '../../utils/auth'
import { dataToProdTable } from '../data'

export default function ModalProduto() {

    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!CadastrarProduto(values)))


    async function CadastrarProduto(values) {
        const response = await Axios.post('/api/produtos/new', {
            ...values.produto,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            ProdutoStore.dispatch({
                type: "CARREGA_PRODUTOS",
                produtos: dataToProdTable(response.data.todos_produtos)
            })
            return true
        } else {
            notification.open({
                message: 'Erro no Cadastro',
                description:
                    'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            })
            return false
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
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

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