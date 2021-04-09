import React,{ lazy, Suspense } from "react";
import { Route, Switch, RouteProps, Redirect } from "react-router-dom";
import Loading from "@/components/loading";
import NotFound from "@/components/404/index";
import "@/assets/iconfont/iconfont.css";

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
    component: lazy(() => import("@/views/video-flv/index")),
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
