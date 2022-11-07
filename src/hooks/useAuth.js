import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuth = () => {

    const { Usuario, iniciarSesion, cerrarSesion, onCheckAuth } = useContext(AuthContext);

    const onStartLogin = async(email, password) => {
        onCheckAuth();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
            await fetch(
                'https://mediplus-backend.herokuapp.com/api/auth/', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data.msg)
                            if( data.msg === 'Password incorrecta.' || data.msg === 'El usuario no existe con ese email.' || data.msg === 'Porfavor hable con el administrador'){
                                alert('Los datos de inicio de sesión no son correctos.')
                                return cerrarSesion();
                            }
                            iniciarSesion(data)
                        })        
                });
            }

    const onStartLogout = () => {
        cerrarSesion();
    }

    const onRegisterUser = async(email, password, name) => {

        onCheckAuth();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, name: name, password: password, rol: '633db4b66592d6ae560af1da', })
        };
        await fetch(
            'https://mediplus-backend.herokuapp.com/api/auth/new', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if( data.msg === 'Un usuario ya existe con ese correo.'){
                            alert('Un usuario ya existe con ese correo.')
                            return cerrarSesion();
                        }
                        iniciarSesion(data)
                    })        
            });
    }

    return {
        Usuario, onStartLogin, onStartLogout, onCheckAuth, onRegisterUser
    }
}