import React, { useState } from 'react'
import { Select } from 'antd'
import { ColaboradorStore, ProdutoStore, PedidoStore } from '../../redux/store';




export function SelectVendedor(params) {
    const { Option } = Select;
    const [colaboradorOptions, setColaboradorOptions] = useState([])

    let optionRows = []

    console.log()

    function onChange(value) {
        params.form.SelectedVendedor = value;
        console.log(params.form.SelectedVendedor)
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


    async function rowS() {
        const resp = ColaboradorStore.getState()
        for (let i = 0; i < resp.length; i++) {
            optionRows.push(<Option key={resp[i].key}>{resp[i].nome}</Option>)
        }
        setColaboradorOptions(optionRows)
    }

    React.useEffect(() => {
        rowS()

    }, [])


    return (

        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecione um vendedor"
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
    )
}


export function SelectProduto(params) {
    const { Option } = Select;
    const [produtosOptions, setProdutosOptions] = useState([])
    let optionRows = []
    
    function onChange(value) {
        params.form.idProduto = value;
        console.log(params.form.idProduto)
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


    async function rowS() {
        const resp = ProdutoStore.getState()
        for (let i = 0; i < resp.length; i++) {
            optionRows.push(<Option key={resp[i].key}>{resp[i].nome}</Option>)
        }
        setProdutosOptions(optionRows)
    }

    React.useEffect(() => {
        rowS()
        PedidoStore.subscribe(() => {
            
        })
    }, [])


    return (

        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecione um produto"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {produtosOptions}
        </Select>
    )
}