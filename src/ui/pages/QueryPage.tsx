import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { selectDatabasesWithCollections } from '../store';

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
      {databasesWithCollections.map(({ name: databaseName, collections }) => (
        <Accordion key={databaseName}>
          <AccordionSummary>
            <Typography>{databaseName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {collections.map(({ name: collectionName }) => (
                <ListItem button key={`${databaseName}-${collectionName}`}>
                  <ListItemText primary={collectionName} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
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
