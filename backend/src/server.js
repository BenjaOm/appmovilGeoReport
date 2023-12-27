// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const rutasDenuncias = require('./api/rutas/rutasDenuncias');
const rutasRegistroUsuarios = require('./api/rutas/RegistroUsuarios');
const rutasLogin = require('./api/rutas/Login');
const rutasObtenerUsuarios = require('./api/rutas/ObtenerUsuarios');

// Conexión a la base de datos MongoDB
const cosmosDBURL = process.env.COSMOSDB_CONNSTR;
mongoose.connect(cosmosDBURL)
  .then(() => console.log('Conectado a Azure Cosmos DB'))
  .catch(err => console.error('Error al conectar a Azure Cosmos DB', err));



  /*
  console.log(process.env.OPENAI_API_KEY) 

  const MAX_RETRIES = 5; // Máximo número de reintentos
  const BASE_DELAY = 500; // Tiempo de espera inicial en milisegundos
  
  const callOpenAiApi = async (userInput, retryCount = 0) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": userInput}
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'OpenAI-Organization': 'org-WNDhkc2e7JNVsz2BDvvnm41F'

        }
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < MAX_RETRIES) {
        // Esperar exponencialmente más tiempo en cada reintento
        const delay = BASE_DELAY * Math.pow(2, retryCount);
        console.log(`Esperando ${delay} ms antes del reintento...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return callOpenAiApi(userInput, retryCount + 1);
      } else {
        // Relanzar el error si no es un error 429 o hemos alcanzado el número máximo de reintentos
        throw error;
      }
    }
  };

 */
  /*
  // Ejemplo de cómo usar la función
  callOpenAiApi("Hola, ¿cómo estás?")
    .then(response => console.log(response))
    .catch(error => console.error('Error al llamar a la API:', error));
   */
  
    app.use('/api/usuarios', rutasObtenerUsuarios);

  app.use('/api', rutasLogin);


  app.use('/Denuncias', rutasDenuncias);


  app.use('/api/Registrarusuarios', rutasRegistroUsuarios);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
console.log('Rutas cargadas:', app._router.stack); // Esto mostrará todas las rutas cargadas en la aplicación


















