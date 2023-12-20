import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';

const RegistroUsuarios = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [telefono, setTelefono] = useState('');

  
  // Direccion como un objeto
  const [mostrarCamposDireccion, setMostrarCamposDireccion] = useState(false);

  const [direccion, setDireccion] = useState({
    Region: '',
    Provincia: '',
    Comuna: '',
    CodPostal: '',
    Calle: '',
    Departamento: '',
    Torre: '',
  });

  const handleDireccionChange = (name, value) => {
    setDireccion(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleCamposDireccion = () => {
    setMostrarCamposDireccion(!mostrarCamposDireccion);
  };

  const registrar = async () => {
    // Verifica si las contraseñas coinciden
    if (contrasena !== repetirContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.8:3001/api/Registrarusuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          edad,
          Rut: rut,
          NumeroDocumento: numeroDocumento,
          correo,
          contrasena,
          telefono,
          Direccion: direccion
          // Asegúrate de enviar todos los campos necesarios
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        Alert.alert('Éxito', 'Registro completado.');
      } else {
        Alert.alert('Error', data.message || 'Error al registrar');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al conectar con el servidor');
    }
  };
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Repetir contraseña"
        value={repetirContrasena}
        onChangeText={setRepetirContrasena}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Número de documento"
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="RUT"
        value={rut}
        onChangeText={setRut}
        style={styles.input}
      />
        <TouchableOpacity onPress={toggleCamposDireccion} style={styles.inputToggle}>
        <Text style={styles.textPlaceholder}>Dirección</Text>
      </TouchableOpacity>
      {mostrarCamposDireccion && (
        <>
           <TextInput
        placeholder="Región"
        value={direccion.Region}
        onChangeText={(text) => handleDireccionChange('Region', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Provincia"
        value={direccion.Provincia}
        onChangeText={(text) => handleDireccionChange('Provincia', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Comuna"
        value={direccion.Comuna}
        onChangeText={(text) => handleDireccionChange('Comuna', text)}
        style={styles.input}
      />
    
      <TextInput
        placeholder="Calle"
        value={direccion.Calle}
        onChangeText={(text) => handleDireccionChange('Calle', text)}
        style={styles.input}
      />
     
      
        </>
      )}

</ScrollView>


      {/* Añadir más campos si lo consideras necesario */}
      <Button title="Registrar" onPress={registrar} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputToggle: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  // Añade más estilos según necesites
});

export default RegistroUsuarios;
