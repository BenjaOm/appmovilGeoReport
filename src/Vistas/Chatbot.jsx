import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');

      // Aquí enviarías el mensaje al servicio de chatbot y esperarías la respuesta
      // Por ejemplo:
      // const botResponse = await sendToChatbotService(inputText);
      // setMessages([...messages, { text: botResponse, sender: 'bot' }]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View key={index} style={{ margin: 5, alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderColor: 'gray', borderWidth: 1, marginRight: 10 }}
          onChangeText={setInputText}
          value={inputText}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default Chatbot;
