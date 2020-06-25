import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { closeToast } from './mailSlice';

export default function FeedbackToast(){
    const dispatch = useDispatch();

    const { feedbackToast } = useSelector(state => state.mailApp);
    const handleToastClose = () => dispatch(closeToast())

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={feedbackToast.show}
            autoHideDuration={3000}
            message={feedbackToast.message}
            onClose={handleToastClose}
        />
    )
}