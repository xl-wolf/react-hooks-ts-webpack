import * as React from 'react'
import { Layout, Modal } from 'antd';
import Sider from './sider/index'
import HeaderComponent from '@/components/layout/header/index'
import Footer from '@/components/layout/footer/index'
import './index.css'
import RouterMap from '@/routers/index'
import { getSession, history, setSession } from '@/utils'
const { useState } = React
const { Content } = Layout
interface LayoutState {
    collapsed?: boolean
}

export default () => {
    const initLayoutState: LayoutState = {
        collapsed: JSON.parse(getSession('siderCollapsed'))
    }
    const [layoutState, setLayoutState] = useState(initLayoutState)
    const { collapsed } = layoutState
    const logout = () => {
        Modal.confirm({
            title: "注销",
            content: "确定要退出系统吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                setSession('appAuth', 'false')
                history.replace('/')
            },
        })
    }
    const changePassWord = () => { console.log('changePassWord') }
    const toggleCollapsed = () => {
        // 派发window resize事件
        window.dispatchEvent(new Event('resize'))
        setLayoutState({ collapsed: !collapsed })
        setSession('siderCollapsed', JSON.stringify(!collapsed))
    }
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider collapsed={collapsed} />
            <Layout>
                <HeaderComponent
                    getLogout={logout}
                    changePassWord={changePassWord}
                    toggleCollapsed={toggleCollapsed}
                    collapsed={collapsed}
                    currentPosition={getSession('currentLocation')} />
                <Content className="layout-content">
                    {RouterMap(JSON.parse(getSession('appAuth')))}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
}

