import React, { useState } from 'react'
import { Select } from 'antd'
import Axios from 'axios'
import { getToken } from '../../utils/auth';




export default function CustomSelect() {
    const { Option } = Select;
    const [colaboradorOptions, setColaboradorOptions] = useState([])
    let optionRows = []

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


    async function rowS() {
        const getUrl = '/api/colaborador/todos' + getToken()
        const response = await Axios.get(getUrl)
        const resp = response.data
        for (let i = 0; i < resp.length; i++) {
            optionRows.push(<Option value={resp[i].id}>{resp[i].nome}</Option>)
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
            placeholder="Select a person"
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