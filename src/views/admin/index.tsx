import React, { useState, useEffect } from "react";
import { menuList } from "@/components/layout/sider";
import "./index.less";
import { Switch } from "antd";
import { putSideMenuApi } from "@/apis/sideMenu";
import { dispatchMenuAuthAction } from "../login";
export default () => {
  const onChange = async (routeItem:any,checked: boolean) => {
    console.log(routeItem,`switch to ${checked}`);
    await putSideMenuApi(routeItem)
    dispatchMenuAuthAction()
  };
  return (
    <div className="admin-wrapper">
      {menuList.map((route: any) => {
        return (
          <div className="admin-item" key={route.key}>
            <span className="label">{route.title}</span>
            <Switch checked={route.show} onChange={onChange.bind(null,route)} />
          </div>
        );
      })}
    </div>
  );
};
