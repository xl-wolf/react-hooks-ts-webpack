import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css'
import Layout from '@/components/layout/index';
import Loading from '@/components/loading'
const { lazy, Suspense } = React;
const Login = lazy(() => import( /* webpackChunkName:"login" */'@/views/login/index'))
const NotFound = lazy(() => import( /* webpackChunkName:"404" */'@/components/404/index'))
export default () => {
  return <Router>
    <Suspense fallback={<Loading size="large" />}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={Layout} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
}
