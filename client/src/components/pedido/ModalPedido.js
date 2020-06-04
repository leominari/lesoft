import React, { useState } from 'react'
import { Button, Modal, Form, notification } from 'antd'
import { carregaColaboradores, carregaProdutos } from '../data';
import { SelectColaborador } from './Select'
import TabelaItens from './TabelaItens'
import { PedidoProdutoStore, PedidoStore } from '../../redux/store'
import Axios from 'axios';
import { getToken } from '../../utils/auth';

export default function ModalPedido() {
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);
    const pedido = {
        products: []
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 26 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    React.useEffect(() => {
        carregaColaboradores()
        carregaProdutos()
    }, [])


    const CadastrarPedido = async function () {
        let total = 0
        pedido.products.forEach(element => {
            total += element.price * element.quantity
        });
        const obj = {
            idClient: pedido.idClient,
            idSalesman: pedido.idSalesman,
            products: JSON.stringify(pedido.products),
            price: total,
            token: getToken(),
        }
        console.log(obj)

        await Axios.post('/api/pedidos/new', obj).then(function (response) {
            if (response.data.status_code === 200) {
                PedidoStore.dispatch({
                    type: "CARREGA_PEDIDOS",
                    orders: response.data.allorders
                })
                isVisible(false)
            } else {
                notification['error']({
                    message: 'Erro no Cadastro',
                    description:
                        'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        }).catch(function (error) {
            // your action on error success
            console.log(error);
        });


    };

    const FecharModal = e => {
        isVisible(false)
    };



    return (
        <div>
            <Button onClick={showModal}>
                Novo Pedido
                </Button>
            <Modal
                title="Novo Pedido"
                visible={ModalVisible}
                footer={false}
                onCancel={FecharModal}
            >
                <Form {...layout} name="nest-messages" onFinish={CadastrarPedido} validateMessages={validateMessages}>

                    <Form.Item label="Vendedor">
                        <SelectColaborador type={0} form={pedido} />
                    </Form.Item>
                    <Form.Item label="Cliente">
                        <SelectColaborador type={1} form={pedido} />
                    </Form.Item>
                    <Form.Item>
                        <TabelaItens form={pedido} refresh={isVisible} />
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