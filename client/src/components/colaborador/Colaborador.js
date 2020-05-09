import React, { useState } from 'react'
import './styles/colab.css'
import { Table, Button, Modal, Form } from 'react-bootstrap'
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
        function ListItem(props) {
            // Correto! Não há necessidade de definir a chave aqui:
            return <li>{props.value}</li>;
        }

        function NumberList(props) {
            const numbers = props.numbers;
            const listItems = numbers.map((number) =>
                // Correto! A chave deve ser definida dentro do array.
                <ListItem key={number.toString()} value={number} />

            );
            return (
                <ul>
                    {listItems}
                </ul>
            );
        }

        function Example() {
            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);

            return (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Novo Colaborador
                </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cadastro de Colaborador</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                    </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                    </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }


        const numbers = [1, 2, 3, 4]
        return (
            <div className="padrao">
                <Example></Example>
                {/* <NumberList numbers={numbers} /> */}
                <Table striped bordered hover>
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
                </Table>
            </div>
        )
    }
}

export default Colaborador