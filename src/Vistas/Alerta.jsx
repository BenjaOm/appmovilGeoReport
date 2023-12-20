import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { Input, Button, ThemeProvider, Divider } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as Location from 'expo-location';

const Alerta = ({ route }) => {
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState(null);
  const [tipoDelito, setTipoDelito] = useState('');
  const [informacionAdicional, setInformacionAdicional] = useState('');
  const [foto, setFoto] = useState(null);
  const [documento, setDocumento] = useState(null);
  const [tienePermiso, setTienePermiso] = useState(null);
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTienePermiso(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (route.params?.ubicacionActual) {
      const { latitude, longitude } = route.params.ubicacionActual;
      // Formatea la ubicación como un objeto
      setUbicacion({ latitud: latitude, longitud: longitude });
    }
  }, [route.params?.ubicacionActual]);

  const manejarEnvio = async () => {
    try {
      const formData = new FormData();
      formData.append('descripcion', descripcion);
      formData.append('tipoDelito', tipoDelito);
      formData.append('informacionAdicional', informacionAdicional);
      formData.append('ubicacion', JSON.stringify(ubicacion)); // Convierte ubicación a JSON
      formData.append('foto', foto);
      formData.append('documento', documento);

      // Agrega el nombre y correo del usuario
      formData.append('nombreUsuario', nombreUsuario);
      formData.append('correoUsuario', correoUsuario);

      const response = await axios.post('http://192.168.0.8:3001/api/denuncias', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Denuncia registrada con éxito');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al registrar la denuncia');
    }
  };
  
  const tomarFoto = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setFoto(data.uri);
      } catch (error) {
        console.error("Error al tomar foto:", error);
      }
    } else {
      Alert.alert('Error', 'La cámara no está lista');
    }
  };

  const seleccionarDocumento = async () => {
    let resultado = await DocumentPicker.getDocumentAsync({});
    if (resultado.type === 'success') {
      setDocumento(resultado.uri);
    }
  };

  if (tienePermiso === null) {
    return <View />;
  }
  if (tienePermiso === false) {
    return <Text>No hay acceso a la cámara</Text>;
  }

  return (
    <ThemeProvider>
      <ScrollView contentContainerStyle={estilos.contenedor}>
        <Text h4 style={estilos.titulo}>Formulario de Alerta</Text>

        <Input
          placeholder="Descripción del incidente"
          value={descripcion}
          onChangeText={setDescripcion}
          containerStyle={estilos.entrada}
        />

        <Input
          placeholder="Tipo Delito (De un indicio del delito)"
          value={tipoDelito}
          onChangeText={setTipoDelito}
          containerStyle={estilos.entrada}
          multiline
        />

        <Input
          placeholder="Información adicional (opcional)"
          value={informacionAdicional}
          onChangeText={setInformacionAdicional}
          containerStyle={estilos.entrada}
          multiline
        />

        {tienePermiso ? (
          <Camera
            ref={cameraRef}
            style={estilos.preview}
            type={Camera.Constants.Type.back}
            onCameraReady={() => setIsCameraReady(true)}
          />
        ) : (
          <Text>No hay acceso a la cámara</Text>
        )}

        <View style={estilos.botonesCamara}>
          <TouchableOpacity onPress={tomarFoto} style={estilos.botonCamara}>
            <Text style={estilos.textoBotonCamara}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={seleccionarDocumento} style={estilos.botonCamara}>
            <Text style={estilos.textoBotonCamara}>Subir Video</Text>
          </TouchableOpacity>
        </View>

        {foto && (
          <Image source={{ uri: foto }} style={estilos.imagenPrevisualizacion} />
        )}

        {documento && (
          <Text style={estilos.textoDocumento}>Documento seleccionado</Text>
        )}

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
  entrada: {
    width: '100%',
    marginBottom: 10,
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
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  placeholder: {
    color: 'gray',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
};


