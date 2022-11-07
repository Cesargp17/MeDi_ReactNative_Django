import React from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { useCitas } from '../hooks/useCitas'
import Icon from 'react-native-vector-icons/Ionicons';
import { UserModal } from '../components/UserModal';

export const UsuariosPage = () => {

    const { usuarios, onDeleteUser, TodosLosUsuarios } = useCitas();

    const eliminarUsuario = ( usuario ) => {
        onDeleteUser(usuario)
    }


  return (
    <View style={{
        flex: 1,
        alignItems: 'center'
    }}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 15, marginTop: 20 }}>USUARIOS</Text>

        <View style={{ 
            width: '90%',
            borderRadius: 25,
            minHeight: 500,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,

            backgroundColor:'#fafafa'
        }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ marginTop: 10, color: 'black', fontWeight: 'bold' }}>Nombre</Text>
                <Text style={{ marginLeft: 120, marginTop: 10, color: 'black', fontWeight: 'bold' }}>Acciones</Text>
            </View>
            <View style={{ width: '100%', height: 2, backgroundColor: 'black', marginTop: 8, alignContent: 'center', justifyContent: 'center', marginBottom: 20 }}></View>

            {
                TodosLosUsuarios.map( usuario =>
                    <View key={ usuario._id } style={{ 
                        backgroundColor: '#42a5f5', 
                        marginBottom: 10, 
                        borderRadius: 15, 
                        marginLeft: 20, 
                        marginRight: 20, 
                        height: 40,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,

                        elevation: 7,
                        flexDirection: 'row',
                        }}>
                        <Text style={{ color: 'white', marginLeft: 10, marginTop: 5, fontWeight: 'bold', fontSize: 17 }}>{ usuario.name }</Text>

                        <UserModal usuario={ usuario }/>

                        <TouchableNativeFeedback onPress={ () => eliminarUsuario( usuario ) } background={TouchableNativeFeedback.Ripple( 'white', false, 32 )}>
                            <Text style={{
                                 backgroundColor: '#c62828',
                                 padding: 5,
                                 fontWeight: 'bold',
                                fontSize: 10,
                            }}><Icon name="trash-outline" size={22} color="white" /></Text>
                        </TouchableNativeFeedback>
                    </View>
                )
            }

        </View>
    </View>
  )
}
