import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../Componentes/Autenticacion'; // Importa el hook useAuth

import Inicio from '../Vistas/Inicio';
import Login from '../Vistas/Login';

import Login2 from '../Vistas/Login';
import NavegacionTab from '../Navegacion/NavegacionTab';
import Configuracion from '../Vistas/Configuracion';
import HistorialActividades from '../Vistas/HistorialActividades';
import Chatbot from '../Vistas/Chatbot';
import ConsejosSeguridad from '../Vistas/ConsejosSeguridad';
import Alerta from '../Vistas/Alerta';
import MenuDenuncias from '../Vistas/MenuDenuncias';
import RegistroUsuarios from '../Vistas/RegistroUsuarios';
import CerrarSesion from '../Componentes/CerrarSesion';
import PerfilUsuario from '../Componentes/PerfilUsuario';
import Mapa from '../Vistas/Mapa';
import ChatBot from '../Vistas/Chatbot';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Sentry.init({
  //dsn: "https://f74eaf21d47d4d37d3879226de9bc97d@o4506402180956160.ingest.sentry.io/4506402182463488",  // Additional Sentry configuration options can be added here




const MenuNavegacion = () => {

  const { userToken } = useAuth(); // Utiliza el hook para acceder al token del usuario
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(!!userToken); // Actualiza el estado basado en la presencia del token
  }, [userToken]);
  return (
    <Stack.Navigator>
      {!isSignedIn ? (
        // Si el usuario no está autenticado, muestra solo la pantalla de Login
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        
      ) : (
        
            // Si el usuario está autenticado, muestra las pantallas de la aplicación
            <>
   
      <Stack.Screen name="Configuracion" component={Configuracion} />
      <Stack.Screen name="HistorialActividades" component={HistorialActividades} />
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
      <Stack.Screen name="Chatbot" component={ChatBot} />
      <Stack.Screen name="ConsejosSeguridad" component={ConsejosSeguridad} />
      <Stack.Screen name="Alerta" component={Alerta} />
      <Stack.Screen name="Mapa" component={Mapa} />
      <Stack.Screen name="MenuDenuncias" component={MenuDenuncias} />

      <Stack.Screen name="CerrarSesion" component={CerrarSesion} />



        </>
      )}

    <Stack.Screen 
          name="RegistroUsuarios" 
          component={RegistroUsuarios}
          options={{ headerShown: true, title: "Registro de Usuarios" }} // Opcional: Muestra la barra de navegación con un título
        />
      <Stack.Screen name="Login2" component={Login2} options={{ headerShown: false }}/>
      <Stack.Screen name="NavegacionTab" component={NavegacionTab} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />

      {/* Add more screens as needed */}
    </Stack.Navigator>

 
  );
}

export default MenuNavegacion;