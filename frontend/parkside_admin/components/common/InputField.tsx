import React from 'react';
import { Text, TextInput, View, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
    label: string;
    errorMessage?: string | null;
    type?: 'email' | 'password' | 'text' | string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   errorMessage,
                                                   type = 'text',
                                                   secureTextEntry,
                                                   ...props
                                               }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    errorMessage ? styles.inputError : {},
                ]}
                secureTextEntry={type === 'password' ? true : secureTextEntry}
                {...props}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        alignSelf: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1076BE',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default InputField;
