import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css'
import Layout from '@/components/layout/index';
import Loading from '@/components/loading'
import { history } from '@/utils'
const { lazy, Suspense } = React;
const Login = lazy(() => import( /* webpackChunkName:"login" */'@/views/login/index'))
const NotFound = lazy(() => import( /* webpackChunkName:"login" */'@/components/404/index'))
export default () => {
  React.useEffect(() => {
    JSON.parse(sessionStorage.getItem('appAuth')) && history.push('/main/home')
  })
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
