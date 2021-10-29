import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './themes/default';
import Layout from './components/Layout'
import CodeEditor from './components/CodeEditor';

export function App() {
  window.bridge.initialize();

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Layout>
          <CodeEditor />
        </Layout>
      </ThemeProvider>
    </React.StrictMode>
  )
}