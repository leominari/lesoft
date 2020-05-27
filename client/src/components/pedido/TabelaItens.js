import React, { useState } from 'react'
import { Table, Text, Button, InputNumber, Row, Typography, Form } from 'antd'
import { SelectProduto } from './Select'
import { StorePedido, ProdutoStore } from '../../redux/store'

import {
    PlusSquareOutlined
} from '@ant-design/icons'

export default function TabelaItens(params) {
    const [pedidoData, setPedidoData] = useState([])
    const { Text } = Typography
    const listaProdutos = []
    const produto = {}
    React.useEffect(() => {

    }, [])


    const fixedColumns = [
        {
            title: 'Produto',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantidade',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
        },
        // {
        //     title: 'Valor Total',
        //     dataIndex: 'description',
        // },
    ];

    function productName(id){
        const products = ProdutoStore.getState()
        console.log(products)
        products.forEach(product => {
            if(product.key == id){
                console.log('salve')
                return product.nome
            }
        })

        
    }
    

    function tableData(elements) {
        const tempData = []
        elements.forEach(element => {
            tempData.push({
                key: element.key,
                name: productName(element.key),
                quantidade: element.quantidade,
                price: element.preco,
            });
        });
        return tempData
    }

    function adicionaCarrinho() {
        listaProdutos.push({
            key: produto.idProduto,
            quantidade: produto.quantidade,
            preco: produto.preco
        })
        console.log(tableData(listaProdutos))
        setPedidoData(tableData(listaProdutos))
    }

    function addQuantidade(value) {
        produto.quantidade = value
    }
    function addPreco(value) {
        produto.preco = value
    }

    return (
        <>

            <Row className="distancia-produto">

                <SelectProduto form={produto} name="produto" className="box-produto" />

                <div className="box-quantidade">
                    <InputNumber onChange={addQuantidade} placeholder="Quantidade" />
                </div>
                <div className="box-preco">
                    <InputNumber onChange={addPreco} placeholder="Preço" parser={value => value.replace(/\$\s?|(,*)/g, '')} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                </div>
                <Button onClick={adicionaCarrinho} icon={<PlusSquareOutlined />}></Button>

            </Row>

            <Table
                columns={fixedColumns}
                dataSource={pedidoData}
                pagination={false}
                bordered
                summary={pageData => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;

                    pageData.forEach(({ borrow, repayment }) => {
                        totalBorrow += borrow;
                        totalRepayment += repayment;
                    });

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2}>
                                    <Text type="danger">{totalBorrow - totalRepayment}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}

            />
        </>
    )
}