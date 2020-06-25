import React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from '../filters/Sidebar';
import MailList from './MailList';
import PickUserId from './PickUserId';
import Header from './Header';
import ComposeMail from './ComposeMail';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';

export default function MailApp(){

    return (
        <ResponsiveDrawer menu={<Sidebar/>} appTitle={'Herolo Mail'}>
            <ComposeMail/>
            <PickUserId/>
            <MailList/>
        </ResponsiveDrawer> 
    )
}