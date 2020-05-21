import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

// Padrão
import Home from './components/home/Home'
import Login from './components/login/Login'

// Home
import Colaborador from './components/colaborador/Colaborador'
import Produto from './components/produto/Produto'
import Dashboard from './components/home/Dashboard'
import Pedido from './components/pedido/Pedido'

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
                <Colaborador />
            </Route>
            <Route path="/home/produto">
                <Produto />
            </Route>
            <Route path="/home/pedido">
                <Pedido />
            </Route>
            <Route path="/home">
                <Dashboard />
            </Route>
        </Switch>
    )
}


export default Routes;