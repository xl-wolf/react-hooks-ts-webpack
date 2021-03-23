import * as React from 'react'
import { Layout } from 'antd';
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
        setSession('appAuth', 'false')
        history.replace('/')
    }
    const changePassWord = () => { console.log('changePassWord') }
    const toggleCollapsed = () => {
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

