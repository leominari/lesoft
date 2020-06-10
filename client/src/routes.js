import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

// Padrão
import Home from './components/home/Home'
import Login from './components/login/Login'

// Home
import Colaborator from './components/colaborator/Colaborator'
import Product from './components/product/Product'
import Dashboard from './components/home/Dashboard'
import Order from './components/order/Order'
import Account from './components/account/Account'
const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/home" component={Home} />
        </BrowserRouter>
    )
}

export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path="/home/colab">
                <Colaborator />
            </Route>
            <Route path="/home/produto">
                <Product />
            </Route>
            <Route path="/home/pedido">
                <Order />
            </Route>
            <Route path="/home/conta">
                <Account />
            </Route>
            <Route path="/home">
                <Dashboard />
            </Route>
        </Switch>
    )
}


export default Routes;