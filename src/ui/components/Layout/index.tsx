import * as React from 'react'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

const Content = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: '100vh',
  p: 3,
  flexGrow: 1,
}))

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Content component="main">{children && children}</Content>
    </Box>
  )
}
