import React, { useState } from 'react'
import { Button, Modal, Form, Input, notification } from 'antd'
import './styles/colab.css'

import Axios from 'axios'

import { getToken } from '../../utils/auth';
import { ColaboradorStore } from '../../redux/store'
import { dataToColabTable } from '../data'


export default function ModalColaborador() {


    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    const onSubmit = (values) => (isVisible(!CadastrarColaborador(values)))


    const FecharModal = e => {
        isVisible(false)
    };




    async function CadastrarColaborador(values) {
        const response = await Axios.post('/api/colaborador/new', {
            ...values.user,
            token: getToken()
        })
        if (response.data.status_code === 200) {
            ColaboradorStore.dispatch({
                type: "CARREGA_COLABORADORES",
                colaboradores: dataToColabTable(response.data.todos_colaboradores)
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
                Novo Colaborador
                </Button>
            <Modal
                title="Novo Colaborador"
                visible={ModalVisible}
                footer={false}
                onCancel={FecharModal}
            >
                <Form {...layout} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>

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