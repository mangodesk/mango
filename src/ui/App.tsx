import * as React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { CircularProgress, createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import defaultTheme from './themes/default';
import Layout from './components/Layout';
import ConnectionPage from './pages/ConnectionPage';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import { MessagerProvider } from './core/messager';

const QueryPage = React.lazy(() => import('./pages/QueryPage'));

function AppLoading() {
  const isInitializing = useSelector<RootState>((state) => state.app.isInitializing);

  if (isInitializing) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }

  return (
    <React.Suspense fallback="Loading...">
      <Layout>
        <Switch>
          <Route exact path="/" component={ConnectionPage} />
        </Switch>
        <Switch>
          <Route exact path="/query" component={QueryPage} />
        </Switch>
      </Layout>
    </React.Suspense>
  );
}

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        ...defaultTheme,
      }),
    [prefersDarkMode],
  );

  return (
    <React.StrictMode>
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <MessagerProvider>
              <AppLoading />
            </MessagerProvider>
          </Provider>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
}
