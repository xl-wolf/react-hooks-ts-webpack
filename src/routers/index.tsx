import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import Loading from '@/components/loading'
import NotFound from '@/components/404/index'
const routers: RouteProps[] = [
  {
    path: '/main/home',
    exact: true,
    component: lazy(() => import('@/views/home/index'))
  },
  {
    path: '/main/about',
    exact: true,
    component: lazy(() => import('@/views/about/index')),
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
        authorized ? routers.map(({ path, exact, component }, index) => {
          return <Route key={path + '' + index} exact={exact} path={path} component={component} />
        }) :
          <Redirect to="/" />
      }
    </Switch>
  </Suspense>
}
