import { sideMenuApi } from "@/apis/sideMenu";
import { MENUAUTH } from "../action-types";

export const MenuAuthAction = async () => {
  const { status, msg, data } = await sideMenuApi();
  if (status === 200) {
    return {
      type: MENUAUTH,
      status,
      data,
      msg,
    };
  }
};
