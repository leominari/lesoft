import React, { useState } from 'react'
import { Button, InputNumber, Row, Input } from 'antd'
import { SelectProduto } from './Select'

import {
    PlusCircleOutlined
} from '@ant-design/icons'
import { PedidoProdutoStore } from '../../redux/store'

export default function TabelaItens(data) {
    const [inputs, setInputs] = useState({})

    function addCart() {
        PedidoProdutoStore.dispatch({
            type: "CARREGA_PRODUTO",
            produtos: {
                key: data.product.productId,
                name: data.product.productName,
                price: data.product.price,
                quantity: data.product.quantity,
                unity: data.product.productUnity
            }
        })

        clear()
    }



    function addQuantity(e) {
        data.product.quantity = e.target.value
        setInputs({
            ...inputs,
            quantity: e.target
        })
        console.log(e.target.value)
    }

    function addPrice(e) {
        data.product.price = e.target.value
        setInputs({
            ...inputs,
            price: e.target
        })
        console.log(data.product.price)
    }

    function clear() {
        inputs.quantity.value = ""
        inputs.price.value = ""
    }


    return (
        <>

            <p>Adicionar Produto</p>
            <Row className="distancia-produto">
                <SelectProduto form={data.product} name="produto" className="box-produto" />

                <div className="box-quantidade">
                    <span className="ant-input-affix-wrapper">
                        <span className="ant-input-prefix">R$</span>
                        <input onChange={addPrice} placeholder="0,00" type="text" className="ant-input" />
                    </span>
                </div>

                <div className="box-preco">
                    <input
                        className="ant-input"
                        onChange={addQuantity}
                        placeholder="Quantidade"
                    />
                </div>

                <Button onClick={addCart} icon={<PlusCircleOutlined />}></Button>

            </Row>


        </>
    )
}