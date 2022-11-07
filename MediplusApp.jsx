import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { AuthNavigation } from './src/navigator/AuthNavigation';
import { AppDrawer } from './src/navigator/AppDrawer';
import { useAuth } from './src/hooks/useAuth';
import { useCitas } from './src/hooks/useCitas';
import { useToken } from './src/hooks/useToken';
import { Loading } from './src/components/Loading';

export const MediplusApp = () => {

  const { Usuario } = useAuth();
  const { onLoadUsers, onLoadEvents } = useCitas();
  const { onCheckToken } = useToken();

  useEffect(() => {
    onLoadUsers()
    onCheckToken()
  }, [])

  return (
    <NavigationContainer>
    {
      Usuario.status ===  'checking'
      ? <Loading/>
      : Usuario.status === 'auth'
        ? <AppDrawer/>
        : <AuthNavigation/>
    }
  </NavigationContainer>
  )
}
