import { request } from "@/utils/index";
interface User {
  userName: string;
  password: string;
}
export const registerApi = (params:User) => {
  return request({
    url: "user/register",
    method: "post",
    params,
  });
};
export const loginApi = (params:User) => {
  return request({
    url: "user/login",
    method: "get",
    params,
  });
};
export const logoutApi = () => {
  return request({
    url: "user/logout",
    method: "post"
  });
};
