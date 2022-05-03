/* eslint-disable import/no-anonymous-default-export */

const URI = 'http://localhost:8000';


export async function login(email, clave) {
    let formData = new FormData();
    formData.append('txtUsuario', email);
    formData.append('txtClave', clave);

    try {
        let config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData
        };

        let response = await fetch(`${URI}/login`, config);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.error(e);
    }
}

export async function signup(obj) {
    let formData = new FormData();
    formData.append('txtNombre', obj.nombre);
    formData.append('txtApellido', obj.apellido);
    formData.append('txtMail', obj.email);
    formData.append('txtClave', obj.clave);
    formData.append('txtClaveR', obj.claveR);

    try {
        let config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData
        };

        let response = await fetch(`${URI}/sign-up`, config);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.error(e);
    }
}

export async function getMenu() {
    try {
        let response = await fetch(`${URI}/obtener-menu-sistema`);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.error(e);
    }
}

export async function guardarCliente(obj) {
    let formData = new FormData();
    formData.append('id', obj.id);
    formData.append('nombre', obj.nombre);
    formData.append('apellido', obj.apellido);
    formData.append('email', obj.email);
    formData.append('documento', obj.documento);
    formData.append('fecha_nacimiento', obj.fNacimiento);

    try {
        let config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData
        };

        let response = await fetch(`${URI}/cliente-nuevo`, config);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.warn(e);
    }
}

export async function changePassword(obj) {
    let formData = new FormData();
    formData.append('idUsuario', obj.idUsuario);
    formData.append('claveActual', obj.clave);
    formData.append('claveNueva', obj.claveNueva);
    formData.append('claveNuevaR', obj.claveNuevaR);

    try {
        let config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData
        };

        let response = await fetch(`${URI}/cambiar-clave`, config);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.warn(e);
    }
}