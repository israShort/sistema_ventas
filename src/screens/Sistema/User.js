import React, { useContext, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { Breadcrumb, Col, Form, Row, Button } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthProvider';
import AlertDialog from '../../components/AlertDialog';
import { Link } from 'react-router-dom';

export default function User() {
    const { user } = useContext(AuthContext);

    const [usuario, setUsuario] = useState(user.usuario);
    const [nombre, setNombre] = useState(user.nombre);
    const [apellido, setApellido] = useState(user.apellido);
    const [email, setEmail] = useState(user.email);

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const submitForm = async () => {
    }

    return (
        <section id='user-data'>
            <Breadcrumb>
                <Button variant='link' className='ps-md-0 bg-transparent border-0 rounded-0 box-shadow-none' onClick={() => submitForm()}><i className='bi bi-save-fill me-md-2'></i>Guardar</Button>
            </Breadcrumb>

            <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

            <Form className='mt-md-3 pt-md-2'>
                <Row>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                required
                                id='inputUsuario'
                                label='Usuario'
                                defaultValue={usuario}
                                type='text'
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </Stack>
                    </Col>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                required
                                id='inputNombre'
                                label='Nombre'
                                defaultValue={nombre}
                                type='text'
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Stack>
                    </Col>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                id='inputApellido'
                                label='Apellido'
                                defaultValue={apellido}
                                type='text'
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </Stack>
                    </Col>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                required
                                id='inputEmail'
                                label='Email'
                                defaultValue={email}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Stack>
                    </Col>
                </Row>
            </Form>

            <Link to={`/change-password/${user.usuario}`} className='text-decoration-none'>Cambiar contraseña</Link>
        </section>
    );
}