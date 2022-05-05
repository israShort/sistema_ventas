import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => props.handleClose(!props.open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {(() => {
                        switch (props.status) {
                            case 'danger':
                                return 'Error'
                            case 'success':
                                return 'Éxito'
                            default:
                                return 'Info'
                        }
                    })()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{props.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.handleClose(!props.open)} autoFocus>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
