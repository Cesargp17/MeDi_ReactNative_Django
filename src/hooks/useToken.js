import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "./useAuth";

export const useToken = () => {
    const { onCheckAuth, onStartLogin, onStartLogout } = useAuth();
    const { iniciarSesion } = useContext(AuthContext)

    const onCheckToken = async() => {
        const token = await AsyncStorage.getItem('token');
        if(!token) return onStartLogout();

        const requestOptions = {
            headers: { 'Content-Type': 'application/json', 'x-token': token },
        };

        try {
            fetch('https://mediplus-backend.herokuapp.com/api/auth/renew', requestOptions)
            .then((response) => response.json())
            .then((json) => {
                if(json.msg === 'Token no válido') return onStartLogout();
                iniciarSesion(json)
            })
            .catch((error) => {
              onStartLogout();
            });
        } catch (error) {
            
        }
    }


    return {
        onCheckToken
    }
}