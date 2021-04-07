import { request } from "@/utils/index";

export const sideMenuApi = () => {
  return request({
    url: "/menu",
    method: "get"
  });
};