import * as React from "react";
import { Button, Form, Input } from "antd";
import { getSession, history, setSession } from "@/utils";
import "./index.less";
import { menuList } from "@/routers";
const { Item: FormItem } = Form;
const { useEffect, useState } = React;
export default () => {
  useEffect(() => {
    loadModulesRandom();
    return () => {};
  }, []);
  const loadModulesRandom = () => {
    const random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        import("./plugins/canvas02").then(({ drawCanvas }) => {
          drawCanvas("form-bg");
        });
        break;
      case 1:
        import("./plugins/canvas01").then(({ drawCanvas }) => {
          drawCanvas("form-bg");
        });
        break;
      case 2:
        import("./plugins/webgl01").then(({ drawCanvas }) => {
          drawCanvas("form-bg");
        });
        break;
      case 3:
        import("./plugins/webgl02").then(({ drawCanvas }) => {
          drawCanvas("form-bg");
        });
        break;
      default:
        break;
    }
  };
  const login = () => {
    setSession("appAuth", "true");
    if (JSON.parse(getSession("currentMenuItem"))) {
      const { path } = JSON.parse(getSession("currentMenuItem"));
      return history.push("/main" + path);
    }
    setSession("currentLocation", menuList[0].title);
    setSession("currentMenuItem", JSON.stringify(menuList[0]));
    history.push("/main/home");
  };
  return (
    <div id="form-bg">
      <div className="form">
        <div className="logo">
          <h2>管理系统模板</h2>
        </div>
        <Form>
          <FormItem
            label="账号:"
            name="userName"
            rules={[
              {
                len: 11,
                message: "请输入11位的手机号!",
              },
              {
                pattern: new RegExp("^[0-9]*$"),
                message: "手机号只能为数字!",
              },
            ]}
          >
            <Input placeholder="请输入手机号" allowClear maxLength={11} />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[
              {
                min: 6,
                max: 20,
                message: "请输入6-20位的密码!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="请输入密码"
              minLength={6}
              maxLength={20}
              allowClear
            />
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={login}
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
};
