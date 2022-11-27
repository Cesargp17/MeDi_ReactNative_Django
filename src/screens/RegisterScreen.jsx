import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useAuth } from '../hooks/useAuth';
import { styles } from '../styles/appTheme';

export const RegisterScreen = ({ navigation }) => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { onRegisterUser } = useAuth();

    const onRegister = () => {

      const emailValidation = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      if( emailValidation.test(email) === false ) return alert('Ingresa un email válido');
      if( password.length < 5 ) return alert('La contraseña debe contener minimo 5 carácteres');
      onRegisterUser(email.toLowerCase().trim(), password.trim(), nombre);
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((resp) => { console.log(resp) })
    }
  
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/0/06/MedlinePlus_Cross_logo.png',
          }}
          style={styles.image}
        />
                <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ingresa tú nombre..."
            placeholderTextColor="#003f5c"
            onChangeText={nombre => setNombre(nombre)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ingresa tú email..."
            placeholderTextColor="#003f5c"
            autoComplete='email'
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>
  
        <TouchableOpacity onPress={ onRegister } style={styles.loginBtn}>
          <Text style={styles.loginText}>REGISTRARSE</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={ () => navigation.navigate('Login') } style={styles.registerBtn}>
          <Text style={styles.loginText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>¿Ya tienes una cuenta?</Text>
      </View>
  )
}
