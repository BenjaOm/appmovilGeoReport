import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { Input, Button, ThemeProvider, Divider } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

const Alerta = () => {
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [informacionAdicional, setInformacionAdicional] = useState('');
  const [foto, setFoto] = useState(null);
  const [documento, setDocumento] = useState(null);
  const [tienePermiso, setTienePermiso] = useState(null);
  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setTienePermiso(status === 'granted');
    })();
  }, []);

  const manejarEnvio = () => {
    console.log('Descripción:', descripcion);
    console.log('Ubicación:', ubicacion);
    console.log('Información Adicional:', informacionAdicional);
    console.log('Foto:', foto);
    console.log('Documento:', documento);
    ('');
    setDescripcion('');
    setUbicacion('');
    setInformacionAdicional('');
    setFoto(null);
    setDocumento(null);
  };

  const tomarFoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setFoto(data.uri);
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
          placeholder="Ubicación del incidente"
          value={ubicacion}
          onChangeText={setUbicacion}
          containerStyle={estilos.entrada}
        />

        <Input
          placeholder="Información adicional (opcional)"
          value={informacionAdicional}
          onChangeText={setInformacionAdicional}
          containerStyle={estilos.entrada}
          multiline
        />

        <Camera
          ref={cameraRef}
          style={estilos.preview}
          type={Camera.Constants.Type.back}
        />

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

export default Alerta;
