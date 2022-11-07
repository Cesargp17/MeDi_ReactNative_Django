import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import { CitasContext } from '../context/CitasContext';

export const BuscarPaciente = ({ usuarios }) => {

    const { setUsuario: setPaciente, TodosLosUsuarios } = useContext( CitasContext );

    const [Usuario, setUsuario] = useState('');
    const [Busqueda, setBusqueda] = useState([]);

    const onSearchUser = () => {
        if( Usuario.length !== 0 ){
            const resultado = usuarios.filter( usuario => usuario.name.toLowerCase().includes(Usuario.toLowerCase())) ;
            setBusqueda(resultado)
        } else {
            setBusqueda(usuarios || [])
        }
    };

    useEffect(() => {
      onSearchUser()
    }, [Usuario, usuarios]);
    

  return (
    <View style={ styles.container }>
        <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Ingresa nombre o ID del paciente</Text>
        <TextInput
            style={styles.input}
            onChangeText={setUsuario}
            value={Usuario}
            placeholder="Asunto de la cita..."
            keyboardType="text"
          />
          {
            usuarios.length === 0 || usuarios === 'Vacio'
            ? (
              <View style={[styles.containerr, styles.horizontal]}>
                <ActivityIndicator style={{  }} size='large' />
              </View>  
            ) 
            : Busqueda.length !== 0
            ? TodosLosUsuarios.filter( user => user.rol.rol !== 'Doctor' ).map( usuario => (
                <View key={ usuario._id } style={ styles.containerBusqueda }>
                    <Pressable onPress={ () => setPaciente( usuario ) } >
                        <Text  style={ styles.textBusqueda }>{ usuario.name }</Text>
                    </Pressable>
                </View>
            ))
            : <Text>No hay usuarios para mostrar</Text>
          }
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 0,
        borderWidth: 2,
        padding: 12,
        borderRadius: 20,
        width: 250,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'gray',
        marginBottom: 8
      },
      container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        minHeight: 200,
        backgroundColor: 'white', 
        minWidth: 300,
        alignItems: 'center',
        borderRadius: 10,
        padding: 3
      },
      containerBusqueda: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        backgroundColor: '#fafafa', 
        elevation: 4,
        minWidth: 200,
        marginTop: 5,
        borderRadius: 4
      },
      textBusqueda:{
        color: 'black',
        textAlign: 'center'
      },
      lottie: {
        width: 100,
        height: 100,
      },
      containerr: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
})
