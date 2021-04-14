import { ReduxAction } from "@/types/reduxAction";
import { getSession } from "@/utils";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { MENUAUTH } from "../action-types";
const menuList: any[] = [
  {
    key: "1",
    title: "首页",
    path: "/home",
    show: true,
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    title: "高德地图",
    path: "/amap",
    show: true,
    icon: <i className="iconfont xl-icon-gaodeditu" />,
  },
  {
    key: "3",
    title: "百度地图",
    path: "/bmap",
    show: true,
    icon: <i className="iconfont xl-icon-751bianjiqi_baiduditu" />,
  },
  {
    key: "4",
    title: "3D",
    show: true,
    icon: <i className="iconfont xl-icon-D" style={{ marginRight: "10px" }} />,
    children: [
      {
        key: "4-1",
        title: "three01",
        path: "/3D/three01",
        show: true,
        icon: <i className="iconfont xl-icon-3d" />,
      },
      {
        key: "4-2",
        title: "three02",
        path: "/3D/three02",
        show: true,
        icon: <i className="iconfont xl-icon-d" />,
      },
      {
        key: "4-3",
        title: "three03",
        path: "/3D/three03",
        show: true,
        icon: <i className="iconfont xl-icon-rotate3d" />,
      },
      {
        key: "4-4",
        title: "VR",
        path: "/3D/vr",
        show: true,
        icon: <i className="iconfont xl-icon-VR" />,
      },
    ],
  },
  {
    key: "5",
    title: "原生视频播放器",
    path: "/video",
    show: true,
    icon: <i className="iconfont xl-icon-shipin" />,
  },
  {
    key: "6",
    title: "video.js视频播放器",
    path: "/video-video.js",
    show: true,
    icon: <i className="iconfont xl-icon-shipin" />,
  },
  {
    key: "7",
    title: "权限管理",
    path: "/admin",
    show: true,
    icon: <i className="iconfont xl-icon-quanxian" />,
  },
];

export default (state: any[] = menuList, action: any) => {
  switch (action.type) {
    case MENUAUTH:
      console.log(state,9999)
      return [...state];
    default:
      return state;
  }
};
