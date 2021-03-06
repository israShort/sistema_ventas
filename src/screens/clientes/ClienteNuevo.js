import { Stack, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Col, Form, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import AlertDialog from '../../components/AlertDialog';
import * as Service from '../../services';

export default function ClienteNuevo() {

    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [documento, setDocumento] = useState('');
    const [fNacimiento, setFNacimiento] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const navigate = useNavigate();

    const { idCliente } = useParams();

    const { globals } = useContext(AuthContext);

    useEffect(() => {
        if (idCliente !== undefined) {
            (async () => {
                await globals.obtenerClientePorId(idCliente)
                    .then((result) => {
                        if (result.data !== null) {
                            let { data } = result;
                            setNombre(data.nombre);
                            setApellido(data.apellido);
                            setEmail(data.email);
                            setDocumento(data.documento);
                            setFNacimiento(data.fechaNacimiento);
                        } else {
                            setResult({ msg: result.msg, status: result.status });
                        }
                        setId(idCliente);
                    });
            })();
        }
    }, [idCliente]);

    const handleChangeFNacimiento = (e) => {
        setFNacimiento(`${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`);
    }

    const submitForm = async () => {
        await Service.guardarCliente({ id, nombre, apellido, email, documento, fNacimiento })
            .then((data) => {
                setOpen(true);
                setResult({ msg: data.msg, status: data.status });
            });
    }

    return (
        <section id='cliente-nuevo'>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                <Breadcrumb.Item href='/clientes/listar'>Listado de clientes</Breadcrumb.Item>
                <Breadcrumb.Item active>Nuevo</Breadcrumb.Item>
            </Breadcrumb>

            <Breadcrumb>
                <Button variant='link' className='bg-transparent border-0 rounded-0 box-shadow-none ps-md-0' onClick={() => { navigate('/clientes/nuevo', { replace: true }) }}><i className='bi bi-plus-circle-fill me-md-2'></i>Nuevo</Button>
                <Button variant='link' className='mx-md-3 bg-transparent border-0 rounded-0 box-shadow-none' onClick={() => submitForm()}><i className='bi bi-save-fill me-md-2'></i>Guardar</Button>
                <Button variant='link' className='bg-transparent border-0 rounded-0 box-shadow-none'><i className='bi bi-trash-fill me-md-2'></i>Eliminar</Button>
            </Breadcrumb>

            <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

            <Form className='mt-md-3 pt-md-2'>
                <Row>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                required
                                id='inputNombre'
                                label='Nombre'
                                value={nombre}
                                focused={id > 0 && nombre !== '' ? true : false}
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
                                value={apellido}
                                focused={id > 0 && apellido !== '' ? true : false}
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
                                value={email}
                                focused={id > 0 && email !== '' ? true : false}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Stack>
                    </Col>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <TextField
                                required
                                id='inputDocumento'
                                label='Documento'
                                value={documento}
                                focused={id > 0 && documento !== '' ? true : false}
                                type='text'
                                onChange={(e) => setDocumento(e.target.value)}
                            />
                        </Stack>
                    </Col>
                    <Col md={6} className='mb-md-3 pb-md-2'>
                        <Stack>
                            <DesktopDatePicker
                                label="Fecha de nacimiento"
                                inputFormat="dd/MM/yyyy"
                                value={fNacimiento}
                                focused={id > 0 && fNacimiento !== '' ? true : false}
                                onChange={handleChangeFNacimiento}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </section>
    );
}