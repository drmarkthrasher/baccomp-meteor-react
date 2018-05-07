import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './history';


import Signup from '../ui/Signup';
import DashBoard from '../ui/DashBoard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import DriversMain from '../ui/Driver/DriversMain';
import DriverDetails from '../ui/Driver/DriverDetails';
import DrinksMain from '../ui/Drink/DrinksMain';
import DrinkDetails from '../ui/Drink/DrinkDetails';
import GaugeTester from '../ui/GaugeTester';
import Profile from '../ui/Profile';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard','/driversmain','/driverdetails','/drinksmain',
    '/gaugetester','/drinkdetails','/profile'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = window.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isAuthenticated && isUnauthenticatedPage) {
      history.replace('/dashboard'); 
    } else if (!isAuthenticated && isAuthenticatedPage) {
      history.replace('/');
    } 
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" component={Login} exact={true} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/driversmain" component={DriversMain}/>
      <Route path="/driverdetails" component={DriverDetails}/>
      <Route path="/drinksmain" component={DrinksMain}/>
      <Route path="/drinkdetails" component={DrinkDetails}/>
      <Route path="/gaugetester" component={GaugeTester}/>
      <Route path="/profile" component={Profile}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);
