import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../hooks/useAuth';
import { useCitas } from '../hooks/useCitas'

export const HomeScreen = () => {

    const { onLoadEvents, onLoadAreas, onLoadUserCitas, CitaUsuario, onLoadRoles } = useCitas();
    const { Usuario } = useAuth()

    const navigation = useNavigation();

    useEffect(() => {
        onLoadEvents()
        onLoadAreas()
        onLoadUserCitas();
        onLoadRoles()
      }, [])

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
        <View style={{
            backgroundColor: '#2196f3',
            maxWidth: '100%',
            height: 300
        }}>
            <View style={{ 
                alignItems: 
                'center', 
                marginTop: 13, 
                backgroundColor: '#fafafafa', 
                marginRight: 40, 
                marginLeft: 40, 
                marginTop: 20, 
                marginBottom: 20, 
                borderRadius: 20,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,
                
                elevation: 19,
                }}>
                <Image source={{
                    uri: 'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png',
                }} 
                    style={{ width: 100, height: 100, borderColor: '#2196f3', border: '2px', marginTop: 15, marginBottom: 15 }}
                />
            </View>
                <Text style={{ 
                    textAlign: 'center', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    fontSize: 25, 
                    backgroundColor: '#1565c0', 
                    color: 'white', 
                    borderRadius: 20, 
                    marginLeft: 50, 
                    marginRight: 50, 
                    marginTop: 10, 
                    marginBottom: 10,

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.41,
                    shadowRadius: 9.11,

                    elevation: 14,
                    padding: 3
                    }}>{ Usuario.name }</Text>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>{ Usuario.rol }</Text>
        </View>

        <View style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            
            elevation: 14,
            backgroundColor: '#fafafa',

            height: 100,
            marginTop: 30,
            borderRadius: 25,
            marginRight: 20,
            marginLeft: 20
        }}>
            <Text style={{
                color: 'black',
                fontSize: 20, marginLeft: 20, marginTop: 10,
                fontWeight: 'bold'
            }}>Tus citas: </Text>
            {
                CitaUsuario === 'Vacio'
                ? <Text style={{ textAlign: 'center', marginTop: 10 }}>No tienes citas registradas...</Text>
                : (
                    <>
                <Text style={{ textAlign: 'center', justifyContent: 'center', color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>{ CitaUsuario.length }</Text>
                <Button onPress={ () => navigation.navigate('Citas') } title='VER MIS CITAS'/>
                    </>
                )
            }
        </View>
            <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                
                elevation: 14,
                backgroundColor: '#fafafa',

                height: 100,
                marginTop: 50,
                borderRadius: 25,
                marginRight: 20,
                marginLeft: 20
            }}>
            <Text style={{
                color: 'black',
                fontSize: 15, marginTop: 10,
                fontWeight: 'bold', textAlign: 'center'
                }}>¿Te preocupa algún sintoma?</Text>
                <Text style={{ textAlign: 'center', justifyContent: 'center', color: 'black', fontSize: 15, marginBottom: 10, marginTop: 8 }}>¡Solicita una cita medica ya!</Text>
                <Button title='SOLICITAR CITA'/>
                </View>
        </View>
    </ScrollView>
  )
}
