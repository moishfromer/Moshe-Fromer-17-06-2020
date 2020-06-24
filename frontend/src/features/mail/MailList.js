import React from 'react';
import { List, ListItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

export default function MailList(){
    const {mails} = useSelector(state => state.mailApp)
    return(
    <List >
        {mails.map(mail => (
            <React.Fragment key={mail.id}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={mail.subject}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {`UserId ${mail.sender} - `}
                        </Typography>
                        {mail.message}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        ))}
      
    </List>
  );
}
