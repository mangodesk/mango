import * as React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StorageIcon from '@mui/icons-material/StorageOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';

const drawerWidth = 60;
const colorIcon = "#858585";

const Menu = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: (theme.palette.primary.main)
  }
}));

const Content = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: '100vh',
  p: 3,
  flexGrow: 1,
}));

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Menu
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <StorageIcon sx={{ color: colorIcon }} />  
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AddIcon sx={{ color: colorIcon }} />  
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon sx={{ color: colorIcon }} />  
            </ListItemIcon>
          </ListItem>
        </List>
      </Menu>
      <Content
        component="main"
      >
        <Toolbar />
        {children && children}
      </Content>
    </Box>
  );
}
