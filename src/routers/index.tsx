import React,{ lazy, Suspense } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Route, Switch, RouteProps, Redirect } from "react-router-dom";
import Loading from "@/components/loading";
import NotFound from "@/components/404/index";
import { SiderMenu } from "@/types/SiderMenu";
import "@/assets/iconfont/iconfont.css";
import { sideMenuApi } from "@/apis/sideMenu";

let menuList: SiderMenu[] = [
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
];
const configMenuList = () => {
  sideMenuApi().then((res: any) => {
    // console.log(res);
    const { data } = res;
    function recursive(menuTree: SiderMenu[]) {
      menuTree.forEach((menuItem) => {
        if (menuItem?.children?.length) {
          recursive(menuItem.children);
        } 
        menuItem.show = data[menuItem.key];
      });
    }
    recursive(menuList);
  });
};
configMenuList();
export { menuList };
const routers: RouteProps[] = [
  {
    path: "/main/home",
    exact: true,
    component: lazy(() => import("@/views/home/index")),
  },
  {
    path: "/main/amap",
    exact: true,
    component: lazy(() => import("@/views/amap/index")),
  },
  {
    path: "/main/bmap",
    exact: true,
    component: lazy(() => import("@/views/bmap/index")),
  },
  {
    path: "/main/3D/three01",
    exact: true,
    component: lazy(() => import("@/views/three/three01/index")),
  },
  {
    path: "/main/3D/three02",
    exact: true,
    component: lazy(() => import("@/views/three/three02/index")),
  },
  {
    path: "/main/3D/three03",
    exact: true,
    component: lazy(() => import("@/views/three/three03/index")),
  },
  {
    path: "/main/3D/vr",
    exact: true,
    component: lazy(() => import("@/views/three/vr/index")),
  },
  {
    path: "/main/video",
    exact: true,
    component: lazy(() => import("@/views/video/index")),
  },
  {
    path: "/main/video-video.js",
    exact: true,
    component: lazy(() => import("@/views/video-video/index")),
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default (authorized: boolean) => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {authorized ? (
          routers.map(({ path, exact, component }, index) => (
            <Route
              key={path + "" + index}
              exact={exact}
              path={path}
              component={component}
            />
          ))
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </Suspense>
  );
};
