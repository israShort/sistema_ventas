import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, OutlinedInput, TextField, IconButton, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import AlertDialog from '../../components/AlertDialog';

export default function ChangePassword() {

    const [showPassword, setVisiblePassword] = useState(false);
    const [showPasswordNueva, setVisiblePasswordNueva] = useState(false);
    const [showPasswordNuevaR, setVisiblePasswordNuevaR] = useState(false);

    const [clave, setClave] = useState('');
    const [claveNueva, setClaveNueva] = useState('');
    const [claveNuevaR, setClaveNuevaR] = useState('');

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const submitForm = async () => {

        await auth.changePassword(clave, claveNueva, claveNuevaR)
            .then(async (result) => {
                if (result.success === true) {
                    auth.logout();
                    navigate('/login', { replace: true });
                } else {
                    setOpen(true);
                    setResult({ msg: result.msg, status: result.status });
                }
            });
    }

    useEffect(() => {
        document.getElementById('root').style.height = `${window.innerHeight}px`;
    }, []);

    return (
        <section id='change-password-screen' className='h-100'>
            <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

            <div className='container h-100'>
                <div className='row h-100 justify-content-md-center'>
                    <div className='col-md-5 align-self-md-center'>
                        <div className='card rounded-3 shadow-lg'>
                            <div className='card-body px-md-5 py-md-4'>
                                <h1 className='mb-0 mb-md-3 text-center open-sans-semibold'>Cambiar contraseña</h1>
                                <Form>
                                    <FormControl variant='outlined' className='w-100 mb-md-3'>
                                        <InputLabel htmlFor="outlined-adornment-password">Clave actual</InputLabel>
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
                                            label='Clave actual'
                                        />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100 mb-md-3'>
                                        <InputLabel htmlFor="outlined-adornment-password-new">Clave nueva</InputLabel>
                                        <OutlinedInput
                                            id='outlined-adornment-password-new'
                                            type={showPasswordNueva ? 'text' : 'password'}
                                            value={claveNueva}
                                            onChange={(e) => setClaveNueva(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => { setVisiblePasswordNueva(!showPasswordNueva) }}
                                                        edge='end'
                                                    >
                                                        {showPasswordNueva ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='Clave nueva'
                                        />
                                    </FormControl>
                                    <FormControl variant='outlined' className='w-100'>
                                        <InputLabel htmlFor="outlined-adornment-password-new-repeat">Repetir clave</InputLabel>
                                        <OutlinedInput
                                            id='outlined-adornment-password-new-repeat'
                                            type={showPasswordNuevaR ? 'text' : 'password'}
                                            value={claveNuevaR}
                                            onChange={(e) => setClaveNuevaR(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => { setVisiblePasswordNuevaR(!showPasswordNuevaR) }}
                                                        edge='end'
                                                    >
                                                        {showPasswordNuevaR ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='Repetir clave'
                                        />
                                    </FormControl>
                                    <Button className='w-100 text-uppercase mt-md-4 py-md-2' variant='primary' type='button' onClick={() => { submitForm() }}>confirmar</Button>
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