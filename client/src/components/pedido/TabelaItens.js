import React from 'react'
import { Table, Text, Button, Input, Row, Col, Typography } from 'antd'
import { SelectProduto } from './Select'
import {
    PlusSquareOutlined
} from '@ant-design/icons'
export default function TabelaItens() {
    const { Text } = Typography;

    const fixedColumns = [
        {
            title: 'Produto',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: 'Quantidade',
            dataIndex: 'description',
        },
        {
            title: 'Valor Total',
            dataIndex: 'description',
        },
    ];

    const fixedData = [];
    for (let i = 0; i < 3; i += 1) {
        fixedData.push({
            key: i,
            name: i % 2 ? 'Light' : 'Bamboo',
            description: 'Everything that has a beginning, has an end.',
        });
    }
    return (
        <>
            <Row className="distancia-produto">

                <SelectProduto />
                <div className="box">
                    <Input placeholder="Quantidade" />
                </div>
                <Button icon={<PlusSquareOutlined />}></Button>

            </Row>

            <Table
                columns={fixedColumns}
                dataSource={fixedData}
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