import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {

  React.useEffect(() => {
    if (!props.loggedIn) {
      props.openAuthFunction(true);
    }
  }, [])

  return (
    <Route>
      {props.loggedIn ? props.children :
        <Redirect to='/'/>
      }
    </Route>
  )
}

export default ProtectedRoute;
