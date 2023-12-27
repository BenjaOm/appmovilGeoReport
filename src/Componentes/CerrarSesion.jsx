import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Componentes/Autenticacion';

const CerrarSesion = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  // Corrige la función para llamar a handleLogout en lugar de CerrarSesion
  const handleLogout = () => {
    signOut();
    navigation.navigate('Login2')
  };

  return (
    <View style={styles.container}>
      {/* Corrige el evento onPress para que llame a handleLogout */}
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
