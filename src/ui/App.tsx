import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import { ThemeProvider } from '@mui/material'
import theme from './themes/default';
import Layout from './components/Layout'
import CodeEditor from './components/CodeEditor';


const Test = () => {
  return (
    <div>test</div>
  )
}

export function App() {
  window.bridge.initialize();

  return (
    <React.StrictMode>
      <Router>
        <ThemeProvider theme={theme}>
          <Layout>
            <Switch>
              <Route path="/test">
                <Test />
              </Route>
              <Route path="/">
                <CodeEditor />
              </Route>
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  )
}