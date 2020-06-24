import React from 'react';
import {List, ListItem, Paper, ListItemIcon, ListItemText, Button, Divider} from '@material-ui/core';
import { Send, Inbox } from '@material-ui/icons';
import { BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpenDialog } from './mailSlice';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}



export default function Sidebar() {
    const dispatch = useDispatch();

    function handleOpenDialog()
    {
        dispatch(setOpenDialog(true));
    }
    
    return (
        <Router >
            <Paper elevation={0}>
            <List aria-label="main mailbox folders">
            <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    onClick={handleOpenDialog}
                >
                    Compose
                </Button>
                <ListItemLink to="/inbox" primary="Inbox" icon={<Inbox />} />
                <ListItemLink to="/sent" primary="Sent" icon={<Send />} />
            </List>
            <Divider />
            </Paper>
        </Router>
    );
}
