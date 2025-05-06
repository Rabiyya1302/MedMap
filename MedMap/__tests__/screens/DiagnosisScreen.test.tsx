import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DiagnosisScreen } from '../../app/DiagnosisScreen';
import { DiagnosisProvider } from '../../context/DiagnosisContext';
import { AlertProvider } from '../../context/AlertContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

describe('DiagnosisScreen', () => {
  const renderScreen = () => {
    return render(
      <NavigationContainer>
        <ThemeProvider>
          <AlertProvider>
            <DiagnosisProvider>
              <DiagnosisScreen />
            </DiagnosisProvider>
          </AlertProvider>
        </ThemeProvider>
      </NavigationContainer>
    );
  };

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderScreen();
    
    expect(getByText('Symptom Diagnosis')).toBeTruthy();
    expect(getByPlaceholderText('Enter symptoms...')).toBeTruthy();
    expect(getByText('Add Symptom')).toBeTruthy();
    expect(getByText('Get Diagnosis')).toBeTruthy();
  });

  it('allows adding symptoms', () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderScreen();
    
    const input = getByPlaceholderText('Enter symptoms...');
    fireEvent.changeText(input, 'fever');
    
    const addButton = getByText('Add Symptom');
    fireEvent.press(addButton);
    
    expect(getByTestId('symptom-tag-fever')).toBeTruthy();
  });

  it('submits diagnosis request', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderScreen();
    
    const input = getByPlaceholderText('Enter symptoms...');
    fireEvent.changeText(input, 'fever');
    
    const addButton = getByText('Add Symptom');
    fireEvent.press(addButton);
    
    const submitButton = getByText('Get Diagnosis');
    fireEvent.press(submitButton);
    
    await waitFor(() => {
      expect(getByText('Influenza')).toBeTruthy();
      expect(getByText('85% confidence')).toBeTruthy();
    });
  });

  it('handles empty symptoms submission', async () => {
    const { getByText, queryByText } = renderScreen();
    
    const submitButton = getByText('Get Diagnosis');
    fireEvent.press(submitButton);
    
    await waitFor(() => {
      expect(queryByText('Please add at least one symptom')).toBeTruthy();
    });
  });

  it('allows removing symptoms', () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByTestId } = renderScreen();
    
    const input = getByPlaceholderText('Enter symptoms...');
    fireEvent.changeText(input, 'fever');
    
    const addButton = getByText('Add Symptom');
    fireEvent.press(addButton);
    
    const removeButton = getByTestId('remove-symptom-fever');
    fireEvent.press(removeButton);
    
    expect(queryByTestId('symptom-tag-fever')).toBeNull();
  });
}); 