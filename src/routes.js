import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/container/Home';
import Signup from './components/container/Signup';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path='/signup' component={Signup}></Route>
  </Route>
);

export default routes;
