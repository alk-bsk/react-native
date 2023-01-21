import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyle } from '../../constants/styles';
import Button from './Button';

export default function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
