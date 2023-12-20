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
import ConsejosSeguridad from './src/Vistas/ConsejosSeguridad';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Sentry from "@sentry/react-native";
import NavegacionTab from './src/Navegacion/NavegacionTab';
import CerrarSesion from './src/Componentes/CerrarSesion';
import RegistroUsuarios from './src/Vistas/RegistroUsuarios';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Sentry.init({
  dsn: "https://f74eaf21d47d4d37d3879226de9bc97d@o4506402180956160.ingest.sentry.io/4506402182463488",  // Additional Sentry configuration options can be added here
});



const App = () => {
  return (
    <NavigationContainer>
     
     <Stack.Navigator initialRouteName="Login">
        {/* Coloca la pantalla de Login como la primera ruta */}
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }} // Opcional: Oculta la barra de navegación para esta pantalla
        />
        {/* El resto de tus pantallas */}
        <Stack.Screen 
          name="NavegacionTab" 
          component={NavegacionTab}
          options={{ headerShown: false }}
        />

      <Stack.Screen name="Inicio" component={Inicio} />

      <Stack.Screen name="Configuracion" component={Configuracion} />
      <Stack.Screen name="HistorialActividades" component={HistorialActividades} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen name="ConsejosSeguridad" component={ConsejosSeguridad} />
      <Stack.Screen name="Alerta" component={Alerta} />
      <Stack.Screen name="Mapa" component={Mapa} />

      
      <Stack.Screen 
          name="RegistroUsuarios" 
          component={RegistroUsuarios}
          options={{ headerShown: true, title: "Registro de Usuarios" }} // Opcional: Muestra la barra de navegación con un título
        />
      <Stack.Screen name="CerrarSesion" component={CerrarSesion} />

      


      {/* Add more screens as needed */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;