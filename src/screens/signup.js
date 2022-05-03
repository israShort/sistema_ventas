import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, OutlinedInput, TextField, IconButton, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertDialog from '../components/AlertDialog';
import * as Service from '../services';

export default function SignUp() {

    const [showPassword, setVisiblePassword] = useState(false);
    const [showPasswordR, setVisiblePasswordR] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [claveR, setClaveR] = useState('');

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const submitForm = async () => {
        let body = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            clave: clave,
            claveR: claveR
        };

        let data = await Service.signup(body);

        setOpen(true);
        setResult({ msg: data.msg, status: data.status });
    }

    useEffect(() => {
        document.getElementById('root').style.height = `${window.innerHeight}px`;
    }, []);

    return (
        <section id='login-screen' className='h-100'>

            <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

            <div className='container h-100'>
                <div className='row h-100 justify-content-md-center'>
                    <div className='col-md-5 align-self-md-center'>
                        <div className='card rounded-3 shadow-lg'>
                            <div className='card-body px-md-5 py-md-4'>
                                <h1 className='mb-0 mb-md-3 text-center open-sans-semibold'>Registrarse</h1>
                                <Form>
                                    <FormControl variant='outlined' className='w-100 mb-md-4'>
                                        <TextField id='outlined-nombre' label='Nombre' variant='outlined' required onChange={(e) => setNombre(e.target.value)} type='text' />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100 mb-md-4'>
                                        <TextField id='outlined-apellido' label='Apellido' variant='outlined' onChange={(e) => setApellido(e.target.value)} type='text' />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100 mb-md-4'>
                                        <TextField id='outlined-email' label='Email' variant='outlined' required onChange={(e) => setEmail(e.target.value)} type='email' />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100 mb-md-4'>
                                        <InputLabel htmlFor="outlined-adornment-password">Clave</InputLabel>
                                        <OutlinedInput
                                            required
                                            id='outlined-adornment-password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={clave}
                                            onChange={(e) => setClave(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => { setVisiblePassword(!showPassword) }}
                                                        edge='end'
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='Clave'
                                        />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100'>
                                        <InputLabel htmlFor="outlined-adornment-password-r">Repetir clave</InputLabel>
                                        <OutlinedInput
                                            required
                                            id='outlined-adornment-password-r'
                                            type={showPasswordR ? 'text' : 'password'}
                                            value={claveR}
                                            onChange={(e) => setClaveR(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => { setVisiblePasswordR(!showPasswordR) }}
                                                        edge='end'
                                                    >
                                                        {showPasswordR ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='Repetir clave'
                                        />
                                    </FormControl>
                                    <Button className='w-100 text-uppercase mt-md-4 py-md-2' variant='primary' type='button' onClick={() => { submitForm() }}>Registrarse</Button>
                                    <div className='d-flex justify-content-md-center sign-up-petition mt-md-2 pt-md-1'>
                                        <p className='mb-0 d-flex align-self-center'>¿Tenés una cuenta?</p>
                                        <Link to={'/login'} className='d-flex align-self-center'>&nbsp;Iniciar sesión</Link>
                                        <p className='mb-0 d-flex align-self-center'>.</p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}