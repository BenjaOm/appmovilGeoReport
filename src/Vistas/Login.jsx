import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { useAuth } from '../Componentes/Autenticacion';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarClaveUnica, setMostrarClaveUnica] = useState(false);

  const { signIn } = useAuth();
  const navigation = useNavigation();
 
  const handleLogin = async () => {
    const api = axios.create({
      baseURL: 'http://192.168.0.9:3001/api',
    });
  
    try {
      const response = await api.post('/login', {
        correo,
        contrasena,
      });

      if (response.data.token) {
        console.log('Inicio de sesión exitoso');
        signIn(response.data.token);
        navigation.navigate('Inicio');
        navigation.navigate('NavegacionTab');

      } else {
        Alert.alert('Error', 'Inicio de sesión fallido');
      }
    }catch (error) {
      console.error(error.response || error);
      Alert.alert('Error', error.response?.data?.mensaje || 'Hubo un problema al iniciar sesión');
    }
    
    
  };


  const handleNavigateToRegister = () => {
    navigation.navigate('RegistroUsuarios'); // Asegúrate de tener esta ruta en tu Navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setCorreo}
        value={correo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setContrasena}
        value={contrasena}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMostrarClaveUnica(!mostrarClaveUnica)}
      >
        <Text style={styles.buttonText}>{mostrarClaveUnica ? "Volver" : "Clave Única"}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleNavigateToRegister}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    width: '85%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 20,
    elevation: 3,
  },
  button: {
    width: '85%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
