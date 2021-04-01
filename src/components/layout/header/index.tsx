import * as React from 'react'
import { Popover, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout
import './index.less'
interface HeaderProps {
    getLogout: () => void //退出登录
    changePassWord: () => void //预留修改密码
    toggleCollapsed: () => void //侧边栏收展方法
    collapsed: boolean //侧边栏状态
    currentPosition: string //当前所在的位置
}

export default (hProps: HeaderProps) => {
    const { collapsed, toggleCollapsed, getLogout, changePassWord,currentPosition } = hProps
    const renderPopover = () => {
        return <div style={{ cursor: 'pointer' }}>
            <div className="popover-item" onClick={changePassWord}>修改密码</div>
            <div className="popover-item" onClick={getLogout}>退出登录</div>
        </div>
    }
    return (
        <Header className="head-wrap">
            <div className="icon-ctrl" onClick={toggleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className={`current-position ${collapsed}?visible:not-visible`}>
                您当前所在的位置：{currentPosition}
            </div>
            <div className="login-form--wrap">
                <Popover trigger="hover" placement="bottomRight" content={renderPopover()}>
                    <div>
                        <UserOutlined />
                        <span className="user-name">xl-wolf</span>
                    </div>
                </Popover>
            </div>
        </Header>
    )
}
