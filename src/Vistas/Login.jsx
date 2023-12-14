import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Importa la función `useNavigation` de React Navigation
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Obtiene la instancia de navegación
  const navigation = useNavigation();

  const handleLogin = () => {
    // Lógica de autenticación (simulada)
    if (usuario === '1' && contrasena === '1') {
      // Navega a la pantalla 'Inicio' después del inicio de sesión exitoso
      navigation.navigate('Inicio');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={text => setUsuario(text)}
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={text => setContrasena(text)}
        value={contrasena}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default Login;
