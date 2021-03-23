import * as React from 'react'
import { Layout, Menu } from 'antd'
// import { RouteComponentProps } from 'react-router-dom'
import { HomeOutlined, FileSearchOutlined, FrownOutlined } from '@ant-design/icons';
import { SiderMenu } from '@/types/SiderMenu'
// import 'antd/dist/antd.css'
const { Sider } = Layout
const { Item, SubMenu } = Menu

interface ISiderProps //extends RouteComponentProps
{
    collapsed: boolean,
    dispatch?: any,
}
interface IState {
    selectedKeys?: Array<string>,
    openKeys?: Array<string>
}

const menuList: SiderMenu[] = [
    {
        key: '1',
        title: '首页',
        path: '/home',
        icon: <HomeOutlined />
    },
    {
        key: '2',
        title: '关于我们',
        icon: <FileSearchOutlined />,
        children: [
            {
                key: '2-1',
                title: '关于',
                path: '/about',
                icon: <FrownOutlined />,
            }
        ]
    },
]

export default (iSiderProps: ISiderProps, iState: IState) => {
    const recursiveFindCurMenuItem = (list: SiderMenu[], curItem: any): SiderMenu => {
        let currentMenuItem
        for (let i = 0; i < list.length; i++) {
            currentMenuItem = list.find((it) => it.key === curItem.key)
            if (currentMenuItem) return currentMenuItem
            if (list[i].children?.length) {
                return recursiveFindCurMenuItem(list[i].children, curItem)
            }
        }
        return currentMenuItem
    }
    // menu的点击事件，跳转到相应的地址
    const menuItemClick = (item: any) => {
        const currentMenuItem = recursiveFindCurMenuItem(menuList, item)
        const { title } = currentMenuItem
        sessionStorage.setItem('currentLocation', title)
    }
    // 递归处理侧边栏菜单
    const recursiveHandleMenu = (menuTree: SiderMenu[]) => {
        return menuTree?.map(({ key, title, icon, children }) => {
            if (children?.length) {
                return <SubMenu key={key} title={title} icon={icon}>
                    {recursiveHandleMenu(children)}
                </SubMenu>
            }
            return (<Item key={key} icon={icon}>{title}</Item>)
        })
    }

    const { collapsed } = iSiderProps
    const { selectedKeys, openKeys } = iState
    return (
        <Sider collapsed={collapsed}>
            <Menu
                theme={'dark'}
                onClick={(item) => menuItemClick(item)}
                mode="inline"
                defaultSelectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}>
                {recursiveHandleMenu(menuList)}
            </Menu>
        </Sider>
    )
}
