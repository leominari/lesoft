import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import Home from './components/home/Home'
import Login from './components/login/Login'

const Routes = () => {
    return (
        <BrowserRouter>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        </BrowserRouter>
    )
}

export default Routes;