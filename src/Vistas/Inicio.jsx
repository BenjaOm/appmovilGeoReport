import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta biblioteca instalada

const Inicio = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Alerta')}
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

      <TouchableOpacity style={styles.card} onPress={() => {/* Navegar a pantalla de consejos */}}>
        <Icon name="shield-checkmark" size={24} color="orange" />
        <Text style={styles.cardText}>Consejos de Seguridad</Text>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 15,
  },
  // Añade más estilos según necesites
});

export default Inicio;
