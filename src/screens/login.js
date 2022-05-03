import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, OutlinedInput, TextField, IconButton, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import AlertDialog from '../components/AlertDialog';

export default function Login() {

    const [showPassword, setVisiblePassword] = useState(false);

    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const { auth, dataAuth } = useContext(AuthContext);

    const submitForm = async () => {
        await auth.login(email, clave)
            .then((value) => {
                if (value.usuarioId === null) {
                    setResult({ msg: value.msg, status: value.status });
                }
            });
    }

    useEffect(() => {
        document.getElementById('root').style.height = `${window.innerHeight}px`;
    }, []);

    if (dataAuth.isLoggedIn.status === true) {
        return <Navigate to='/' replace={true} />
    } else {
        return (
            <section id='login-screen' className='h-100'>

                <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

                <div className='container h-100'>
                    <div className='row h-100 justify-content-md-center'>
                        <div className='col-md-5 align-self-md-center'>
                            <div className='card rounded-3 shadow-lg'>
                                <div className='card-body px-md-5 py-md-4'>
                                    <h1 className='mb-0 mb-md-3 text-center open-sans-semibold'>Iniciar sesión</h1>
                                    <Form>
                                        <FormControl variant='outlined' className='w-100 mb-md-4'>
                                            <TextField id='outlined-email' label='Email' variant='outlined' onChange={(e) => setEmail(e.target.value)} type='email' />
                                        </FormControl>
                                        <FormControl variant='outlined' className='w-100'>
                                            <InputLabel htmlFor="outlined-adornment-password">Clave</InputLabel>
                                            <OutlinedInput
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
                                        <Link to={'/forgot-password'} className='d-flex justify-content-md-end mt-md-2'>¿Olvidaste tu contraseña?</Link>
                                        <Button className='w-100 text-uppercase mt-md-4 py-md-2' variant='primary' type='button' onClick={() => { submitForm() }}>Ingresar</Button>
                                        <div className='d-flex justify-content-md-center sign-up-petition mt-md-2 pt-md-1'>
                                            <p className='mb-0 d-flex align-self-center'>¿No tenés una cuenta?</p>
                                            <Link to={'/sign-up'} className='d-flex align-self-center'>&nbsp;Registrate</Link>
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
}