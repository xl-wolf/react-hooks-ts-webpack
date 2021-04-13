import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getSession, history, setSession } from "@/utils";
const { Sider } = Layout;
const { Item, SubMenu } = Menu;
import "./index.less";

export const menuList: any[] = [
  {
    key: "1",
    title: "首页",
    path: "/home",
    show: true,
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    title: "高德地图",
    path: "/amap",
    show: true,
    icon: <i className="iconfont xl-icon-gaodeditu" />,
  },
  {
    key: "3",
    title: "百度地图",
    path: "/bmap",
    show: true,
    icon: <i className="iconfont xl-icon-751bianjiqi_baiduditu" />,
  },
  {
    key: "4",
    title: "3D",
    show: true,
    icon: <i className="iconfont xl-icon-D" style={{ marginRight: "10px" }} />,
    children: [
      {
        key: "4-1",
        title: "three01",
        path: "/3D/three01",
        show: true,
        icon: <i className="iconfont xl-icon-3d" />,
      },
      {
        key: "4-2",
        title: "three02",
        path: "/3D/three02",
        show: true,
        icon: <i className="iconfont xl-icon-d" />,
      },
      {
        key: "4-3",
        title: "three03",
        path: "/3D/three03",
        show: true,
        icon: <i className="iconfont xl-icon-rotate3d" />,
      },
      {
        key: "4-4",
        title: "VR",
        path: "/3D/vr",
        show: true,
        icon: <i className="iconfont xl-icon-VR" />,
      },
    ],
  },
  {
    key: "5",
    title: "原生视频播放器",
    path: "/video",
    show: true,
    icon: <i className="iconfont xl-icon-shipin" />,
  },
  {
    key: "6",
    title: "video.js视频播放器",
    path: "/video-video.js",
    show: true,
    icon: <i className="iconfont xl-icon-shipin" />,
  },
  {
    key: "7",
    title: "权限管理",
    path: "/admin",
    show: true,
    icon: <i className="iconfont xl-icon-quanxian" />,
  },
];
interface ISiderProps {
  collapsed: boolean;
}
const recursive = (menuTree: any[], authData: any) => {
  menuTree.forEach((menuItem) => {
    if (menuItem?.children?.length) {
      recursive(menuItem.children, authData);
    }
    menuItem.show = authData[menuItem.key];
  });
};
export const renderMenu = () => {
  const sessionMenuList = getSession("menuList") && JSON.parse(getSession("menuList"));
  sessionMenuList && recursive(menuList, sessionMenuList);
};
renderMenu()
export default (SiderProps: ISiderProps) => {
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
