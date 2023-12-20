import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';

const ConsejosSeguridad = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [consejoSeleccionado, setConsejoSeleccionado] = useState(null);

  const consejos = [
    { id: 1, titulo: 'Consejo de Seguridad 1', descripcion: 'Detalle del consejo 1...' },
    { id: 2, titulo: 'Consejo de Seguridad 2', descripcion: 'Detalle del consejo 2...' },
    { id: 3, titulo: 'Consejo de Seguridad 3', descripcion: 'Detalle del consejo 3...' },
    // ... otros consejos
  ];

  const mostrarModal = consejo => {
    setConsejoSeleccionado(consejo);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {consejos.map(consejo => (
          <TouchableOpacity key={consejo.id} onPress={() => mostrarModal(consejo)}>
            <Card>
              <Card.Title>{consejo.titulo}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardText}>Toca para más detalles</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          {consejoSeleccionado && (
            <>
              <Text style={styles.modalTitle}>{consejoSeleccionado.titulo}</Text>
              <Text style={styles.modalText}>{consejoSeleccionado.descripcion}</Text>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};
export default ConsejosSeguridad;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardText: {
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
  },
});


