import React, { useState } from "react";
import { removeToken } from "../../utils/auth";
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';



export default function Home() {
    const logout = () => {
        removeToken();
    }

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const [collapse, isCollapsed] = useState(false);

    const onCollapse = collapsed => collapse ? isCollapsed(false) : isCollapsed(true) 
    //  <LogoutOutlined /> 
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapse}
                onCollapse={onCollapse} >
                <div className="logo" />    
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                    <Menu.Item key="1" icon={< PieChartOutlined />} >
                        Option 1 
                    </Menu.Item> 
                    <Menu.Item key="2"icon={< DesktopOutlined />} >
                        Option 2 
                    </Menu.Item> 
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3"> Tom </Menu.Item>
                        <Menu.Item key="4"> Bill </Menu.Item> 
                        <Menu.Item key="5"> Alex </Menu.Item> 
                    </SubMenu> 
                    <SubMenu key="sub2"
                            icon={< TeamOutlined />}
                            title="Team" >
                            <Menu.Item key="6" > Team 1 </Menu.Item> 
                            <Menu.Item key="8" > Team 2 </Menu.Item> 
                    </SubMenu> 
                    <Menu.Item key="9" icon={< FileOutlined />}/> 
                </Menu> 
            </Sider> 
            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }}/> 
                <Content style={{ margin: '0 16px' }} >
                    <Breadcrumb style={{ margin: '16px 0' }} >
                        <Breadcrumb.Item > User </Breadcrumb.Item>
                        <Breadcrumb.Item > Bill </Breadcrumb.Item> 
                    </Breadcrumb> 
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }} >
                        Bill is a cat. 
                    </div> 
                </Content> 
                { /* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */} 
            </Layout> 
        </Layout>
    )



}