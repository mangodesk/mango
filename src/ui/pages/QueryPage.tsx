import React, { Props } from 'react';
import {
  Drawer,
  List,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  Typography,
  AccordionDetails,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Collection, selectDatabasesWithCollections } from '../store';

function ExpandableListItemButton({ databaseName, collections }: { databaseName: string; collections: Collection[] }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment key={databaseName}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={databaseName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense>
          {collections.map(({ name: collectionName }) => (
            <ListItem sx={{ pl: 4 }} button key={`${databaseName}-${collectionName}`}>
              <ListItemText primary={collectionName} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default function QueryPage() {
  const databasesWithCollections = useSelector(selectDatabasesWithCollections);

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
      <List dense subheader={<ListSubheader component="div">Databases</ListSubheader>}>
        {databasesWithCollections.map(({ name: databaseName, collections }) => (
          <ExpandableListItemButton key={databaseName} databaseName={databaseName} collections={collections} />
        ))}
      </List>
      {/* <List dense>
        {databasesWithCollections.map(({ name }) => (
          <ListItem button key={name}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}
