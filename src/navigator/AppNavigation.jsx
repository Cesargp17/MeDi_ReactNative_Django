import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { CalendarioScreen } from '../screens/CalendarioScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const AppNavigation = () => {
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
    <Stack.Screen name="Inicio" options={{ title: 'Inicio' }} component={HomeScreen} />
    <Stack.Screen name="Calendario" options={{ title: 'Calendario' }} component={CalendarioScreen} />
</Stack.Navigator>
  )
}
