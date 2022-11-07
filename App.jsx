import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { AuthNavigation } from './src/navigator/AuthNavigation';
import { AppNavigation } from './src/navigator/AppNavigation';
import { CitasProvider } from './src/context/CitasProvider';
import { useCitas } from './src/hooks/useCitas';
import { MediplusApp } from './MediplusApp';
import { AuthProvider } from './src/context/AuthProvider';

export const App = () => {

  return (
      <AppState>
          <MediplusApp/>
      </AppState>
  )
}

const AppState = ({ children }) => {
  return (
    <AuthProvider>
      <CitasProvider>
        { children }
      </CitasProvider>
    </AuthProvider>
  )
}
