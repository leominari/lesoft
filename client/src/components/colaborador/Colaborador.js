import React from 'react'
import './styles/colab.css'
import NovoColaborador from './CadastroForm'
import Axios from 'axios'
class Colaborador extends React.Component {
    constructor(props) {
        super(props)
        Axios.get('/api/colaborador/todos').then(response => {
            this.state = {
                colaboradores: response.data
            }
            console.log(this.state.colaboradores)
        })
    }


    render() {

        return (
            <div className="padrao">
                <NovoColaborador tipo="fisica" sub={this.cadastrar}></NovoColaborador>
                {/* <NovoColaborador tipo="juridica" sub={this.cadastrar}></NovoColaborador> */}
                <table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>

                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Colaborador