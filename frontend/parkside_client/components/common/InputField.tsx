import React, { FC, useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  type: 'email' | 'password'; // Nuevo prop para especificar el tipo de campo
  maxLength?: number; // Prop opcional para la longitud máxima
}

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  type,
  maxLength,
  ...rest
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null); // Limpiar el error al cambiar el valor
  }, [value]);

  const handleOnChangeText = (text: string) => {
    onChangeText(text);
    // Realizar verificaciones básicas en tiempo real
    if (type === 'email') {
      if (text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        setError('Introduce un correo electrónico válido.');
      } else if (maxLength && text.length > maxLength) {
        setError(`El correo electrónico no puede tener más de ${maxLength} caracteres.`);
      }
    } else if (type === 'password') {
      if (text && text.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
      } else if (maxLength && text.length > maxLength) {
        setError(`La contraseña no puede tener más de ${maxLength} caracteres.`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]} // Estilo de error condicional
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChangeText}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;