  import React, { useState, useRef, useEffect } from 'react';
  import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, Image, TextInput } from 'react-native';
  import { Input, Button, ThemeProvider, Divider } from 'react-native-elements';
  import { Picker } from '@react-native-picker/picker';
  import { useAuth } from '../Componentes/Autenticacion'; // Importa el hook de autenticación

  import axios from 'axios';


  const Alerta = ({ route }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [infoAdicional, setInfoAdicional] = useState('');
    const [tipoDelitoSeleccionado, setTipoDelitoSeleccionado] = useState('Robo'); // Un valor predeterminado de la lista
    const [ubicacionActual, setUbicacion] = useState(' '); // Uso correcto del hook useState
    const [correoElectronico, setCorreoElectronico] = useState('');

    const { userToken } = useAuth(); // Obtén el token del usuario
    const nombreDeUsuario = userToken?.usuario?.nombre || ''; // Obtén el nombre de usuario del token

    useEffect(() => {
    if (route.params?.ubicacionActual) {
      const { latitude, longitude } = route.params.ubicacionActual;
      setUbicacion({ latitude, longitude });
    }

    if (userToken && userToken.usuario) {
      setNombreDeUsuario(userToken.usuario.nombre || ''); // Set the username from the token
      setCorreoElectronico(userToken.usuario.correo || '');
    }
  }, [route.params?.ubicacionActual, userToken]);
    

    const manejarEnvio = async () => {
      const url = 'http://192.168.0.9:3001/Denuncias';
      const datosDenuncia = {
        nombre: nombreDeUsuario, // Asegúrate de que este campo se llame 'nombre', que es lo que espera tu backend
        direccion,
        descripcion,
        tipoDelitoSeleccionado,
        infoAdicional,
        ubicacionActual: {
          latitude: ubicacionActual.latitude,
          longitude: ubicacionActual.longitude,
        },
      };
    
      try {
        const response = await axios.post(url, datosDenuncia, {
          headers: {
            Authorization: `Bearer ${userToken}` // Asegúrate de que userToken sea solo el token en formato de cadena
          }
        });
        console.log('Respuesta de Axios:', response.data);
        Alert.alert('Éxito', 'Alerta enviada correctamente');
      } catch (error) {
        console.error('Error al enviar alerta:', error);
        Alert.alert('Error', 'No se pudo enviar la alerta');
      }
      
    };
    



    const delitos = [
    'Robo',
    'Asalto',
    'Homicidio',
    'Acoso',
    'Vandalismo',
    ]
    
    const obtenerDireccion = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBRaqbsHq9LmqM19j_XKaGqw1QAAH2pUWw`);
        console.log("Respuesta de la API de Geocodificación:", response.data);
        if (response.data && response.data.results && response.data.results.length > 0) {
          return response.data.results[0].formatted_address;
        }
        return '';
      } catch (error) {
        console.error('Error al obtener la dirección:', error);
        return '';
      }
    };
    
    useEffect(() => {
      if (route.params?.ubicacionActual) {
        const { latitude, longitude } = route.params.ubicacionActual;
        console.log("Ubicación actual:", latitude, longitude);
        obtenerDireccion(latitude, longitude).then(direccion => {
          console.log("Dirección obtenida:", direccion);
          setDireccion(direccion);
        });
      }
      // Resto del código...
    }, [route.params?.ubicacionActual, userToken]);
    

    return (
      <ThemeProvider>
        <ScrollView contentContainerStyle={estilos.contenedor}>
          <Text h4 style={estilos.titulo}>Formulario de Alerta</Text>

       
       
       <TextInput
          style={estilos.input}
          onChangeText={setDireccion}
          value={direccion}
          placeholder="Dirección"
        />


          
        <TextInput
          style={estilos.input}
          onChangeText={setDescripcion}
          value={descripcion}
          placeholder="Descripción de la denuncia"
        />

          <Picker
            selectedValue={tipoDelitoSeleccionado}
            onValueChange={(itemValue) => setTipoDelitoSeleccionado(itemValue)}
            style={estilos.picker}
            itemStyle={estilos.pickerItem} // Estilo para los elementos de la lista
          >
            <Picker.Item label="Selecciona un delito" value="" />
            {delitos.map((delito, index) => (
              <Picker.Item key={index} label={delito} value={delito} />
            ))}
          </Picker>


    <TextInput
          style={estilos.textArea}
          onChangeText={setInfoAdicional}
          value={infoAdicional}
          placeholder="Información adicional"
          multiline
          numberOfLines={4}
        />


    

          <Divider style={estilos.divisor} />

          <Button title="Enviar Alerta" onPress={manejarEnvio} buttonStyle={estilos.botonEnviar} />
        </ScrollView>
      </ThemeProvider>
    );
  };

export default Alerta;


const estilos = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  titulo: {
    color: '#3F51B5',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 22,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10, // bordes redondeados
    backgroundColor: 'white',
    shadowColor: '#000', // sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entrada: {
    width: '100%',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  botonEnviar: {
    backgroundColor: '#3F51B5',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  divisor: {
    backgroundColor: '#3F51B5',
    marginVertical: 20,
    height: 1,
  },
  botonCamara: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  textoBotonCamara: {
    color: '#fff',
    fontSize: 16,
  },
  preview: {
    height: 300,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
  },
  imagenPrevisualizacion: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 8,
  },
  botonesCamara: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  textoDocumento: {
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    
  },
  
  pickerItem: {
    backgroundColor: '#3F51B5', // Color de fondo cuando se selecciona un delito
    color: 'white', // Color del texto seleccionado
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});




