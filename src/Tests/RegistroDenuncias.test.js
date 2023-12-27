import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistroDenuncias from '../Vistas/Alerta'; // Asegúrate de usar la ruta correcta


const mockRoute = {
    params: {
      ubicacionActual: {
        // Define los valores simulados aquí, por ejemplo:
        latitud: 0,
        longitud: 0
      },
    },
  };
  render(<Alerta route={mockRoute} />);

  test('formulario de registro se renderiza correctamente', () => {
    const { getByTestId } = render(<RegistroDenuncias route={mockRoute} />);
    const formulario = getByTestId('formulario-registro');
    expect(formulario).toBeInTheDocument();
  });


test('validación de campos obligatorios', () => {
    const { getByTestId, getByText } = render(<RegistroDenuncias route={mockRoute} />);
    fireEvent.submit(getByTestId('formulario-registro'));
    expect(getByText('El campo descripción es obligatorio')).toBeInTheDocument();
    // Asegúrate de ajustar los textos según tus mensajes de error
  });

  test('manejo de datos del formulario', () => {
    const { getByTestId, getByLabelText } = render(<RegistroDenuncias route={mockRoute} />);
    const descripcionInput = getByLabelText('Descripción');
    fireEvent.change(descripcionInput, { target: { value: 'Descripción de prueba' } });
    expect(descripcionInput.value).toBe('Descripción de prueba');
  });

  test('envío exitoso del formulario', async () => {
    const mockSubmit = jest.fn();
    const { getByTestId } = render(<RegistroDenuncias onSubmit={mockSubmit} />);
    fireEvent.submit(getByTestId('formulario-registro'));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('respuesta a la entrada del usuario', () => {
    const { getByLabelText, getByTestId } = render(<RegistroDenuncias route={mockRoute} />);
    const input = getByLabelText('Descripción');
    fireEvent.change(input, { target: { value: 'Nuevo reporte de incidencia' } });
    const form = getByTestId('formulario-registro');
    fireEvent.submit(form);
    // Aquí podrías verificar si se manipulan correctamente los datos del input
  });
  
  

// Más pruebas...
