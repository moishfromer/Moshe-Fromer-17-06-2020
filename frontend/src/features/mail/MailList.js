import React from 'react';
import { List, ListItem, CircularProgress } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { VisibilityFilters } from '../filters/filtersSlice';
import { createSelector } from '@reduxjs/toolkit'

const selectMails = state => state.mailApp.mails;
const selectFilter = state => state.visibilityFilter;
const userId = state => parseInt(state.mailApp.userId) || '';

const selectVisibleMails = createSelector(
  [selectMails, selectFilter, userId],
  (mails, filter, userId) => {
    switch (filter) {
      case VisibilityFilters.SHOW_INBOX:
        return mails.filter(m => m.receiver === userId)
      case VisibilityFilters.SHOW_SENT:
        return mails.filter(m => m.sender === userId)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
)

export default function MailList(){
    const mails = selectVisibleMails(useSelector(state => state))
    const { getMessagesPending, userId } = useSelector(state => state.mailApp)
    const noMailsMessage = userId ? 'No messages for this user' : 'Enter userId';
    return(
        <>
        {getMessagesPending ? <CircularProgress size={50}/> :
        mails.length ? 
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
        :
            <Typography
                align='center'
                variant='subtitle1'
            >
                {noMailsMessage}
            </Typography>
        }
        </>
  );
}
