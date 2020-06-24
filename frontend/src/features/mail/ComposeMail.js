import React, {useState} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Typography, Toolbar, AppBar, CircularProgress,
     Snackbar } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import { sendMessage, setOpenDialog } from './mailSlice';
import { unwrapResult } from '@reduxjs/toolkit'

export default function ComposeMail(props)
{
    const dispatch = useDispatch();
    const emptyForm = {
        sender: '',
        receiver: '',
        subject: '',
        message: ''
    }
    const [form, setForm] = useState({...emptyForm});
    const { messagePending, openDialog } = useSelector(state => state.mailApp);
    const [ toast, setToast] = useState({show: false, message: ''});

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleCloseDialog()
    {
        dispatch(setOpenDialog(false));
    }

    function handleDelete()
    {
        dispatch(setOpenDialog(false));
    }

    function handleSubmit(ev)
    {
        ev.preventDefault();
        dispatch(sendMessage(form))
        .then(unwrapResult)
        .then(res => {
            setToast({show: true, message: 'message sent'})
            dispatch(setOpenDialog(false))
            setForm({...emptyForm})
        })
        .catch(err => setToast({show: true, message: 'message failed'}))
    }

    const canBeSubmitted = () => form.sender && form.receiver && form.subject && form.message;
    const handleToastClose = () => setToast({show: false, message: ''});

    return (
        <div className="p-24">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={toast.show}
                autoHideDuration={3000}
                message={toast.message}
                onClose={handleToastClose}
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            New Message
                        </Typography>
                    </Toolbar>
                </AppBar>

                <form noValidate onSubmit={handleSubmit} className="flex flex-col">
                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            style={{marginBottom: '16px', marginTop: '8px'}}
                            label="Sender"
                            id="sender"
                            name="sender"
                            value={form.sender}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            style={{marginBottom: '16px', marginTop: '8px'}}
                            label="receiver"
                            id="receiver"
                            name="receiver"
                            value={form.receiver}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            style={{marginBottom: '16px', marginTop: '8px'}}
                            label="Subject"
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            style={{marginBottom: '16px', marginTop: '8px'}}
                            id="message"
                            name="message"
                            onChange={handleChange}
                            value={form.message}
                            label="Message"
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                    </DialogContent>

                    <DialogActions style={{justifyContent: 'space-between'}}>
                        <div style={{paddingLeft: '16px'}}>
                            <Button variant="contained" color="primary" type="submit"
                             disabled={!canBeSubmitted()}
                             >
                                {messagePending ? <CircularProgress size={20} color="inherit"/> : <span>Send</span>}
                            </Button>
                        </div>
                        <Button onClick={handleDelete}>cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

