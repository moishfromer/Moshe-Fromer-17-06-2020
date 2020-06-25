import React from 'react';
import Sidebar from '../filters/Sidebar';
import MailList from './MailList';
import PickUserId from './PickUserId';
import ComposeMail from './ComposeMail';
import FeedbackToast from './FeedbackToast';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';

export default function MailApp(){

    return (
        <ResponsiveDrawer menu={<Sidebar/>} appTitle={'Herolo Mail'}>
            <ComposeMail/>
            <PickUserId/>
            <MailList/>
            <FeedbackToast/>
        </ResponsiveDrawer> 
    )
}