import * as React from 'react';
import { lazy, Suspense } from 'react';
import { HomeOutlined, FileSearchOutlined, FrownOutlined,HeatMapOutlined } from '@ant-design/icons';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import Loading from '@/components/loading'
import NotFound from '@/components/404/index'
import { SiderMenu } from '@/types/SiderMenu';

export const menuList: SiderMenu[] = [
  {
      key: '1',
      title: '首页',
      path: '/home',
      icon: <HomeOutlined />
  },
  {
      key: '2',
      title: '关于我们',
      icon: <FileSearchOutlined />,
      children: [
          {
              key: '2-1',
              title: '关于',
              path: '/about',
              icon: <FrownOutlined />,
          }
      ]
  },
  {
      key: '3',
      title: '高德地图',
      path: '/amap',
      icon: <HeatMapOutlined />
  },
  {
      key: '4',
      title: '百度地图',
      path: '/bmap',
      icon: <HeatMapOutlined />
  },
]

const routers: RouteProps[] = [
  {
    path: '/main/home',
    exact: true,
    component: lazy(() => import('@/views/home/index'))
  },
  {
    path: '/main/about',
    exact: true,
    component: lazy(() => import('@/views/about/index'))
  },
  {
    path: '/main/amap',
    exact: true,
    component: lazy(() => import('@/views/amap/index'))
  },
  {
    path: '/main/bmap',
    exact: true,
    component: lazy(() => import('@/views/bmap/index'))
  },
  {
    path: '*',
    component: NotFound
  },
]

export default (authorized: boolean) => {
  return <Suspense fallback={<Loading />}>
    <Switch>
      {
        authorized ?
          routers.map(({ path, exact, component }, index) => (<Route key={path + '' + index} exact={exact} path={path} component={component} />)) :
          <Redirect to="/" />
      }
    </Switch>
  </Suspense>
}
