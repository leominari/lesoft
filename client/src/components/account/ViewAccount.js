import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, notification } from 'antd';
import ModalAdd from './transaction/ModalAdd'
import { TransactionStore } from '../../redux/store';
import { transactionAction } from '../../redux/actions';
import Axios from 'axios';
import { getToken } from '../../utils/auth';

function ViewAccount() {
    let { id } = useParams()
    const [transactions, setTransactions] = useState([])

    React.useEffect(() => {
        TransactionStore.subscribe(() => {
            setTransactions(tableData(TransactionStore.getState()))
        })
        getTransactions()
    }, [])

    function tableData(data) {
        const temp = []
        console.log(data)
        data.forEach(element => {
            temp.push({
                key: element.id,
                description: element.description,
                value: "R$ " + Number(element.value).toFixed(2)
            })
        });
        return temp
    }

    async function getTransactions() {
        const response = await Axios.get('/api/transaction/get/' + id + '/' + getToken())
        if (response.data.status_code === 200) {
            TransactionStore.dispatch({
                type: transactionAction.SET,
                transactions: response.data.all_transactions
            })
            return true
        } else {
            notification.open({
                message: 'Erro no Cadastro',
                description:
                    'Ocorreu um erro no cadastro, entre em contato com a adminitração do sistema.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            })
            return false
        }
    }



    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'id'
        },
        {
            title: 'Valor',
            dataIndex: 'value',
        },
        {
            title: 'Opções',
            dataIndex: 'value',
        },
    ];

    return <>
        <ModalAdd account={id} />
        {/* <Button onClick={() => { console.log(transactions) }}>teste</Button> */}
        <Table columns={columns} dataSource={transactions} bordered />
    </>
}
export default ViewAccount