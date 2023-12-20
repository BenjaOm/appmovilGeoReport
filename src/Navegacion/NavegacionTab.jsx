// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Inicio from '../Vistas/Inicio';
import Mapa from '../Vistas/Mapa';
import Configuracion from '../Vistas/Configuracion';
import Alerta from '../Vistas/Alerta';
import Chatbot from '../Vistas/Chatbot';

const Tab = createBottomTabNavigator();

const NavegacionTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Inicio':
              iconName = 'home';
              break;
            case 'Mapa':
              iconName = 'map';
              break;
            case 'Alerta':
              iconName = 'warning';
              break;
            case 'Chatbot':
              iconName = focused ? 'chat-bubble' : 'chat-bubble-outline';
              break;
            case 'Configuracion':
              iconName = 'settings';
              break;
            // Añadir más casos para otros tabs si es necesario
          }
          return <MaterialIcons name={iconName} size={focused ? 32 : 28} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF', // Un color activo más vibrante
        tabBarInactiveTintColor: '#8E8E93', // Un color inactivo más neutro
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)', // Fondo ligeramente transparente
          borderTopWidth: 0,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          height: 60, // Altura más grande para un aspecto moderno
          position: 'absolute',
          borderTopLeftRadius: 25, // Bordes redondeados
          borderTopRightRadius: 25,
          overflow: 'hidden', // Evita que los íconos salgan del contenedor
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false, // Ocultar la barra de navegación superior
      })}
      initialRouteName="Inicio" // Establecer la pantalla de inicio como la inicial
    >
      <Tab.Screen name="Inicio" component={Inicio} options={{ tabBarLabel: 'Inicio' }} />
      <Tab.Screen name="Mapa" component={Mapa} options={{ tabBarLabel: 'Mapa' }} />
      <Tab.Screen name="Alerta" component={Alerta} options={{ tabBarLabel: 'Alerta' }} />
      <Tab.Screen name="Chatbot" component={Chatbot} options={{ tabBarLabel: 'Chatbot' }} />
      <Tab.Screen name="Configuracion" component={Configuracion} options={{ tabBarLabel: 'Configuración' }} />
    </Tab.Navigator>
  );
};

export default NavegacionTab;
