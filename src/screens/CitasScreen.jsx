import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { useCitas } from '../hooks/useCitas';

export const CitasScreen = () => {

  const { CitaUsuario, Areas } = useCitas();

  console.log(CitaUsuario)

  return (
    <ScrollView>
    <View style={{
      flex: 1
    }}>
        <Text style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 22,
          color: 'black', 
          marginTop: 13
        }}
        >
          HISTORIAL DE CITAS MEDICAS
        </Text>
        <View style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          
          elevation: 17,
          backgroundColor: 
          '#fafafa',
          width: '95%',
          minHeight: 500, 
          borderRadius: 20,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 25
        }}>
          <ScrollView>
            {
              CitaUsuario.length === 0 || CitaUsuario === 'Vacio'
              ? (
                <View style={[styles.containerr, styles.horizontal]}>
                  <ActivityIndicator style={{  }} size='large' />
                </View>  
              )
              : CitaUsuario.map( cita => (
                <View style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,
                  elevation: 11,
                  backgroundColor: '#2196f3',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                  borderRadius: 20,
                  minHeight: 20,
                  marginRight: 10,
                  marginLeft: 40,
                  marginTop: 10
                }} key={ cita.id }>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 4 }}>Fecha: </Text>
                    <Text style={{ color: 'white', fontSize: 17, marginTop: 4 }}>{ new Date(cita.start).toDateString() }</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 4 }}>Doctor: </Text>
                    <Text style={{ color: 'white', fontSize: 17, marginTop: 4 }}>{ cita.doctor.name }</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginTop: 4 }}>Area: </Text>
                    <Text style={{ color: 'white', fontSize: 17, marginTop: 4, marginBottom: 4 }}>{ Areas.find( a => a._id === cita.doctor.area ).area }</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
        <Pressable style={{
          backgroundColor: '#2196f3',
          borderRadius: 25,
          padding: 8,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20
        }}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>SOLICITAR CITA</Text>
        </Pressable>
          </View>
          </ScrollView>
  )
}

const styles = StyleSheet.create({
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
