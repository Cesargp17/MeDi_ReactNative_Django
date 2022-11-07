import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    image :{
        marginBottom: 40,
        width: 100,
         height: 100
      },

      inputView: {
        backgroundColor: "#e3f2fd",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        color: 'black',
      },

      loginBtn: {
        width:"80%",
        borderRadius:25,
        height: 40,
        width: 190,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#1976d2",
    },
    
    registerBtn: {
        width:"80%",
        borderRadius:25,
        height: 40,
        width: 160,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom: 10,
        backgroundColor:"#43a047",
    },

    registerText: {
        height: 30,
        marginBottom: 30,
      },


    loginText: {
        color: 'white',
        fontWeight: 'bold',
    }

  });