import React, { createContext, lazy, useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import merge from 'lodash/merge'

import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import defaultTheme from './themes/default'
import Layout from './components/Layout'
import ConnectionPage from './pages/ConnectionPage'
import { Provider, useSelector } from 'react-redux'
import store, { RootState, useAppDispatch, setIsInitializing } from './store'

// const CodeEditor = lazy(() => import('./components/CodeEditor'));

type Messager = {
  handle: (name: string, handlerFn: (message: any) => Promise<any>) => void
  invoke: (name: string, payload?: any) => Promise<any>
}

const MessagerContext = createContext<undefined | Messager>(undefined)

function AppLoading() {
  const [messager, setMessager] = useState<undefined | Messager>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initialize = async () => {
      dispatch(setIsInitializing(true))

      const bridgeAPI = await window.bridge.initialize()

      setMessager(bridgeAPI.messager)

      setTimeout(() => {
        dispatch(setIsInitializing(false))
      }, 2000)
    }

    initialize()
  }, [])

  const isInitializing = useSelector<RootState>(
    state => state.app.isInitializing
  )

  if (isInitializing) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    )
  }

  return (
    <MessagerContext.Provider value={messager}>
      <Layout>
        <Switch>
          <Route path="/" component={ConnectionPage} />
        </Switch>
      </Layout>
    </MessagerContext.Provider>
  )
}

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme(
        merge({}, defaultTheme, {
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        })
      ),
    [prefersDarkMode]
  )

  return (
    <React.StrictMode>
      <Router>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <AppLoading />
          </Provider>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  )
}
