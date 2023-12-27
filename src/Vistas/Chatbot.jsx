import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

const API_KEY = "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";

function ChatBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hola! Soy ChatBot, estoy aquí para ayudar!", sender: "ChatGPT" },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    const newMessage = {
      message: inputText,
      direction: "outgoing",
      sender: "user",
    };
  
    // Primero, actualizar el estado de los mensajes
    setMessages(prevMessages => [...prevMessages, newMessage]);
  
    // Luego, limpiar el inputText
    setInputText('');
  
    // Establecer un indicador de escritura
    setTyping(true);
  
    // Esperar hasta que el estado de messages se actualice
    setTimeout(() => {
      // Ahora, procesar el mensaje para ChatGPT
      processMessageToChatGPT([...messages, newMessage]);
    }, 0);
  };
  
  // La función processMessageToChatGPT aquí...
  async function processMessageToChatGPT(messages) {
    try {
      const requestBody = {
        messages: messages.map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.message,
        })),
      };
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        throw new Error("Error al llamar a la API de ChatGPT");
      }
  
      const responseData = await response.json();
  
      const chatGPTResponse = responseData.choices[0].message.content;
      const newMessage = {
        message: chatGPTResponse,
        direction: "incoming",
        sender: "ChatGPT",
      };
  
      setMessages([...messages, newMessage]);
      setTyping(false);
    } catch (error) {
      console.error("Error al procesar el mensaje con ChatGPT:", error);
    }
  }
  
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer} 
                  ref={ref => this.scrollView = ref}
                  onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
        {messages.map((message, i) => (
          <View key={i} style={message.sender === "ChatGPT" ? styles.chatGPTMessage : styles.userMessage}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe el mensaje aquí"
          onChangeText={setInputText}
          value={inputText}
        />
        <Button title="Enviar" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    // Agrega esto para asegurarte de que el inputContainer siempre esté visible
    zIndex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 20,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 100
    
  },
  chatGPTMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078FF',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    color: 'black',
  },
});

export default ChatBot;