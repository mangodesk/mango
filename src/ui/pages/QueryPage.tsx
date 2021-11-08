import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { Collection, Database, RootState } from '../store';

export default function QueryPage() {
  const databases = useSelector<RootState, Database[]>((state) => state.db.databases);
  const collections = useSelector<RootState, Collection[]>((state) => state.db.collections);

  return (
    <Drawer
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List dense>
        {databases.map(({ name }) => (
          <ListItem button key={name}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
