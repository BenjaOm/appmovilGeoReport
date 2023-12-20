import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Importa la función `useNavigation` de React Navigation
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [claveUnica, setClaveUnica] = useState('');
  const [mostrarClaveUnica, setMostrarClaveUnica] = useState(false);
  const [credencial, setCredencial] = useState('');

  // Obtiene la instancia de navegación
  const navigation = useNavigation();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación local si es necesario
    if (correo === 'Erick' && contrasena === '123') {
      console.log('Inicio de sesión exitoso');
      navigation.navigate('Inicio'); // Navega a la pantalla de inicio
      navigation.navigate('NavegacionTab');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };
  const handleNavigateToRegister = () => {
    navigation.navigate('RegistroUsuarios');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setCorreo} // Actualiza el estado de correo
        value={correo}           // Usa el estado de correo
        keyboardType="email-address" // Teclado optimizado para correos electrónicos
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setContrasena} // Actualiza el estado de contrasena
        value={contrasena}           // Usa el estado de contrasena
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
