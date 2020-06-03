import React, { useState } from 'react'
import { Select } from 'antd'
import { ColaboradorStore, ProdutoStore } from '../../redux/store';



    /*
     * COLABORADOR TYPE ID
     * 0 = SALESMAN
     * 1 = CLIENT
     */
export function SelectColaborador(params) {
    const { Option } = Select;
    const [colaboradorOptions, setColaboradorOptions] = useState([])
    let optionRows = []
    const typeCode = params.type
    const typeName = selectType()

    function selectType(){
        switch (typeCode) {
            //salesman
            case 0:
                return "Vendedor"
            //client
            case 1:
                return "Cliente"

            default:
                return "erro"
        }
    }

    function onChange(value) {
        switch (typeCode) {
            case 0:
                params.form.idSalesman = value
                break;
            case 1:
                params.form.idClient = value
                break;
            default:
                break;
        }
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
            placeholder={"Selecione um " + typeName}
            optionFilterProp="children"
            onChange={onChange}
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
    const [productsOptions, setproductsOptions] = useState([])
    const products = ProdutoStore.getState()
    let optionRows = []

    function onChange(value) {
        params.form.productId = products[value].id;
        params.form.productName = products[value].nome
        params.form.productUnity = products[value].unidade
        params.form.productDefaultPrice = products[value].preco
    }

    function rowS() {
        products.forEach(element => {
            optionRows.push(<Option key={element.key}>{element.nome}</Option>)
        });
        setproductsOptions(optionRows)
    }

    React.useEffect(() => {
        rowS()
    }, [])

    return (

        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecione um produto"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {productsOptions}
        </Select>
    )
}