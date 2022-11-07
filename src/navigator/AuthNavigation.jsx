import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            cardStyle: {
                backgroundColor: 'white'
            },

            headerStyle: {
                //Android
                elevation: 0,

                //IOS
                shadowColor: 'transparent'
            },
        }}
    >
        <Stack.Screen name="Login" options={{ title: 'Iniciar Sesión' }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ title: 'Registrarse' }} component={RegisterScreen} />
    </Stack.Navigator>
  )
}
