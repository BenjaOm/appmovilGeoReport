import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

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
  const [Direccion, setDireccion] = useState('');

  const registrar = async () => {
    // Verifica si las contraseñas coinciden
    if (contrasena !== repetirContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.9:3001/api/Registrarusuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          edad: parseInt(edad, 10), // Asegúrate de que la edad sea un número
          correo,
          contrasena,
          rut, // Minúsculas para coincidir con el modelo
          numeroDocumento, // Minúsculas para coincidir con el modelo
          telefono,
          Direccion, // Mayúsculas para coincidir con el modelo
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Registro completado.');
      } else {
        // Aquí se muestra el mensaje de error personalizado del backend
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      // Este error se captura si hay un problema con la red o el servidor no responde
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
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono} // Esto actualiza el estado de telefono
        style={styles.input}
        keyboardType="phone-pad" // Si quieres abrir el teclado numérico para teléfono
      />
        
   <TextInput
        placeholder="Direccion"
        value={Direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />
   

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
