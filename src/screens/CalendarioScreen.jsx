
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Calendar from 'react-native-big-calendar';
import { FabAdd } from '../components/FabAdd';
import { FabDelete } from '../components/FabDelete';
import { FabEdit } from '../components/FabEdit';
import { useCitas } from '../hooks/useCitas';
import 'dayjs/locale/es'
import { Loading } from '../components/Loading';

export const CalendarioScreen = () => {

    const { Citas: events, onSelectActiveCita } = useCitas();
    
  return (
    <View style={{
        flex: 1
    }}>
      {
        events.length === 0
        ? <Loading/>
        : <Calendar
        mode='month'
        onPressEvent={(event) => {
            onSelectActiveCita(event);
        }}
          events={ events.filter( event => event.status === 'Confirmada' ) }
          locale="es"
          height={600}
          style={{
            style: {
              backgroundColor: "green",
              borderRadius: "0px",
              opacity: 0.8,
              color: "red",
              border: "0px",
              display: "block"
            }
          }}
          theme={{
            style: {
              backgroundColor: "green",
              borderRadius: "0px",
              opacity: 0.8,
              color: "black",
              border: "0px",
              display: "block"
            }
          }}
          eventPropGetter={{
            style: {
              backgroundColor: "green",
              borderRadius: "0px",
              opacity: 0.8,
              color: "black",
              border: "0px",
              display: "block"
            }
          }}
        /> 
      }
        
        {/* <Calendar
            onPressEvent={(event) => {
                onSelectActiveCita(event);
            }}
            
            eventCellStyle={{
                backgroundColor: "blue",
                borderColor: "black",
                borderWidth: 1,
                color: "green",
                textAlign: "center",
                fontSize: 30
            }}
            events={events} height={600}
        /> */}

        <FabAdd/>
        <FabDelete/>
        <FabEdit/>
    </View>
  )
}
