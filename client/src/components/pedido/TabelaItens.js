import React, { useState } from 'react'
import { Button } from 'antd'
import { PedidoProdutoStore } from '../../redux/store'
import SelectProduct from './SelectProduct'
import {
    MinusSquareOutlined
} from '@ant-design/icons'
export default function TabelaItens() {
    const [order, setOrder] = useState([])
    const product = {}
    const [list, setList] = useState([])

    function deleteItem() {
        console.log(list)
    }

    function orderRender(data) {
        const temp = []
        data.forEach(element => {
            temp.push(
                <tr key={element.key} className="ant-table-row ant-table-row-level-0">
                    <td className="ant-table-cell">{element.name}</td>
                    <td className="ant-table-cell">R$ {Number(element.price).toFixed(2)}</td>
                    <td className="ant-table-cell">{element.quantity}</td>
                    <td><Button size="small" type="link" danger icon={<MinusSquareOutlined />} onClick={deleteItem}>Deletar</Button></td>
                </tr>

            )
        });
        return temp
    }


    React.useEffect(() => {
        PedidoProdutoStore.subscribe(() => {
            setList(PedidoProdutoStore.getState())
            setOrder(orderRender(PedidoProdutoStore.getState()))
        })
    }, [])


    return (
        <>

            <SelectProduct product={product} />
            <table className="table-auto">
                <colgroup>
                    <col className="col-auto"></col>
                </colgroup>
                <thead className="ant-table-thead">
                    <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody className="ant-table-tbody" >
                    {order}
                </tbody>
            </table>
        </>
    )
}



