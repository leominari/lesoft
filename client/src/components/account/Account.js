import React, { useState } from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card;

function Account() {

    const [loading, isLoading] = useState(false)

    function onChange(checked) {
        isLoading(!checked)
    };

    return (
        <>
            <Switch checked={!loading} onChange={onChange} />

            <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Conta Exemplo"
                        description={['oi', 'salve','peipei']}
                    />
                </Skeleton>
            </Card>
        </>
    );
}


export default Account