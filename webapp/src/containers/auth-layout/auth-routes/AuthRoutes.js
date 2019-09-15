import React from 'react';
import {Switch, Route } from 'react-router-dom';
import authRoutesConfig from './auth-routes-config';

const AuthRoutes = () => {
  return (<Switch>
			{authRoutesConfig.map((route, i) => (
				<Route
					key={i}
				    path={route.path}
      				render={props => (<route.component {...props} routes={route.routes}/>)}
      				exact
				/>))}
		    </Switch>);
};

export default AuthRoutes;