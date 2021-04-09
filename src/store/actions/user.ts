import { loginApi, registerApi } from "@/apis/user";
import { account } from "@/types/account";
import { LOGIN, REGISTER } from "../action-types";

export const loginAction = async (account: account) => {
  const { status, msg } = await loginApi(account);
  if (status === 200) {
    return {
      type: LOGIN,
      status,
      account,
      msg,
    };
  }
  return registerAction(account);
};
const registerAction = async (account: account) => {
  const { status, msg } = await registerApi(account);
  if (status === 200) {
    return {
      type: REGISTER,
      status,
      account,
      msg,
    };
  }
  return {
    type: REGISTER,
    status: 400,
    account,
    msg,
  };
};
