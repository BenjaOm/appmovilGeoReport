import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
// Importa el método de AsyncStorage o cualquier otro método que estés utilizando
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CerrarSesion = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
   
      
      // Realiza cualquier otra acción de limpieza necesaria, como borrar el estado global o la cach     // ...

      // Llama a la función onLogout que podría ser pasada como prop para manejar la navegación post-logout
      navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Estilos para tu contenedor, si son necesarios
  },
});

export default CerrarSesion;
