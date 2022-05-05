import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../auth/AuthProvider';
import { Breadcrumb, Button } from 'react-bootstrap';
import AlertDialog from '../../components/AlertDialog';
import { useNavigate } from 'react-router-dom';

export default function ListadoClientes() {

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Nombre y Apellido' },
        { field: 'doc', headerName: 'Documento' },
        { field: 'mail', headerName: 'Email' }
    ]

    const { globals } = useContext(AuthContext);

    const [rows, setRows] = useState([]);
    const [grillaLoaded, setGrillaLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ msg: '', status: '' });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await globals.getGrillaClientes()
                .then((value) => {
                    if (value.data.length > 0) {
                        setRows(value.data);
                        setGrillaLoaded(true);
                    } else {
                        setResult({ msg: value.msg, status: value.status });
                    }
                });
        })();
    }, [globals]);

    return (
        <section id="section-grilla-clientes">
            <Breadcrumb>
                <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Listado de clientes</Breadcrumb.Item>
            </Breadcrumb>

            <Breadcrumb>
                <Button variant='link' className='bg-transparent border-0 rounded-0 box-shadow-none ps-md-0' onClick={() => { navigate('/clientes/nuevo', { replace: true }) }}><i className='bi bi-plus-circle-fill me-md-2'></i>Nuevo</Button>
            </Breadcrumb>

            <AlertDialog open={open} handleClose={setOpen} msg={result.msg} status={result.status} />

            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    autoHeight={true}
                    loading={!grillaLoaded}
                    disableExtendRowFullWidth={false}
                    onCellClick={(e) => {
                        if (e.field === 'id')
                            navigate(`/clientes/nuevo/${e.id}`, { replace: true });
                    }}
                    disableSelectionOnClick={true}
                />
            </div>
        </section>
    );
}