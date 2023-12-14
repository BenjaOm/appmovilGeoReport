import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './src/Vistas/Inicio';
import Mapa from './src/Vistas/Mapa';
import Login from './src/Vistas/Login';
import Alerta from './src/Vistas/Alerta';
import Chatbot from './src/Vistas/Chatbot';
import Configuracion from './src/Vistas/Configuracion';
import HistorialActividades from './src/Vistas/HistorialActividades';
import PerfilUsuario from './src/Componentes/PerfilUsuario';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();





function ConfiguracionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
      name="ConfiguracionScreen" 
      component={Configuracion}
      options={{ headerTitle: '' }} // Título personalizado
      />
      <Stack.Screen name="HistorialActividades" component={HistorialActividades} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <Stack.Screen name="Alerta" component={Alerta} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen name="Mapa" component={Mapa} />





      {/* Más pantallas si es necesario */}
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
      
            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Mapa') {
              iconName = focused ? 'map' : 'map';
            } else if (route.name === 'ConfiguracionTab') {
              iconName = focused ? 'settings' : 'settings';
            } else if (route.name === 'Alerta') {
              iconName = focused ? 'warning' : 'warning';
            }
            // Añade más condiciones para otras pestañas si es necesario
      
            // Usa el icono de MaterialIcons
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={Inicio} />

        <Tab.Screen name="Alerta" component={Alerta} />

        
        <Tab.Screen name="Mapa" component={Mapa} />
        {/* Las demás pestañas */}
        <Tab.Screen 
        name="ConfiguracionTab" 
        component={ConfiguracionStack}
        options={{ headerTitle: '' }} // Título personalizado
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
