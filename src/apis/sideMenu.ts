import { request } from "@/utils/index";

export const getSideMenuApi = () => {
  return request({
    url: "/menu",
    method: "get"
  });
};
export const putSideMenuApi = (param:any) => {
  return request({
    url: `/menu/${param.key}`,
    method: "put"
  });
};