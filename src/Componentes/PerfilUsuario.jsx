import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PerfilUsuario = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Encabezado Personalizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Volver"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil del Usuario</Text>
      </View>

      {/* Contenido de la pantalla */}
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60, // Ajusta esto según tus necesidades
    backgroundColor: 'white', // Color de fondo del encabezado
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1, // Opcional: borde para el encabezado
    borderBottomColor: '#cccccc',
    paddingTop: 0, //  no haya padding superior
    marginTop: 0, //  no haya margen superior
  
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute', // Posiciona absolutamente el título
    top: 10, // Ajusta la altura según tus necesidades
  },
  backButton: {
    position: 'absolute', // Posiciona absolutamente el botón de retroceso
    left: 10, // Ajusta según tus necesidades
    top: 10, // Ajusta la altura según tus necesidades
  },
  backButtonText: {
    fontSize: 16,
  },
});

export default PerfilUsuario;
