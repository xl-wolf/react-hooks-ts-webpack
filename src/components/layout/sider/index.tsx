import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getSession, history, setSession } from "@/utils";
const { Sider } = Layout;
const { Item, SubMenu } = Menu;
import "./index.less";
import store from "@/store";
interface ISiderProps {
  collapsed: boolean;
}

export default (SiderProps: ISiderProps) => {
  const {sideMenu:menuList} = store.getState()
  const { collapsed } = SiderProps;
  const recursiveFindCurMenuItem = (list: any[], curItem: any): any => {
    for (let i = 0; i < list.length; i++) {
      const currentMenuItem = list.find((it) => it.key === curItem.key);
      if (currentMenuItem) return currentMenuItem;
      if (list[i].children?.length)
        return recursiveFindCurMenuItem(list[i].children, curItem);
    }
  };
  // menu的点击事件，跳转到相应的地址
  const menuItemClick = (item: any) => {
    const currentMenuItem = recursiveFindCurMenuItem(menuList, item);
    const { title, path } = currentMenuItem;
    setSession("currentLocation", title);
    setSession("currentMenuItem", JSON.stringify(currentMenuItem));
    history.push("/main" + path);
  };
  // 递归处理侧边栏菜单
  const recursiveHandleMenu = (menuTree: any[]) => {
    return menuTree?.map(({ key, title, icon, children, show }) => {
      if (show) {
        if (children?.length) {
          return (
            <SubMenu
              className={collapsed ? "collapsed-submenu-title-desc" : ""}
              key={key}
              title={title}
              icon={icon}
            >
              {recursiveHandleMenu(children)}
            </SubMenu>
          );
        }
        return (
          <Item key={key} icon={icon}>
            {title}
          </Item>
        );
      }
    });
  };

  let defaultSelectedKeys;
  let defaultOpenKeys;
  if (JSON.parse(getSession("currentMenuItem"))) {
    const { key } = JSON.parse(getSession("currentMenuItem"));
    defaultSelectedKeys = [key];
    defaultOpenKeys = [key.slice(0, -2)]; // 此处需要在配置路由的时候配合
  }
  return (
    <Sider collapsed={collapsed}>
      <div className="logo-wrapper">
        <div className="logo" />
        {!collapsed && <div>xl-wolf</div>}
      </div>
      <Menu
        theme={"dark"}
        onClick={(item: any) => menuItemClick(item)}
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
      >
        {recursiveHandleMenu(menuList)}
      </Menu>
    </Sider>
  );
};
