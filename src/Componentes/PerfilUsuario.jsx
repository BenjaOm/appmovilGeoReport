import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PerfilUsuario = () => {
  const navigation = useNavigation();

  // Datos de ejemplo, reemplazar con datos reales del usuario
  const userInfo = {
    nombre: "Nombre del Usuario",
    email: "correo@ejemplo.com",
    imagenPerfil: "url_de_la_imagen_del_perfil",
    direccion: "Dirección del Usuario",
    rut: "RUT del Usuario",
    denunciasRealizadas: 5,
  };
  
  const handleEdit = (field) => {
    // Lógica para manejar la edición de cada campo
    console.log(`Editando ${field}`);
  };

  const cerrarSesion = () => {
    // Aquí iría la lógica para cerrar la sesión
    // Por ejemplo, limpiar tokens, actualizar el estado global, etc.

    // Redirigir al usuario a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };
  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userInfo.imagenPerfil }}
          style={styles.imagenPerfil}
        />
        <Text style={styles.nombre}>{userInfo.nombre}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dirección</Text>
          <Text style={styles.cardContent}>{userInfo.direccion}</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => handleEdit('direccion')}>
            <MaterialIcons name="edit" size={24} color="#1E90FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>RUT</Text>
          <Text style={styles.cardContent}>{userInfo.rut}</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => handleEdit('rut')}>
            <MaterialIcons name="edit" size={24} color="#1E90FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Denuncias Realizadas</Text>
          <Text style={styles.cardContent}>{userInfo.denunciasRealizadas}</Text>
          <TouchableOpacity style={styles.editIcon} onPress={() => handleEdit('denunciasRealizadas')}>
            <MaterialIcons name="edit" size={24} color="#1E90FF" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.botonCerrarSesion} onPress={cerrarSesion}>
          <Text style={styles.textoBoton}>Cerrar Sesión</Text>
        </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  header: {
    backgroundColor: '#1E90FF', // Degradado azul
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // Se puede agregar un degradado real usando una biblioteca externa como react-native-linear-gradient
  },
  imagenPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  email: {
    fontSize: 18,
    color: '#fff',
  },
  body: {
    flex: 1,
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
  },
  botonEditar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  botonCerrarSesion: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    left: 20,
    marginTop: 200,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PerfilUsuario;
