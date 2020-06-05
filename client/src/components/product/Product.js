import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import './styles/prod.css'

import ModalProduct from './ModalProduct'
import { ProductStore } from '../../redux/store';
import { getProducts } from '../data';
import dProduct from '../data/dProduct';



export default function Product() {

    const [products, setProducts] = useState({
        products: [],
        tableProducts: []
    })


    useEffect(() => {
        ProductStore.subscribe(() => {
            setProducts(ProductStore.getState())
        })
        dProduct.set()
    }, [])

    const columns = [
        {
            title: 'Código do Produto',
            dataIndex: 'key',
            key: 'key'

        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'

        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Unidade',
            dataIndex: 'unity',
            key: 'unity'
        },
    ];

    return (
        <div>
            <ModalProduct />
            <Table dataSource={products.tableProducts} columns={columns} className="distancia-botao" />
        </div>
    );

}

