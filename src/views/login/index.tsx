import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import "./index.less";
import { account } from "@/types/account";
import { loginAction, MenuAuthAction } from "@/store/actions/index";
import { getSession, history, setSession } from "@/utils";
import store from "@/store";
import { menuList } from "@/components/layout/sider";

const { Item: FormItem } = Form;
export default () => {
  let [clear, setclear] = useState(null);
  useEffect(() => {
    loadModulesRandom();
    return () => {
      clear && clear();
    };
  }, []);
  const loadModulesRandom = (idx?: number) => {
    const random = idx || Math.ceil(Math.random() * 14);
    switch (random) {
      case 1:
        import("./plugins/canvas01").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 2:
        import("./plugins/canvas01").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 3:
        import("./plugins/canvas03").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 4:
        import("./plugins/canvas03").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 5:
        import("./plugins/canvas05").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 6:
        import("./plugins/canvas06").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 7:
        import("./plugins/canvas06").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 8:
        import("./plugins/canvas08").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 9:
        import("./plugins/webgl01").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 10:
        import("./plugins/webgl02").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 11:
        import("./plugins/webgl03").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 12:
        import("./plugins/webgl04").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 13:
        import("./plugins/webgl05").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 14:
        import("./plugins/webgl05").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      case 15:
        import("./plugins/webgl05").then(({ drawCanvas, clearFunc }) => {
          setclear((clear = clearFunc));
          drawCanvas("form-bg");
        });
        break;
      default:
        break;
    }
  };

  const login = async (account: account) => {
    const ReduxActionRes = await loginAction(account);
    if (ReduxActionRes.status !== 200) return;
    store.dispatch(ReduxActionRes);
    const {
      user: { status,type },
    } = store.getState();
    if (status !== 200||type!=='LOGIN') return;
    const MenuReduxActionRes = await MenuAuthAction();
    store.dispatch(MenuReduxActionRes);
    const {
      sideMenu: { data: menuAuth },
    } = store.getState();
    setSession("menuList", JSON.stringify(menuAuth));
    setSession("appAuth", "true");
    const sessionMenuItem = JSON.parse(getSession("currentMenuItem"));
    if (sessionMenuItem) {
      const { path } = sessionMenuItem;
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
        <Form onFinish={login} name="basic">
          <FormItem
            label="账号:"
            name="userName"
            rules={[
              {
                required: true,
                len: 11,
                message: "请输入11位的手机号!",
              },
              {
                required: true,
                pattern: new RegExp("^[0-9]*$"),
                message: "手机号只能为数字!",
              },
            ]}
          >
            <Input placeholder="请输入手机号" allowClear />
          </FormItem>
          <FormItem
            label="密码:"
            name="password"
            rules={[
              {
                required: true,
                min: 6,
                max: 20,
                message: "请输入6-20位的密码!",
              },
            ]}
          >
            <Input type="password" placeholder="请输入密码" allowClear />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录/注册
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
