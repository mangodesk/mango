import React from 'react'

import GlobalStyle from './styles/GlobalStyle'
import Layout from './components/Layout'
import CodeEditor from './components/CodeEditor'

export function App() {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Layout />
      <CodeEditor />
    </React.StrictMode>
  )
}