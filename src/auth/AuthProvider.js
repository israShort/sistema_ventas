import React, { createContext, useEffect, useReducer, useState } from 'react';
import * as Service from '../services';

export const AuthContext = createContext({});

const statusIsLoggedIn = { status: false };

function reducerIsLoggedIn(state, action) {
    return { status: action.status };
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, dispatch] = useReducer(reducerIsLoggedIn, statusIsLoggedIn);

    const [idUsuario, setIdUsuario] = useState(0);
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    const login = async (email, clave) => {
        let data = await Service.login(email, clave);

        if (data.code === 200) {
            dispatch({ status: true });

            setIdUsuario(data.usuario_id);
            setUsuario(data.usuario);
            setNombre(data.user.nombre);
            setApellido(data.user.apellido);
            setEmail(data.user.mail);

            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            localStorage.setItem('idUsuario', JSON.stringify(data.usuario_id));
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            localStorage.setItem('nombre', JSON.stringify(data.user.nombre));
            localStorage.setItem('apellido', JSON.stringify(data.user.apellido));
            localStorage.setItem('email', JSON.stringify(data.user.mail));

            return {
                msg: data.msg,
                status: data.status
            }
        } else {
            return {
                usuarioId: null,
                msg: data.msg,
                status: data.status
            }
        }
    };

    const logout = () => {
        dispatch({ status: false });
        setIdUsuario(0);
        setUsuario('');
        setNombre('');
        setApellido('');
        setEmail('');

        localStorage.clear();
    };

    const changePassword = async (clave, claveNueva, claveNuevaR) => {
        try {
            let data = await Service.changePassword({ idUsuario, clave, claveNueva, claveNuevaR });
            if (data.code === 200) {
                return {
                    success: true
                };
            } else {
                return {
                    success: false,
                    msg: data.msg,
                    status: data.status,
                    extraData: data.extraData
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const obtenerClientePorId = async (id) => {
        try {
            let data = await Service.obtenerClientePorId(id);
            if (data.code === 200) {
                return {
                    data: data.body,
                    msg: data.msg,
                    status: data.status
                }
            } else {
                return {
                    data: null,
                    msg: data.msg,
                    status: data.status
                }
            }
        } catch (e) {
            return {
                data: null,
                msg: JSON.stringify(e),
                status: 'danger'
            }
        }
    }

    const getGrillaClientes = async () => {
        try {
            let data = await Service.cargarGrillaClientes();
            if (data.code === 200) {
                return {
                    data: data.body,
                    msg: data.msg,
                    status: data.status
                }
            } else {
                return {
                    data: [],
                    msg: data.msg,
                    status: data.status
                }
            }
        } catch (e) {
            return {
                data: [],
                msg: JSON.stringify(e),
                status: 'danger'
            }
        }
    }

    useEffect(() => {
        dispatch({ status: JSON.parse(localStorage.getItem('isLoggedIn')) });
        setIdUsuario(JSON.parse(localStorage.getItem('idUsuario')));
        setUsuario(JSON.parse(localStorage.getItem('usuario')));
        setNombre(JSON.parse(localStorage.getItem('nombre')));
        setApellido(JSON.parse(localStorage.getItem('apellido')));
        setEmail(JSON.parse(localStorage.getItem('email')));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth: {
                    login,
                    logout,
                    changePassword
                },
                dataAuth: {
                    isLoggedIn
                },
                user: {
                    idUsuario,
                    usuario,
                    nombre,
                    apellido,
                    email
                },
                globals: {
                    obtenerClientePorId,
                    getGrillaClientes
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}