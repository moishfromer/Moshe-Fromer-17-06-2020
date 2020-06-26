import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Button, Divider} from '@material-ui/core';
import { Send, Inbox } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenComposeDialog } from '../mail/mailSlice';
import {setVisibilityFilter, VisibilityFilters} from './filtersSlice';

const folders = [
  {
    text: 'Inbox',
    icon: <Inbox/>,
    filter: VisibilityFilters.SHOW_INBOX,
  },
  {
    text: 'Sent',
    icon: <Send/>,
    filter: VisibilityFilters.SHOW_SENT,
  },
]

export default function Sidebar() {
  const dispatch = useDispatch();

  function handleOpenDialog()
  {
      dispatch(setOpenComposeDialog(true));
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
        <Divider/>

        {folders.map(folder =>(
          <ListItem
            key={folder.text}
            button
            selected={visibilityFilter === folder.filter}
            onClick={e => handleClick(folder.filter)}
          >
            <ListItemIcon>
              {folder.icon}
            </ListItemIcon>
            <ListItemText primary={folder.text} />
          </ListItem>
        ))}
    
      </List>
    </div>
  );
}
