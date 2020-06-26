import React, {useState} from 'react';
import { IconButton, CircularProgress, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { VisibilityFilters } from '../filters/filtersSlice';
import { createSelector } from '@reduxjs/toolkit'
import { Delete } from '@material-ui/icons';
import ConfirmDialog from '../../components/ConfirmDialog';
import { deleteMessage } from './mailSlice';
import moment from 'moment';

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
    const dispatch = useDispatch();
    const mails = selectVisibleMails(useSelector(state => state))
    const { getMessagesPending, userId } = useSelector(state => state.mailApp)
    const noMailsMessage = userId ? 'No messages for this user' : 'Enter userId';

    const visibilityFilter = useSelector(state => state.visibilityFilter)
    const senderOrReceiver = visibilityFilter == VisibilityFilters.SHOW_INBOX ? 'sender' : 'receiver';

    const [openConfirmDialog, setOpenConfirmDialog ] = useState(false)
    const [mailToDelete, setMailToDelete ] = useState(null)
    const confirmDelete = mailId => {
        setOpenConfirmDialog(true)
        setMailToDelete(mailId)
    }
    const handleDelete = e => {
        dispatch(deleteMessage(mailToDelete));
        setOpenConfirmDialog(false)
    }

    return(
        <>
            <ConfirmDialog 
                open={openConfirmDialog}
                text={'Are you sure you want to delete this mail?'}
                onCancel={e => setOpenConfirmDialog(false)}    
                onConfirm={handleDelete}    
            />    
            {getMessagesPending ? 
                <div style={{display: 'flex', justifyContent: 'center'}}> <CircularProgress size={50}/></div> 
            : mails.length ? 
                <List >
                    {mails.map(mail => (
                        <React.Fragment key={mail.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                primary={mail.subject + ' - ' + moment(mail.creation_date).format('LT')}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {`UserId ${mail[senderOrReceiver]} - `}
                                        </Typography>
                                        {mail.message}
                                        <IconButton 
                                            style={{float:'right'}}
                                            onClick={e => confirmDelete(mail.id)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </>
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
