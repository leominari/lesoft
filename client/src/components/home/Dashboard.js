import React from 'react'
import './styles/dashboard.css'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        return (
            <div className="center-600">
                <h1>Bem vindo ao Lesoft</h1>
                <p>Ainda estamos em desenvolvimento.</p>
            </div>
        )
    }
}

export default Dashboard