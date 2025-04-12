import React, { FC } from 'react';
import { TextInput, View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  type?: 'email' | 'password' | 'text' | 'tel';
  maxLength?: number;
  errorMessage?: string | null; // Nuevo prop para recibir el mensaje de error
}

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  maxLength,
  errorMessage,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errorMessage && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        {...rest}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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