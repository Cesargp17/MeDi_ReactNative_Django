import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { CalendarioScreen } from '../screens/CalendarioScreen';
import { CitasScreen } from '../screens/CitasScreen';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { NewEvent } from '../components/NewEvent';
import { EditEvent } from '../components/EditEvent';
import { HomeScreen } from '../screens/HomeScreen';
import { UsuariosPage } from '../screens/UsuariosPage';

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {

  return (
    <Drawer.Navigator
    drawerContent={ () => <MenuInterno/> }
    >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Calendario" component={CalendarioScreen} />
        <Drawer.Screen name="Crear Cita" component={NewEvent} />
        <Drawer.Screen name="Editar Cita" component={EditEvent} />
        <Drawer.Screen name="Citas" component={CitasScreen} />
        <Drawer.Screen name="Usuarios" component={UsuariosPage} />
    </Drawer.Navigator>
  )
}

const MenuInterno = () => {

    const { onStartLogout, Usuario } = useAuth();
    const navigation = useNavigation();

    return (
       <DrawerContentScrollView>
        <View style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
        backgroundColor: '#fafafa',
        padding: 10, 
        borderRadius: 15, 
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
        }}>
            <View style={ styles.avatarContainer }>
                <Image source={{
                    uri: 'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png',
                }} 
                    style={ styles.avatar }
                />
            </View>

            <View style={{ 
                flexDirection: 
                'row', 
                justifyContent: 
                'center', 
                backgroundColor: 
                '#bbdefb', 
                padding: 3, 
                borderRadius: 8, 
                marginRight: 8, 
                marginLeft: 8, 
                marginTop: 8,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                }}>
                <Text style={{ color: 'black', fontWeight: 'bold', marginRight: 7, fontSize: 16 }}>{ Usuario.name }</Text>
                {
                    Usuario.rol === 'Usuario'
                    ? null
                    : <Text style={{ color: 'black', marginRight: 7, fontSize: 16 }}>- { Usuario.rol }</Text>
                }
            </View>
            </View>

            <View style={ styles.menuContainer }>
                <TouchableOpacity onPress={ () => navigation.navigate( 'Inicio' ) } style={ styles.menuBoton }>
                    <Text style={styles.menuContent}><Icon name="home-outline" size={22} color="black" />&nbsp;&nbsp;Inicio</Text>
                </TouchableOpacity>
            {
                Usuario.rol === 'Administrador' || Usuario.rol === 'Secretaria'
                ? (
                <>
                    <TouchableOpacity onPress={ () => navigation.navigate( 'Calendario' ) } style={ styles.menuBoton }>
                        <Text style={styles.menuContent}><Icon name="calendar-outline" size={22} color="black" />&nbsp;&nbsp;Calendario</Text>
                    </TouchableOpacity>
                </>
                )
                : null
            }
            {
                Usuario.rol === 'Administrador'
                ? (
                    <TouchableOpacity onPress={ () => navigation.navigate( 'Usuarios' ) } style={ styles.menuBoton }>
                        <Text style={styles.menuContent}><Icon name="people-outline" size={22} color="black" />&nbsp;&nbsp;Usuarios</Text>
                    </TouchableOpacity>
                )
                : null
            }

                <TouchableOpacity onPress={ () => navigation.navigate( 'Citas' ) } style={ styles.menuBoton }>
                    <Text style={styles.menuContent}><Icon name="book-outline" size={22} color="black" />&nbsp;&nbsp;Historial</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => onStartLogout() } style={ styles.menuBotonLogout }>
                    <Text style={styles.textLogout}><Icon name="log-out-outline" size={22} color="white" />&nbsp;&nbsp;Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
       </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 20
    },

    title: {
        fontSize: 30,
        marginBottom: 10,
        color: 'black'
    },

    botonGrande: {
      width: 100,
      height: 100,
      backgroundColor: 'red',
      borderRadius: 20,
      alignItems: 'center', 
      justifyContent: 'center',
      marginRight: 10
    },

    botonGrandeTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    avatarContainer: {
        alignItems: 'center',
        marginTop: 13
    },  

    avatar: {
        width: 100,
        height: 100
    },

    menuContainer: {
        marginVertical: 30,
        marginHorizontal: 30,
    },

    menuContent: {
        fontSize: 17,
        color: 'black',
        marginLeft: 5,
        fontWeight: 'bold'
    },

    menuBoton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        backgroundColor: '#fafafa',
        padding: 10, 
        borderRadius: 15, 
        marginBottom: 15
    },

    menuBotonLogout: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        backgroundColor: '#f44336',
        padding: 10, 
        borderRadius: 15, 
        marginTop: 220
    },

    textLogout: {
        fontSize: 17,
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold'
    },


});