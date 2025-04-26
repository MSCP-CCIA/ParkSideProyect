import React, { FC, useState } from 'react';
import { View, Text, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface ValidatedTextInputProps {
    label: string;
    placeholder?: string;
    keyboardType?: any;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    validationRules?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: string) => string | null;
    };
    style?: StyleProp<TextStyle>;
    editable?: boolean;
    forceValidate?: boolean;
}

const ValidatedTextInput: FC<ValidatedTextInputProps> = ({
                                                             label,
                                                             placeholder,
                                                             keyboardType,
                                                             secureTextEntry,
                                                             value,
                                                             onChangeText,
                                                             validationRules = {},
                                                             style,
                                                             editable = true,
                                                             forceValidate = false,
                                                         }) => {
    const [error, setError] = useState<string | null>(null);

    const validate = (text: string) => {
        let currentError: string | null = null;

        if (validationRules.required && !text.trim()) {
            currentError = `${label} es requerido.`;
        } else if (validationRules.minLength && text.length < validationRules.minLength) {
            currentError = `${label} debe tener mínimo ${validationRules.minLength} caracteres.`;
        } else if (validationRules.maxLength && text.length > validationRules.maxLength) {
            currentError = `${label} debe tener máximo ${validationRules.maxLength} caracteres.`;
        } else if (validationRules.pattern && !validationRules.pattern.test(text)) {
            currentError = `Formato inválido para ${label}.`;
        } else if (validationRules.custom) {
            const customError = validationRules.custom(text);
            if (customError) currentError = customError;
        }

        setError(currentError);
    };

    React.useEffect(() => {
        if (forceValidate) {
            validate(value);
        }
    }, [forceValidate]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    style,
                    error ? styles.errorInput : null
                ]}
                placeholder={placeholder}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => {
                    onChangeText(text);
                    validate(text);
                }}
                editable={editable}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
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
        color: 'black',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'white',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default ValidatedTextInput;
