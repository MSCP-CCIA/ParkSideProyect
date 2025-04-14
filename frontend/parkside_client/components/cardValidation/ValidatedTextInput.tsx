
import React, { FC, useState } from 'react';
import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

 interface ValidatedTextInputProps {
   label: string;
   placeholder?: string;
   keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad' | 'number' | 'decimal-pad' | 'numeric';
   secureTextEntry?: boolean;
   value: string;
   onChangeText: (text: string) => void;
   validationRules?: {
     required?: boolean;
     minLength?: number;
     maxLength?: number;
     pattern?: RegExp;
     custom?: (value: string) => string | null; // Retorna null si es válido, error si no
   };
   style?: StyleProp<ViewStyle | TextStyle>; // Agrega la propiedad style aquí
 }

 const ValidatedTextInput: FC<ValidatedTextInputProps> = ({
   label,
   placeholder,
   keyboardType,
   secureTextEntry,
   value,
   onChangeText,
   validationRules = {},
   style, // Recibe la propiedad style
 }) => {
   const [error, setError] = useState<string | null>(null);

   const handleTextChange = (text: string) => {
     onChangeText(text);
     validate(text);
   };

   const validate = (text: string) => {
     let currentError: string | null = null;

     if (validationRules.required && !text.trim()) {
       currentError = `${label} is required.`;
     } else if (validationRules.minLength && text.length < validationRules.minLength) {
       currentError = `${label} must be at least ${validationRules.minLength} characters.`;
     } else if (validationRules.maxLength && text.length > validationRules.maxLength) {
       currentError = `${label} must not exceed ${validationRules.maxLength} characters.`;
     } else if (validationRules.pattern && !validationRules.pattern.test(text)) {
       currentError = `Invalid format for ${label}.`;
     } else if (validationRules.custom) {
       const customError = validationRules.custom(text);
       if (customError) {
         currentError = customError;
       }
     }

     setError(currentError);
   };

   return (
     <View style={[styles.container]}> {/* Aplica el estilo recibido al contenedor */}
       <Text style={styles.label}>{label}</Text>
       <TextInput
         style={styles.input}
         placeholder={placeholder}
         keyboardType="number-pad"
         secureTextEntry={secureTextEntry}
         value={value}
         onChangeText={handleTextChange}
         onBlur={() => validate(value)} // Valida al perder el foco
       />
       {error && <Text style={styles.error}>{error}</Text>}
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     width: '100%',
     marginBottom: 15,
   },
   label: {
     fontSize: 16,
     fontWeight: 'bold',
     color: 'black',
     marginBottom: 5,
   },
   input: {
     borderWidth: 1,
     borderColor: '#ccc',
     borderRadius: 5,
     padding: 10,
     fontSize: 16,
     color: 'black',
   },
   error: {
     color: 'red',
     fontSize: 12,
     marginTop: 3,
   },
 });

 export default ValidatedTextInput;