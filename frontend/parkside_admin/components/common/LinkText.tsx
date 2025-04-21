import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface LinkTextProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const LinkText: FC<LinkTextProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#1976D2',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default LinkText;