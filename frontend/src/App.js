import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MailApp from './features/mail/MailApp';

function App() {
  return (
    <Switch>
      <Route path='/'>
        <MailApp />
      </Route>
    </Switch>
    
  );
}

export default App;
