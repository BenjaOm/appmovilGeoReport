import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import cuadranteGeoJSON from '../GeoJson/PlanCuadrante.geojson';

const Mapa = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const navigation = useNavigation();
  const [isLayerModalVisible, setIsLayerModalVisible] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('none');
  const [showTraffic, setShowTraffic] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const id = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );
      setWatchId(id);
    };

    getLocation();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  const handleAlertPress = () => {
    navigation.navigate('Alerta');
  };

  const handleLayerPress = () => {
    setIsLayerModalVisible(true);
  };

  const selectLayer = (layer) => {
    if (layer === 'transit') {
      setShowTraffic(!showTraffic);
    }
    setIsLayerModalVisible(false);
  };

  const renderizarPoligonos = () => {
    if (cuadranteGeoJSON && cuadranteGeoJSON.features) {
      return cuadranteGeoJSON.features.map((feature, index) => {
        if (feature.geometry && feature.geometry.coordinates) {
          const coordinates = feature.geometry.coordinates[0].map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
          return (
            <Polygon
              key={index}
              coordinates={coordinates}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          );
        }
      });
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Buscar dirección..."
        onPress={(data, details = null) => {
          console.log('Datos recibidos del autocompletado:', data);
          console.log('Detalles recibidos del autocompletado:', details);

          if (details && details.geometry && details.geometry.location) {
            const location = details.geometry.location;
            console.log('Ubicación seleccionada:', location);

            mapRef.current.animateToRegion({
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
            setSelectedAddress(location);
          }
        }}
        query={{
          key: 'AIzaSyBRaqbsHq9LmqM19j_XKaGqw1QAAH2pUWw', // Asegúrate de que esta es la clave API correcta
          language: 'es',
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: styles.searchTextInputContainer,
          textInput: styles.searchTextInput,
        }}
        autoFocus={true}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        debounce={200}
      />
    </View>

      {location ? (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider="google"
          showsUserLocation
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Mi Ubicación"
            description="Estoy aquí en tiempo real"
          />
          {selectedAddress && (
            <Marker
              coordinate={{
                latitude: selectedAddress.lat,
                longitude: selectedAddress.lng,
              }}
              title="Ubicación Seleccionada"
              // Replace with your marker icon
              image={require('../Assets/miubicacion.png')}
            />
          )}
          {renderizarPoligonos()}
        </MapView>
      ) : (
        <Text>Cargando mapa...</Text>
      )}

      <TouchableOpacity
        style={styles.layerButton}
        onPress={handleLayerPress}
      >
        <Text style={styles.layerButtonText}>Capas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.alertButton}
        onPress={handleAlertPress}
      >
        <Text style={styles.alertButtonText}>Alertar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLayerModalVisible}
        onRequestClose={() => {
          setIsLayerModalVisible(!isLayerModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Seleccione una capa:</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => selectLayer('transit')}
          >
            <Text>Tránsito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => selectLayer('bicycles')}
          >
            <Text>Bicicletas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => selectLayer('publicTransport')}
          >
            <Text>Transporte Público</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  alertButton: {
    position: 'absolute',
    bottom: 16,
    left: 179,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  alertButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  layerButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  layerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  searchBarContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  searchTextInputContainer: {
    backgroundColor: 'white',
  },
  searchTextInput: {
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: '#c7c7c7',
  },
});

export default Mapa;
