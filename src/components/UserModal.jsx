import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TouchableNativeFeedback, TextInput, ScrollView, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/Ionicons';
import { useCitas } from "../hooks/useCitas";

export const UserModal = ({ usuario }) => {

    const { Areas, Roles, onUpdateUser } = useCitas()

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [Nombre, setNombre] = useState('');
    const [Rol, setRol] = useState('');
    const [Area, setArea] = useState('');

    useEffect(() => {
        setNombre(usuario.name);
        setRol(usuario.rol.rol);
        setArea(usuario?.area?.area);
    }, [usuario]);

    const onSelectRol = (rol) => {
        setRol(rol.rol)
    }

    const onSelectArea = (area)=> {
        setArea(area.area)
    }

    const actualizarUsuario = () => {

        if( Nombre.length === 0 ){
            alert('El nombre no puede quedar vacio...')
            return;
        }

        if( Rol !== 'Doctor' ){

            const rol = Roles.find( r => r.rol === Rol );

            const user = {
                _id: usuario._id,
                name: Nombre,
                rol: rol,
            }
            onUpdateUser(user)
            setModalVisible(false)
            return;
        }

        const rol = Roles.find( r => r.rol === Rol );
        const area = Areas.find( a => a.area === Area );

        const user = {
            _id: usuario._id,
            name: Nombre,
            rol: rol,
            area: area
        }
        onUpdateUser(user)
        setModalVisible(false)
    }
    

  return (
      <View style={styles.centeredView}>

    <Modal
            onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              >
          <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>EDITAR USUARIO</Text>
        <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Nombre</Text>
        <TextInput
            style={styles.input}
            onChangeText={setNombre}
            value={Nombre}
            placeholder="Asunto de la cita..."
            keyboardType="text"
            />

        <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Rol</Text>
        <View style={{ flex: 1 }}>
            {
                Roles.map( rol => (
                    <View key={ rol._id } style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,
                        
                        elevation: 11,
                        height: 40, 
                        backgroundColor: `${ rol.rol === Rol ? '#2196f3' : '#fafafa'}`,
                        width: 250,
                        marginBottom: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15
                    }}>
                        <Text onPress={ () => onSelectRol(rol) }  style={{ color: `${ rol.rol === Rol ? 'white' : 'black'}`, fontWeight: 'bold' }}>{ rol.rol }</Text>
                    </View>
                ))
            }
        </View>

        <View style={{ flex: 1, marginBottom: 15 }}>
            {
                Rol === 'Doctor'
                ? (
                    <>
                    <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Area</Text>
                    {
                        Areas.map( area => (
                            <View key={ area._id } style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.36,
                                shadowRadius: 6.68,
                                
                                elevation: 11,
                                height: 40, 
                                backgroundColor: `${ area.area === Area ? '#2196f3' : '#fafafa'}`,
                                width: 250,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 15
                            }}>
                                <Text onPress={ () => onSelectArea(area) } style={{ color: `${ area.area === Area ? 'white' : 'black'}`, fontWeight: 'bold' }}>{ area.area }</Text>
                            </View>
                        ))
                            }
                        </>
                )
                : null
            }

        </View>

            <Button onPress={ () => actualizarUsuario() } title='GUARDAR'/>

        <TouchableNativeFeedback onPress={ ()=>setModalVisible(false) } background={TouchableNativeFeedback.Ripple( 'black', false, 64 )}>
            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Cancelar</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
    </Modal>
      <View style={{ 
          marginBottom: 0, 
          borderRadius: 15, 
          marginLeft: 'auto', 
          height: 40,
          flexDirection: 'row',
        }}>
         <TouchableNativeFeedback onPress={ ()=> setModalVisible(true) } background={TouchableNativeFeedback.Ripple( 'black', false, 32 )}>
            <Text style={{
                marginLeft: 'auto',
                 backgroundColor: '#1e88e5',
                 padding: 5,
                 fontWeight: 'bold',
                 fontSize: 10,
                 marginRight: 5
                }}><Icon name="create-outline" size={22} color="white" /></Text>
         </TouchableNativeFeedback>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalText: {
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
      },
    
      input: {
        height: 40,
        margin: 0,
        borderWidth: 2,
        padding: 12,
        borderRadius: 20,
        width: 250,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'gray'
      },
  });