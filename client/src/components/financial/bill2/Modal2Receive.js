import React, { useState } from 'react'
import Axios from 'axios'
import { Button, Modal, Form, Input, notification,DatePicker } from 'antd'
import './../styles/financial.css'

import { getToken } from '../../../utils/auth';
import { Bill2Action } from '../../../redux/actions';
import { Bill2Store } from '../../../redux/store'

export default function Modal2Receive() {
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true)
    const dateFormat = 'DD/MM/YYYY'

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!newCAP(values)))


    const closeModal = e => {
        isVisible(false)
    };



    async function newCAP(values) {
        const desc = values.b2p.desc
        const value = values.b2p.value
        const dt = values.b2p.date
        const obj = {
            date: dt.year() + "-" + (dt.month()+1) + "-" + dt.date(),
            description: desc,
            value: value,
            type: "receive",
            token: getToken()
        }
        const response = await Axios.post('/api/bill2', obj)
        if (response.data.status_code === 200) {
            Bill2Store.dispatch({
                type: Bill2Action.SET,
                bill2s: response.data.all_bill2
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
    }


    return (
        <div>
            <Button onClick={showModal}>
                Nova Conta a Receber
                </Button>
            <Modal
                title="Nova conta a Receber"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

                    <Form.Item name={['b2p', 'desc']} label="Descrição" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['b2p', 'value']} label="Valor" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['b2p', 'date']} label="Data" rules={[{ required: true }]}>
                        <DatePicker format={dateFormat} />
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
