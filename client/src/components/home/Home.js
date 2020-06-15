import React, { useState } from "react";
import { removeToken, getToken } from "../../utils/auth";
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined

} from '@ant-design/icons';
import './styles/home.css'
import axios from 'axios'

import { HomeRoutes } from '../../routes'


export default function Home(props) {

    const { Header, Content, Footer, Sider } = Layout;
    const [collapse, isCollapsed] = useState(false);
    const onCollapse = () => isCollapsed(!collapse)


    function logout() {
        axios.post('/api/logout', { token: getToken() })
            .then(response => {
                if (response.data.status_code === "200") {
                    removeToken();
                    window.location.replace("/")
                }
            }).catch(e => console.log(e))
    }
    //  <LogoutOutlined /> 

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapse}
                onCollapse={onCollapse} >
                <div className="logo">
                    <Link to="/home">
                        <h1 className="LogoTemp">Lesoft</h1>
                    </Link>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                <Menu.Item key="1" icon={< DesktopOutlined />} >
                        <Link to="/home/pedido" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            Pedidos
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={< PieChartOutlined />} >
                        <Link className="LinkMenu" to="/home/colab" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            Colaboradores
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={< DesktopOutlined />} >
                        <Link to="/home/conta/geral" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            Contas
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={< DesktopOutlined />} >
                        <Link to="/home/produto" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            Produtos
                        </Link>
                    </Menu.Item>
                    <Menu.Item onClick={logout} key="10" icon={<LogoutOutlined />}>Sair</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }} >
                    <div className="distancia-menu">
                        <HomeRoutes />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Lesoft ©2020</Footer>
            </Layout>

        </Layout>
    )



}