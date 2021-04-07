import React,{ useEffect, useState, useRef } from "react";
import { Popover, Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header } = Layout;
import "./index.less";
interface HeaderProps {
  getLogout: () => void; //退出登录
  changePassWord: () => void; //预留修改密码
  toggleCollapsed: () => void; //侧边栏收展方法
  collapsed: boolean; //侧边栏状态
  currentPosition: string; //当前所在的位置
}

export default (hProps: HeaderProps) => {
  let [routeChange, setrouteChange] = useState(false);
  const {
    collapsed,
    toggleCollapsed,
    getLogout,
    changePassWord,
    currentPosition,
  } = hProps;
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setTimeout(() => setrouteChange((routeChange = true)), 800);
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
      setrouteChange((routeChange = false));
    };
  }, [currentPosition]);
  const renderPopover = () => {
    return (
      <div style={{ cursor: "pointer" }}>
        <div className="popover-item" onClick={changePassWord}>
          修改密码
        </div>
        <div className="popover-item" onClick={getLogout}>
          退出登录
        </div>
      </div>
    );
  };
  return (
    <Header className="head-wrap">
      <div className="icon-ctrl" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="current-position">
        您当前所在的位置：
        <span className={`fade ${routeChange ? "visible" : "not-visible"}`}>
          {currentPosition}
        </span>
      </div>
      <div className="login-form--wrap">
        <Popover
          trigger="hover"
          placement="bottomRight"
          content={renderPopover()}
        >
          <div>
            <UserOutlined />
            <span className="user-name">xl-wolf</span>
          </div>
        </Popover>
      </div>
    </Header>
  );
};
