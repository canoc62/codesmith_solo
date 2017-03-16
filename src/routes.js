import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/container/Home';
import Signup from './components/container/Signup';
import Profile from './components/container/Profile';
import CreateGame from './components/container/CreateGame';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path='/signup' component={Signup}></Route>
    <Route path='/profile' component={Profile}></Route>
    <Route path='/profile/:username' component={Profile}></Route>
    <Route path='/create-game' component={CreateGame}></Route>
  </Route>
);

export default routes;
