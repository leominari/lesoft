import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { ColaboradorStore } from '../../redux/store';
import { carregaColaboradores, carregaProdutos } from '../data';
import { SelectVendedor, SelectProduto } from './Select'
import TabelaItens from './TabelaItens'

export default function ModalPedido() {
    const [colaboradores, setColaboradores] = useState([])
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const validateMessages = {
        required: '${label} é necessário!'
    };


    React.useEffect(() => {
        carregaColaboradores()
        carregaProdutos()
    }, [])


    const CadastrarPedido = async function (values) {
        console.log(values)
        // const response = await Axios.post('/api/pedidos/new', {
        //     ...values.pedido,
        //     token: getToken()
        // })
        // if (response.data.status_code == 200) {
        //     isVisible(false)
        // } else {
        //     notification.open({
        //         message: 'Erro no Cadastro',
        //         description:
        //             'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
        //         onClick: () => {
        //             console.log('Notification Clicked!');
        //         },
        //     });
        // }
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

                    <Form.Item name={['pedido', 'idVendedor']} label="Vendedor" rules={[{ required: true }]}>
                        <SelectVendedor />
                    </Form.Item>
                    <Form.Item>
                        <TabelaItens />
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