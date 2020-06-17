import React, { useState } from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './../styles/financial.css'

import Axios from 'axios'

import { getToken } from '../../../utils/auth';
import { ColaboratorStore } from '../../../redux/store'
import { colaboratorAction } from '../../../redux/actions';


export default function Modal2Pay() {


    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!newColaborator(values)))


    const closeModal = e => {
        isVisible(false)
    };




    async function newColaborator(values) {
        const response = await Axios.post('/api/colaborator/new', {
            ...values.user,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            ColaboratorStore.dispatch({
                type: colaboratorAction.SET,
                colaborators: response.data.all_colaborators
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
                Nova Conta a Pagar
                </Button>
            <Modal
                title="Nova Conta a Pagar"
                visible={ModalVisible}
                footer={false}
                onCancel={closeModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'type']} label="Tipo" rules={[{ required: true }]}>
                        <Input />
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
