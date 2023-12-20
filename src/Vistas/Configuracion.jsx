import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Configuracion = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Configuración</Text>
      </View>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilUsuario')}>
        <Text style={styles.optionText}>Perfil del Usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('HistorialActividades')}>
        <Text style={styles.optionText}>Historial de Actividades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Estadisticas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Preferencia de idiomas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Opciones de reporte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Notificaciones personalizadas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a cambiar contraseña */}}>
        <Text style={styles.optionText}>Configuracion de privacidad</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => {/* Navegación a Acerca de/Ayuda */}}>
        <Text style={styles.optionText}>Acerca de / Ayuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ConsejosSeguridad')}>
        <Text style={styles.optionText}>Consejos Seguridad</Text>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CerrarSesion')}>
        <Text style={styles.optionText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Configuracion;
