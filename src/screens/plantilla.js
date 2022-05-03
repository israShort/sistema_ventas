import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { HomeRounded, Login } from '@mui/icons-material';

import * as Service from '../services/index';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

function Plantilla() {

    const { auth, dataAuth, user } = useContext(AuthContext);

    const [aMenu, setMenu] = useState([]);
    const [aSubMenu, setSubMenu] = useState([]);

    useEffect(() => {
        (async () => {
            let data = await Service.getMenu();
            if (data.code === 200) {
                setMenu(data.menu);
                setSubMenu(data.submenu);
            } else {
                setMenu([]);
                setSubMenu([]);
            }
        })();
    }, []);

    return (
        <>
            <div id='col-menu' className='position-fixed top-0 start-0 py-md-3 my-md-3 px-md-3 ms-md-3 w-100'>
                <Link to='/' className='text-decoration-none d-flex mb-md-3 text-uppercase open-sans-semibold align-self-center'><HomeRounded className='me-md-1 d-flex align-self-center' /> Home</Link>
                <div className='accordion' id='accordion-menu'>
                    {aMenu.map(function (e, i) {
                        return (
                            <div className='accordion-item' key={`${e.id_menu}`}>
                                <h2 className='accordion-header' id={`heading${i}`}>
                                    <button className='accordion-button collapsed' type='button' data-bs-toggle="collapse" data-bs-target={`#collapse${e.id_menu}`} aria-expanded="false" aria-controls={`collapse${e.id_menu}`}><i className={`${e.icono} me-md-2`}></i>{e.descr}</button>
                                </h2>
                                <div id={`collapse${e.id_menu}`} className='accordion-collapse collapse' aria-labelledby={`heading${i}`} data-bs-parent='#accordion-menu'>
                                    <div className='accordion-body'>
                                        {aSubMenu.map(function (e1, i1) {
                                            if (e1.fk_idpadre === e.id_menu) {
                                                return (
                                                    <Link to={e1.ruta} className='d-flex w-100 link-menu' key={`${e.id_menu}${e1.id_menu}`}>{e1.descr}</Link>
                                                );
                                            }
                                            return <></>
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {dataAuth.isLoggedIn.status === true ?
                <div className='container-fluid'>
                    <div className='row mt-md-3'>
                        <div className='col-md'>
                            <Nav className="justify-content-end">
                                <Nav.Item>
                                    <button className='bg-transparent btn border-0 rounded-0 box-shadow-none d-flex px-md-1' onClick={() => { auth.logout(); }}><Login className='me-md-1' />Cerrar sesión</button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to={`/account/${user.usuario}`}>
                                        <button className='bg-transparent btn border-0 rounded-0 box-shadow-none d-flex px-md-1 ms-md-2'><i className="bi bi-person-fill me-md-1"></i> {user.usuario}</button>
                                    </Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </div>
                :
                <div className='container-fluid'>
                    <div className='row mt-md-3'>
                        <div className='col-md'>
                            <Nav className="justify-content-end">
                                <Nav.Item>
                                    <button className='bg-transparent btn border-0 rounded-0 box-shadow-none d-flex px-md-1' onClick={() => window.location.href = '/login'}><Login className='me-md-1' />Iniciar sesión</button>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </div>
            }

            <div className='body-root'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Plantilla;
