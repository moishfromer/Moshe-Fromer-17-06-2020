import React from 'react';
import ComposeMail from './features/mail/ComposeMail';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path='/compose'>
        <ComposeMail />
      </Route>
      <Route path='/'>
hi
      </Route>
    </Switch>
    
  );
}

export default App;
