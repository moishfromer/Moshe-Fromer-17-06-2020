import React, {useState} from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from './mailSlice';

export default function PickUserId(){
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const { messagePending, openDialog } = useSelector(state => state.mailApp);
    const [ toast, setToast] = useState({show: false, message: ''});

    const handleChange = e => setUserId(e.target.value);
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getMessages(userId))
    }
    return (
        <form noValidate onSubmit={handleSubmit} style={{display: 'flex'}}>
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
            />
            <Button variant='contained' color='primary' style={{margin: '8px'}} type='submit' disabled={!userId}>
                {messagePending ? <CircularProgress size={20} color='inherit'/> : 'go'}
            </Button>
        </form>

    )
}