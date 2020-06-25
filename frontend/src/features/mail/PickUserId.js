import React from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, setUserId } from './mailSlice';

export default function PickUserId(){
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.mailApp);

    const handleChange = e => {
        const userId = e.target.value;
        if(userId && isNaN(userId)) return;

        dispatch(setUserId(userId))
        if(userId){
            dispatch(getMessages(userId))
        }
    }

    return (
            <TextField
                style={{margin: '8px'}}
                label="UserId"
                id="userId"
                name="userId"
                value={userId}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                autoFocus
            />
    )
}