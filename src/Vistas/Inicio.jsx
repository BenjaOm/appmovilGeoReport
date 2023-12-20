import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient'; // Usar expo-linear-gradient
import * as Location from 'expo-location';

const Inicio = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Text style={styles.title}></Text>

      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Alerta', { ubicacionActual: currentLocation })}
      >
        <Icon name="alert-circle" size={24} color="red" />
        <Text style={styles.cardText}>Denuncia Rápida</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Mapa')}>
        <Icon name="map" size={24} color="blue" />
        <Text style={styles.cardText}>Ver Mapa de Denuncias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chatbot')}>
        <Icon name="chatbubble-ellipses" size={24} color="green" />
        <Text style={styles.cardText}>Hablar con el Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ConsejosSeguridad')}>
        <Icon name="shield-checkmark" size={24} color="orange" />
        <Text style={styles.cardText}>Consejos de Seguridad</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.0)',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: '100%', // Ocupa todo el ancho posible dentro de los paddings del contenedor
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
    color: '#333',
  },
});

export default Inicio;
