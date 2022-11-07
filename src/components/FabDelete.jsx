import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';
import { useCitas } from '../hooks/useCitas';
import Icon from 'react-native-vector-icons/Ionicons';

export const FabDelete = () => {

  const { CitaActiva, onDeleteCita, onSelectActiveCita } = useCitas();

  const borrarCita = () =>{
    onDeleteCita( CitaActiva );
    onSelectActiveCita('Vacio');
  }

  return (
    <View style={ styles.fabLocationBR }>
      {
        CitaActiva === 'Vacio'
        ? null
        : (
          <TouchableNativeFeedback
          onPress={ borrarCita }
          background={TouchableNativeFeedback.Ripple( 'white', false, 22 )}
              >
              <View style={ styles.fab }> 
                  <Text style={ styles.text }><Icon name="close-outline" size={30} color="white" /></Text>
              </View>
          </TouchableNativeFeedback>
        )
      }

</View>
  )
}

const styles = StyleSheet.create({
    fabLocationBR: {
      position: 'absolute',
      bottom: 20,
      right: 70
    },
  
    fab: {
      backgroundColor: '#ba000d',
      width: 45,
      height: 45,
      borderRadius: 100,
      justifyContent: 'center',
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
  
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center'
    }
  })
