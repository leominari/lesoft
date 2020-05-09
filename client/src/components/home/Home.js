import React from 'react'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { logoutTk } from '../../auth/utils/index'
import { Redirect } from 'react-router-dom'
import PrivateRoute from '../../auth/PrivateRoute'

import Dashboard from './Dashboard'
import Colaborador from '../colaborador/Colaborador'
import Pedidos from '../pedidos/Pedidos'


class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    logout = (e) => {
        e.preventDefault();
        logoutTk()
        this.props.history.push('/');
        // axios.post('/api/login', this.state.formData)
        //     .then(response => {
        //         if (response.data.status_code === "200") {
        //             this.setState({ redirect: true })
        //         }
        //     }).catch(e => console.log(e))
    }


    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/home" className="navbar-brand">Lesoft</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/home"className="nav-link"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/colaboradores" className="nav-link">Colaboradores</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pedidos" className="nav-link">Pedidos</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                <Button variant="primary" type="submit" onClick={this.logout}>Sair</Button>
                            </span>
                        </div>
                    </nav>
                    {this.state.redirect && <Redirect to="/" />}
                </div>
                <div>
                    <PrivateRoute path="/home" component={Dashboard} />
                    <PrivateRoute path="/colaboradores" component={Colaborador} />
                    <PrivateRoute path="/pedidos" component={Pedidos} />
                </div>
            </Router>

        )
    }
}

export default Home