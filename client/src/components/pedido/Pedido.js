import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Select } from 'antd'
import './styles/pedido.css'
import Axios from 'axios'

import { getToken } from '../../utils/auth';

export default function Pedido() {

    const [pedidos, setPedidos] = useState([])
    const [ModalVisible, isVisible] = useState(false)
    const showModal = () => isVisible(true);
    const { Option } = Select;
    const [colaboradorOptions, setColaboradorOptions] = useState([])

    const columns = [
        {
            title: 'Código do Pedido',
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

    //EFFECTS

    React.useEffect(() => {
        async function CarregaOpColaborador() {
            const getUrl = '/api/colaborador/todos' + getToken()
            const response = await Axios.get(getUrl)
            const resp = response.data
            let optionRows = []
            for (let i = 0; i < resp.length; i++) {
                optionRows.push(<Option key={resp[i].id}>{resp[i].nome}</Option>)
            }
            setColaboradorOptions(optionRows)
        }

        async function CarregaOpColaborador() {
            const getUrl = '/api/colaborador/todos' + getToken()
            const response = await Axios.get(getUrl)
            const resp = response.data
            let optionRows = []
            for (let i = 0; i < resp.length; i++) {
                optionRows.push(<Option key={resp[i].id}>{resp[i].nome}</Option>)
            }
            setColaboradorOptions(optionRows)
        }
        CarregaOpColaborador()
    }, [])



    useEffect(() => {

        CarregaPedidos()
    }, [])



    return (
        <div>
            <ModalCadastro />
            <Table dataSource={pedidos} columns={columns} className="distancia-botao" />
        </div>
    );



    // METODOS

    async function CarregaPedidos() {
        const getUrl = '/api/pedidos/todos' + getToken()
        const response = await Axios.get(getUrl)
        const resp = []
        console.log(response.data)
        response.data.forEach(element => {
            resp.push({
                key: element.id,
                nome: element.nome,
                preco: element.preco,
                unidade: element.unidade
            })
        });
        setPedidos(resp)
    }

    function ModalCadastro() {


        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };

        const validateMessages = {
            required: '${label} é necessário!'
        };


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



        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }

        function onSearch(val) {
            console.log('search:', val);
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
                    onCancel={FecharModal}
                >
                    <Form {...layout} name="nest-messages" onFinish={CadastrarPedido} validateMessages={validateMessages}>

                        <Form.Item name={['pedido', 'idVendedor']} label="Vendedor" rules={[{ required: true }]}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Selecione um Vendedor"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {colaboradorOptions}
                            </Select>
                        </Form.Item>
                        {/* <Form.Item name={['pedido', 'unidade']} label="Unidade" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['pedido', 'unidade']} label="Unidade" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['pedido', 'unidade']} label="Unidade" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item> */}
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

