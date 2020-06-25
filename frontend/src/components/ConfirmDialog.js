import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';

export default function ConfirmDialog(props){

    return (
        <Dialog open={props.open}>
            <DialogContent>
                <p>{props.text}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>cancel</Button>
                <Button variant='contained' color='primary' onClick={props.onConfirm}>yes</Button>
            </DialogActions>
        </Dialog>
    )
}