import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/Componentes/Autenticacion'; // Importa el AuthProvider
import MenuNavegacion from './src/Navegacion/MenuNavegacion';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MenuNavegacion />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
