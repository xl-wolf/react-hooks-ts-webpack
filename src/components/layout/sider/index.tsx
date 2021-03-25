import * as React from 'react'
import { Layout, Menu } from 'antd'
import { SiderMenu } from '@/types/SiderMenu'
import { getSession, history, setSession } from '@/utils'
import { menuList } from '@/routers'
const { Sider } = Layout
const { Item, SubMenu } = Menu
import './index.less'
interface SiderProps {
    collapsed: boolean
}
interface State {
    defaultSelectedKeys: string[]
    defaultOpenKeys: string[]
}

export default (SiderProps: SiderProps) => {
    const initialSiderState: State = {
        defaultSelectedKeys: [],
        defaultOpenKeys: []
    }
    const { collapsed } = SiderProps
    const { defaultSelectedKeys, defaultOpenKeys } = initialSiderState
    if (JSON.parse(getSession('currentMenuItem'))) {
        const { key } = JSON.parse(getSession('currentMenuItem'))
        initialSiderState.defaultSelectedKeys = [key]
        initialSiderState.defaultOpenKeys = [key.slice(0, -2)] // 此处需要在配置路由的时候配合
    }
    const recursiveFindCurMenuItem = (list: SiderMenu[], curItem: any): SiderMenu => {
        for (let i = 0; i < list.length; i++) {
            const currentMenuItem = list.find((it) => it.key === curItem.key)
            if (currentMenuItem) return currentMenuItem
            if (list[i].children?.length) return recursiveFindCurMenuItem(list[i].children, curItem)
        }
    }
    // menu的点击事件，跳转到相应的地址
    const menuItemClick = (item: any) => {
        const currentMenuItem = recursiveFindCurMenuItem(menuList, item)
        const { title, path } = currentMenuItem
        setSession('currentLocation', title)
        setSession('currentMenuItem', JSON.stringify(currentMenuItem))
        history.push('/main' + path)
    }
    // 递归处理侧边栏菜单
    const recursiveHandleMenu = (menuTree: SiderMenu[]) => {
        return menuTree?.map(({ key, title, icon, children }) => {
            if (children?.length) {
                return <SubMenu className={collapsed ? 'collapsed-submenu-title-desc' : ''} key={key} title={title} icon={icon}>
                    {recursiveHandleMenu(children)}
                </SubMenu>
            }
            return (<Item key={key} icon={icon}>{title}</Item>)
        })
    }
    return (
        <Sider collapsed={collapsed}>
            <div className="logo-wrapper">
                <div className="logo" />
                {!collapsed && <div>xl-wolf</div>}
            </div>
            <Menu
                theme={'dark'}
                onClick={(item) => menuItemClick(item)}
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}>
                {recursiveHandleMenu(menuList)}
            </Menu>
        </Sider>
    )
}
