import { ThemeProvider } from '@mui/material'
import Layout from './components/Layout'
import theme from './themes/default';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  )
}