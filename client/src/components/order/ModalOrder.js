import React, { useState } from 'react'
import { Button, Modal, Form, notification } from 'antd'
import { getProducts } from '../data';
import { ColaboratorSelect } from './Select'
import TabelaItens from './ItensTable'
import { OrderStore } from '../../redux/store'
import Axios from 'axios';
import { getToken } from '../../utils/auth';
import { orderAction } from '../../redux/actions';
import dColaborator from '../data/dColaborator'
import dProduct from '../data/dProduct';

export default function ModalOrder() {
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);
    const order = {
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
        dColaborator.set()
        dProduct.set()
    }, [])


    const newOrder = async function () {
        let total = 0
        order.products.forEach(element => {
            total += element.price * element.quantity
        });
        const obj = {
            idClient: order.idClient,
            idSalesman: order.idSalesman,
            products: JSON.stringify(order.products),
            price: total,
            token: getToken(),
        }

        await Axios.post('/api/order/new', obj).then(function (response) {
            if (response.data.status_code === 200) {
                OrderStore.dispatch({
                    type: orderAction.SET,
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

    const closeModal = e => {
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
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={newOrder} validateMessages={validateMessages}>

                    <Form.Item label="Vendedor">
                        <ColaboratorSelect type={0} form={order} />
                    </Form.Item>
                    <Form.Item label="Cliente">
                        <ColaboratorSelect type={1} form={order} />
                    </Form.Item>
                    <Form.Item>
                        <TabelaItens form={order} refresh={isVisible} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button className="distancia-direita10" type="primary" onClick={closeModal} >
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