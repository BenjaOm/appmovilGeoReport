// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Alerta from '../Vistas/Alerta';
import HistorialActividades from '../Vistas/HistorialActividades';
import Configuracion from '../Vistas/Configuracion';

const Stack = createStackNavigator();

const NavegacionStack = () => {
  return (
    <Stack.Navigator>
   

      {/* Puedes agregar más pantallas al StackNavigator según sea necesario */}
    </Stack.Navigator>
  );
};

export default NavegacionStack;
