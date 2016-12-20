import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/container/Home';
import Signup from './components/container/Signup';
import Profile from './components/container/Profile';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path='/signup' component={Signup}></Route>
    <Route path='/profile/:userid' component={Profile}></Route>
  </Route>
);

export default routes;
