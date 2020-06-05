import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import './styles/prod.css'

import ModalProduct from './ModalProduct'
import { ProductStore } from '../../redux/store';
import { getProducts } from '../data';



export default function Product() {

    const [products, setProducts] = useState([])


    useEffect(() => {
        ProductStore.subscribe(() => {
            setProducts(ProductStore.getState())
        })
        getProducts()
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
            <Table dataSource={products} columns={columns} className="distancia-botao" />
        </div>
    );

}

