import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from './themes/default';
import Layout from './components/Layout'

export function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </React.StrictMode>
  )
}