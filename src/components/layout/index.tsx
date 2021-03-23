import * as React from 'react'
import { Layout } from 'antd';
import Sider from './sider/index'
import HeaderComponent from '@/components/layout/header/index'
import Footer from '@/components/layout/footer/index'
import './index.css'
import RouterMap from '@/routers/index'
import { history } from '@/utils'
const { useState } = React
const { Content } = Layout
interface IProps {
    history: any,
}
interface LayoutState {
    collapsed?: boolean
}

export default (iProps: IProps) => {
    const initLayoutState: LayoutState = {
        collapsed: JSON.parse(sessionStorage.getItem('siderCollapsed'))
    }
    const [layoutState, setLayoutState] = useState(initLayoutState)
    const { collapsed } = layoutState
    const logout = () => {
        sessionStorage.setItem('appAuth', 'false')
        history.replace('/')
    }
    const changePassWord = () => { console.log('changePassWord') }
    const toggleCollapsed = () => {
        setLayoutState({ collapsed: !collapsed })
        sessionStorage.setItem('siderCollapsed', JSON.stringify(!collapsed))
    }
    React.useEffect(() => {
      console.log(3434)  
    })
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider collapsed={collapsed} />
            <Layout>
                <HeaderComponent
                    getLogout={logout}
                    changePassWord={changePassWord}
                    toggleCollapsed={toggleCollapsed}
                    collapsed={collapsed} 
                    currentPosition={sessionStorage.getItem('currentLocation')}/>
                <Content className="layout-content">
                    {RouterMap(JSON.parse(sessionStorage.getItem('appAuth')))}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
}

