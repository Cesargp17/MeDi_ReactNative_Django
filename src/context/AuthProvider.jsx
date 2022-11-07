import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import AsyncStorage from '@react-native-async-storage/async-storage';

const init = () => {
    return {
        status: 'checking',
        id: '',
        username: '',
        access:'',
    };
}

export const AuthProvider = ({ children }) => {

    const [Usuario, dispatch] = useReducer(authReducer, {}, init);

    const onCheckAuth = () => {
        const user = {
            status: 'checking',
        }

        const action = {
            type: 'Check',
            payload: user
        }
        dispatch(action);
    }

    const iniciarSesion = async(informacion) => {

        await AsyncStorage.setItem('token', informacion.token)

        const user = {
            status: 'auth',
            id: informacion.uid,
            name: informacion.name,
            rol: informacion.rol,
            token: informacion.token
        }

        const action = {
            type: 'Login',
            payload: user
        }
        dispatch(action);
    };

    const cerrarSesion = async() =>  {
        await AsyncStorage.removeItem('token')
        const user = {
            status: 'no-auth',
            id: '',
            username: '',
            access:'',
        }
        const action = {
            type:'Logout',
            payload: user
        }
        dispatch(action);
    }

  return (
    <AuthContext.Provider value={{ iniciarSesion, Usuario: Usuario, cerrarSesion, onCheckAuth }} >
        { children }
    </AuthContext.Provider>
  )
}
