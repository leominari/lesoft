import React, { useState } from 'react'
import Axios from 'axios';
import { Button, Modal, Form, notification, Switch, DatePicker, Row } from 'antd'
import { getToken } from '../../utils/auth';
import { orderAction } from '../../redux/actions';
import { OrderStore } from '../../redux/store';
import { ColaboratorSelect } from './Select'
import dColaborator from '../data/dColaborator'
import dProduct from '../data/dProduct';
import TabelaItens from './ItensTable'
import SelectAccount from '../account/SelectAccount'

export default function ModalOrder() {
    const [ModalVisible, isVisible] = useState(false)
    const [B2State, setB2State] = useState(false)
    const Product =  new dProduct()
    const Colaborator =  new dColaborator()
    const showModal = () => isVisible(true);

    const order = {
        products: []
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 26 },
    };

    const bill2receive = {}

    const validateMessages = {
        required: '${label} é necessário!'
    };


    React.useEffect(() => {
        Colaborator.getAllColaborators()
        Product.getAllProducts()
    }, [])


    const newOrder = async function () {
        const Bill2Receive = {
            state: B2State,
            date: bill2receive.date,
            idAccount: bill2receive.idAccount
        }

        const obj = {
            idClient: order.idClient,
            idSalesman: order.idSalesman,
            products: JSON.stringify(order.products),
            token: getToken(),
        }
        console.log(obj)
        console.log(Bill2Receive)
        // await Axios.post('/api/order/new', obj).then(function (response) {
        //     if (response.data.status_code === 200) {
        //         OrderStore.dispatch({
        //             type: orderAction.SET,
        //             orders: response.data.all_orders
        //         })
        //         isVisible(false)
        //     } else {
        //         notification['error']({
        //             message: 'Erro no Cadastro',
        //             description:
        //                 'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
        //             onClick: () => {
        //                 console.log('Notification Clicked!');
        //             },
        //         });
        //     }
        // }).catch(function (error) {
        //     // your action on error success
        //     console.log(error);
        // })


    }

    const closeModal = e => {
        isVisible(false)
    };


    function handleCheck(checked){
        setB2State(checked)
    }

    function handleDataPicked(value){
        const date = value.year() + "-" + ("00" + (value.month() + 1)).slice(-2) + "-" + value.date()
        bill2receive.date = date
    }

    function Bill2Receive(){
        const dateFormat = 'DD/MM/YYYY'
        if(!B2State){
            return <> </>
        }else{
            return <>
            <Row>
                <DatePicker disabled={!B2State} format={dateFormat} onSelect={handleDataPicked} />
                <SelectAccount disabled={!B2State} data={bill2receive}/>
                <Button disabled={!B2State} onClick={()=>{console.log(bill2receive)}}>Ver Infos</Button>
            </Row>

            </>
        }
    }

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
                    <Form.Item label="Conta a Receber:">
                        <Switch onChange={handleCheck} />
                        <Bill2Receive/>
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
