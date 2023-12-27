import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

// Datos de ejemplo de denuncias (puedes reemplazar esto con tus propios datos)
const denuncias = [
  {
    id: 1,
    titulo: 'Denuncia 1',
    descripcion: 'Descripción de la denuncia 1.',
    fecha: '01/01/2023',
  },
  {
    id: 2,
    titulo: 'Denuncia 2',
    descripcion: 'Descripción de la denuncia 2.',
    fecha: '02/01/2023',
  },
  // Agrega más denuncias según sea necesario
];

const MenuDenuncias = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDenuncia, setSelectedDenuncia] = useState(null);

  const openModal = (denuncia) => {
    setSelectedDenuncia(denuncia);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Denuncias de Usuarios</Text>
      <ScrollView>
        {denuncias.map((denuncia) => (
          <TouchableOpacity
            key={denuncia.id}
            style={styles.card}
            onPress={() => openModal(denuncia)}
          >
            <Text style={styles.cardTitle}>{denuncia.titulo}</Text>
            <Text style={styles.cardDate}>{denuncia.fecha}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para mostrar detalles de la denuncia */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles de la Denuncia</Text>
            {selectedDenuncia && (
              <>
                <Text style={styles.modalLabel}>Título:</Text>
                <Text style={styles.modalText}>{selectedDenuncia.titulo}</Text>

                <Text style={styles.modalLabel}>Descripción:</Text>
                <Text style={styles.modalText}>{selectedDenuncia.descripcion}</Text>

                <Text style={styles.modalLabel}>Fecha:</Text>
                <Text style={styles.modalText}>{selectedDenuncia.fecha}</Text>
              </>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    top: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MenuDenuncias;
