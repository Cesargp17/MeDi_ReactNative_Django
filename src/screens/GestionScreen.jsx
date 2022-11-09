import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableNativeFeedback, View } from 'react-native'
import { useCitas } from '../hooks/useCitas'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export const GestionScreen = () => {

    const { Areas, onDeleteArea, onAddArea, Roles, onDeleteRol, onAddRol } = useCitas();
    const [NuevaArea, setNuevaArea] = useState('');
    const [NuevoRol, setNuevoRol] = useState('');

    const agregarArea = () => {
        if( NuevaArea.trim().length === 0 ){
            alert('Ingresa un nombre para el área');
            return;
        }
        onAddArea(NuevaArea)
    }

    const agregarRol = () => {
        if( NuevoRol.trim().length === 0 ){
            alert('Ingresa un nombre para el rol');
            return;
        }
        onAddRol(NuevoRol)
    }

  return (
    <ScrollView>
    <View style={{
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    }}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 15, marginTop: 20 }}>AREAS</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>

        <TextInput
            style={{
                height: 40,
                margin: 0,
                borderWidth: 2,
                padding: 12,
                borderRadius: 20,
                width: 200,
                color: 'black',
                backgroundColor: 'white',
                borderColor: 'gray',
            }}
            onChangeText={setNuevaArea}
            value={NuevaArea}
            placeholder="Asunto de la cita..."
            keyboardType="text"
          />

          <Pressable
            onPress={ () => agregarArea() }
          style={{ 
             backgroundColor: '#42a5f5',
             alignContent: 'center',
             justifyContent: 'center',
             padding: 10,
             borderRadius: 10,
             marginLeft: 5
           }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>AGREGAR</Text>
          </Pressable>

        </View>
        <View style={{ 
            width: '90%',
            borderRadius: 25,
            minHeight: 220,

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
                Areas.map( area =>
                    <View key={ area._id } style={{ 
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
                        <Text style={{ color: 'white', marginLeft: 10, marginTop: 5, fontWeight: 'bold', fontSize: 17 }}>{ area.area }</Text>

                        <TouchableNativeFeedback onPress={ () => onDeleteArea(area) } background={TouchableNativeFeedback.Ripple( 'white', false, 32 )}>
                            <Text style={{
                                 backgroundColor: '#c62828',
                                 padding: 5,
                                 fontWeight: 'bold',
                                fontSize: 10,
                                marginLeft: 'auto'
                            }}><Icon name="trash-outline" size={22} color="white" /></Text>
                        </TouchableNativeFeedback>
                    </View>
                )
            }

        </View>

        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 15, marginTop: 20 }}>ROLES</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>

        <TextInput
            style={{
                height: 40,
                margin: 0,
                borderWidth: 2,
                padding: 12,
                borderRadius: 20,
                width: 200,
                color: 'black',
                backgroundColor: 'white',
                borderColor: 'gray',
            }}
            onChangeText={setNuevoRol}
            value={NuevoRol}
            placeholder="Asunto de la cita..."
            keyboardType="text"
          />

          <Pressable
            onPress={ () => agregarRol() }
          style={{ 
             backgroundColor: '#42a5f5',
             alignContent: 'center',
             justifyContent: 'center',
             padding: 10,
             borderRadius: 10,
             marginLeft: 5
           }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>AGREGAR</Text>
          </Pressable>

        </View>
        <View style={{ 
            width: '90%',
            borderRadius: 25,
            minHeight: 220,

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
                Roles.map( rol =>
                    <View key={ rol._id } style={{ 
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
                        <Text style={{ color: 'white', marginLeft: 10, marginTop: 5, fontWeight: 'bold', fontSize: 17 }}>{ rol.rol }</Text>

                        <TouchableNativeFeedback onPress={ () => onDeleteRol(rol) } background={TouchableNativeFeedback.Ripple( 'white', false, 32 )}>
                            <Text style={{
                                 backgroundColor: '#c62828',
                                 padding: 5,
                                 fontWeight: 'bold',
                                fontSize: 10,
                                marginLeft: 'auto'
                            }}><Icon name="trash-outline" size={22} color="white" /></Text>
                        </TouchableNativeFeedback>
                    </View>
                )
            }

        </View>

    </View>
    </ScrollView>
  )
}
