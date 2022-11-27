import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useCitas } from '../hooks/useCitas';
import { BuscarDoctor } from './BuscarDoctor';
import { BuscarPaciente } from './BuscarPaciente';
  
  const areas = [
    { id: 1, nombre: 'Radiologia' },
    { id: 2, nombre: 'Cardiologia' },
    { id: 3, nombre: 'Nutricion' },
    { id: 4, nombre: 'Medicina General' },
    { id: 5, nombre: 'Odontología' },
  ];

export const NewEvent = () => {

    const navigation = useNavigation();
    const { onCreateNewCita, Usuario, setUsuario, Doctor, setDoctor, usuarios, doctores, TodosLosUsuarios } = useCitas();

    const [Titulo, setTitulo] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [date, setDate] = useState(new Date());
    const [dateFinished, setDateFinished] = useState(new Date());

    const onSave = () => {
        const cita = {
          title: Titulo,
          start: date,
          user: Usuario,
          doctor: Doctor,
          status: 'Confirmada',
          notes: Descripcion,
          end: dateFinished,
        }

        if( Titulo === '' ){
          alert('Agrega un titulo a la cita...');
          return;
        } else if( Descripcion === '' ){
          alert('Agrega una descripción a la cita...');
          return;
        }
         else if( date > dateFinished ){
          alert('La fecha de finalización no puede ser antes que la fecha de inicio...');
          return;
        } else if ( date.toJSON() == dateFinished.toJSON() ){
          alert('La fecha de finalización y la fecha de inicio no pueden ser iguales...');
          return;
        } else if( Doctor === 'Vacio' ){
          alert('Selecciona el doctor');
          return;
        } else if( Usuario === 'Vacio' ){
          alert('Selecciona un paciente');
          return;
        }

        onCreateNewCita( cita )
        navigation.navigate( 'Calendario' )

        setTitulo('');
        setDate(new Date());
        setDateFinished(new Date());
        setUsuario('Vacio');
        setDoctor('Vacio');
        setDescripcion('');
        alert('Cita creada correctamente')
      }

  return (
    <ScrollView>
    <View style={styles.centeredView}>
        <Text style={styles.modalText}>CREAR CITA</Text>

        <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Asunto de la cita</Text>
        <TextInput
            style={styles.input}
            onChangeText={setTitulo}
            value={Titulo}
            placeholder="Asunto de la cita..."
            keyboardType="text"
          />

        <Text style={{ color: 'black', marginTop: 15, marginBottom: 0, fontSize: 15, fontWeight: 'bold' }}>Descripción de la cita</Text>
        <TextInput
            style={styles.bigInput}
            onChangeText={setDescripcion}
            value={Descripcion}
            placeholder="Descripcion de la cita..."
            keyboardType="text"
            multiline
          />

            <Text style={{ color: 'black', marginTop: 30, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Selecciona la fecha de inicio</Text>
            <DatePicker theme='light' minuteInterval={30} style={{ width: 270, height: 150 }} date={date} onDateChange={setDate} />

            <Text style={{ color: 'black', marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>Selecciona la fecha de terminación</Text>
            <DatePicker theme='light' minuteInterval={30} style={{ width: 270, height: 150, marginBottom: 30 }} date={dateFinished} onDateChange={setDateFinished} />

          {
            Doctor === 'Vacio'
            ? <BuscarDoctor usuarios={ doctores }/>
            : (
            <View style={ styles.cardSelectedUser }>
              <Text style={{ ...styles.userText, color: 'black', marginStart: 10 }}>Doctor: </Text>
              <Text style={ styles.userText }>{ Doctor?.name } - { Doctor?.area?.area }</Text>
              <TouchableNativeFeedback onPress={ () => setDoctor('Vacio') } background={TouchableNativeFeedback.Ripple( 'black', false, 32 )}>
                <Text style={ styles.textDelete }>X</Text>
              </TouchableNativeFeedback>
            </View>
            )
          }

          {
            Usuario === 'Vacio'
            ? <BuscarPaciente usuarios={ TodosLosUsuarios.filter( u => u.rol !== 'Doctor' ) }/>
            : (
            <View style={ styles.cardSelectedUser }>
              <Text style={{ ...styles.userText, color: 'black', marginStart: 10 }}>Paciente: </Text>
              <Text style={ styles.userText }>{ Usuario?.name }</Text>
              <TouchableNativeFeedback onPress={ () => setUsuario('Vacio') } background={TouchableNativeFeedback.Ripple( 'black', false, 32 )}>
                <Text style={ styles.textDelete }>X</Text>
              </TouchableNativeFeedback>
            </View>
            )
          }

          <Pressable style={{ backgroundColor: '#1976d2', padding: 5, marginTop: 15, borderRadius: 20, width: 90, height: 35 }} onPress={ onSave }>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>GUARDAR</Text>
          </Pressable>

          <TouchableNativeFeedback onPress={ ()=>navigation.navigate( 'Calendario' ) } background={TouchableNativeFeedback.Ripple( 'black', false, 64 )}>
            <Text style={{ fontSize: 16, marginTop: 8, marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Cancelar</Text>
          </TouchableNativeFeedback>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
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
        elevation: 5
      },
      button: {
        width: 45,
        height: 45,
        borderRadius: 100,
        elevation: 2,
        position: 'absolute',
        bottom: -28,
        right: 20,
      },
      buttonOpen: {
        backgroundColor: '#1976d2',
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 7
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
    
      bigInput: {
        height: 80,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        width: 250,
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'gray'
      },
    
      buttonSave: {
        backgroundColor: 'white'
      },
      cardSelectedUser: {
        flexDirection: 'row',
        width: 320,
        height: 50,
        backgroundColor: '#fafafa',
        padding: 5,
        borderRadius: 0,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
  
        elevation: 11,
        alignItems: "center",
      },
      userText: {
        fontSize: 15,
        marginLeft: 0,
        fontWeight: 'bold',
        color: 'black'
    },
    textDelete: {
      marginLeft: 'auto',
      backgroundColor: '#eeeeee',
      padding: 5,
      fontWeight: 'bold',
      fontSize: 10
    },
})
