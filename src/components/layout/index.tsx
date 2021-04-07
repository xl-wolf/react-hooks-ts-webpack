import React, { useState, useEffect, useRef } from "react";
import { Layout, Modal } from "antd";
import Sider from "./sider/index";
import HeaderComponent from "@/components/layout/header/index";
import Footer from "@/components/layout/footer/index";
import "./index.less";
import RouterMap from "@/routers/index";
import { getSession, history, setSession } from "@/utils";
import { logoutApi } from "@/apis/user";
const { Content } = Layout;
interface LayoutState {
  collapsed?: boolean;
}

export default () => {
  const initLayoutState: LayoutState = {
    collapsed: JSON.parse(getSession("siderCollapsed")),
  };
  //   const timer = useRef(null);
  //   let [routeChange, setrouteChange] = useState(false);
  const [layoutState, setLayoutState] = useState(initLayoutState);
  const { collapsed } = layoutState;
  useEffect(() => {
    // timer.current = setTimeout(() => setrouteChange((routeChange = true)), 1000);
    return () => {
      //   clearTimeout(timer.current);
      //   timer.current = null;
      //   setrouteChange((routeChange = false));
    };
  }, [getSession("currentLocation")]);
  const logout = () => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        const { status } = await logoutApi();
        if (status === 200) {
          setSession("appAuth", "false");
          history.replace("/");
        }
      },
    });
  };
  const changePassWord = () => {
    console.log("changePassWord");
  };
  const toggleCollapsed = () => {
    // 派发window resize事件
    window.dispatchEvent(new Event("resize"));
    setLayoutState({ collapsed: !collapsed });
    setSession("siderCollapsed", JSON.stringify(!collapsed));
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsed={collapsed} />
      <Layout>
        <HeaderComponent
          getLogout={logout}
          changePassWord={changePassWord}
          toggleCollapsed={toggleCollapsed}
          collapsed={collapsed}
          currentPosition={getSession("currentLocation")}
        />
        {/* ${routeChange ? "visible" : "not-visible"} */}
        <Content className={`layout-content`}>
          {RouterMap(JSON.parse(getSession("appAuth")))}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
