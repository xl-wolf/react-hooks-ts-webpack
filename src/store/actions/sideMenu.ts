import { getSideMenuApi } from "@/apis/sideMenu";
import { getSession, setSession } from "@/utils";
import store from "..";
import { MENUAUTH } from "../action-types";
export const dispatchMenuAuthAction = async () => {
  const MenuReduxActionRes = await MenuAuthAction();
  store.dispatch(MenuReduxActionRes);
  const {sideMenu:menuAuth} = store.getState();
  setSession("menuList", JSON.stringify(menuAuth));
};
export const MenuAuthAction = async () => {
  const {sideMenu:menuList} = store.getState()
  console.log(menuList,'MenuAuthAction')
  const { status, msg, data } = await getSideMenuApi();
  const recursive = (menuTree: any[], authData: any) => {
    menuTree?.forEach((menuItem) => {
      if (menuItem?.children?.length) {
        recursive(menuItem.children, authData);
      }
      menuItem.show = authData[menuItem.key];
    });
  };
  const renderMenu = () => {
    const sessionMenuList = getSession("menuList") && JSON.parse(getSession("menuList"));
    sessionMenuList && recursive(menuList, sessionMenuList);
  };
  if (status === 200) {
    renderMenu()
    return {
      type: MENUAUTH,
      status,
      data,
      msg,
    };
  }
};
