import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loading = () => {
  return (
    <View style={[styles.containerr, styles.horizontal]}>
        <ActivityIndicator style={{  }} size='large' />
    </View>  
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
