import React, { Component } from "react"
import axios from "axios"
import './login.css'
import { Form, Button } from 'react-bootstrap';
import { loginTk } from '../../auth/utils/index';
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            redirect: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }


    login = (e) => {

        e.preventDefault();
        axios.post('/api/login', this.state.formData)
            .then(response => {
                if (response.data.status_code === "200") {
                    loginTk(response.data.token)
                    this.setState({ redirect: true })
                }
            }).catch(e => console.log(e))

    }



    render() {
        return (
            <div className="login">
                <Form onSubmit={this.login}>
                    <h1>Lesoft</h1>
                    <Form.Group controlId="username"  >
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" required placeholder="Entre com o usuario" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="password" >
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" name="password" required placeholder="Password" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                    { this.state.redirect && <Redirect to="/home" />}
                </Form>
            </div>
        )
    }
}

export default Login