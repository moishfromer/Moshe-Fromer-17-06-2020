import React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from '../filters/Sidebar';
import MailList from './MailList';
import PickUserId from './PickUserId';
import Header from './Header';
import ComposeMail from './ComposeMail';

export default function MailApp(){

    return (
        <Grid container>
            <Grid item xs={12}>
                <ComposeMail/>
            </Grid>
            <Grid item md={2}>
                <Sidebar />
            </Grid>
            <Grid item md={9}>
                <PickUserId/>
                <MailList/>
            </Grid>
        </Grid>
    )
}