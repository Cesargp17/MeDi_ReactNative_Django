import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useCitas } from '../hooks/useCitas';

export const FabEdit = () => {

    const navigation = useNavigation();
    const { CitaActiva } = useCitas();

  return (
    <View style={ styles.fabLocationBR }>
        {
            CitaActiva === 'Vacio'
            ? null
            : (
                <TouchableNativeFeedback
                onPress={ ()=>navigation.navigate( 'Editar Cita' ) }
                background={TouchableNativeFeedback.Ripple( 'white', false, 22 )}
                    >
                    <View style={ styles.fab }> 
                        <Text style={ styles.text }><Icon name="create-outline" size={30} color="white" /></Text>
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
        right: 120
      },
    
      fab: {
        backgroundColor: '#43a047',
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