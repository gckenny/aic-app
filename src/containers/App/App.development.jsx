import { Fragment } from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import renderNothing from 'recompose/renderNothing';
import withHandlers from 'recompose/withHandlers';

/** Local Components */
import Loading from './components/Loading';
import Content from './layout/Content';
import Header from './layout/Header';

const AIContest = Loadable({
  loader: () => import('app/containers/AIContest'),
  loading: Loading,
});

const App = () => {
  return (
    <Fragment>
      <Header selectedNavItem={AIContest} />
      <Content>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/AIContest" />} />
          <Route path="/app/AIContest" component={AIContest} />
        </Switch>
      </Content>
    </Fragment>
  );
};

export default compose(
  withRouter,
  withHandlers({
    openWindow: () => (url) => () => {
      if (!url) {
        return;
      }

      const w = window.open('', '_blank', '');
      w.location = url;
      w.opener = null;
    },
  }),
  branch(({ isAppInitializing }) => isAppInitializing, renderNothing),
  lifecycle({
    componentDidMount() {
      const initLoaderElement = document.getElementById('init-loader');
      if (initLoaderElement) {
        document.body.removeChild(initLoaderElement);
      }
    },
    componentWillUnmount() {
      if (this.unlistenHistory) {
        this.unlistenHistory();
      }
    },
  })
)(App);
