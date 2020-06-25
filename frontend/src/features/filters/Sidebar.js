import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Button} from '@material-ui/core';
import { Send, Inbox } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog } from '../mail/mailSlice';
import {setVisibilityFilter, VisibilityFilters} from './filtersSlice';

export default function Sidebar() {
  const dispatch = useDispatch();

  function handleOpenDialog()
  {
      dispatch(setOpenDialog(true));
  }

  const visibilityFilter = useSelector(state => state.visibilityFilter)

  function handleClick(filter){
    dispatch(setVisibilityFilter(filter));
  };

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenDialog}
          >
              + Compose 
          </Button>
        </ListItem>
                  
        <ListItem
          button
          selected={visibilityFilter === VisibilityFilters.SHOW_INBOX}
          onClick={e => handleClick(VisibilityFilters.SHOW_INBOX)}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={visibilityFilter === VisibilityFilters.SHOW_SENT}
          onClick={e => handleClick(VisibilityFilters.SHOW_SENT)}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
      </List>
    </div>
  );
}
