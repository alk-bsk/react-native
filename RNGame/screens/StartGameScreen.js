import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Card from '../components/ui/Card';
import InstuctionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constancts/colors';

function StartGameScreen({ onPickNumber }) {
    const [enterNumber, setEnterNumber] = useState('');

    const { width, height } = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnterNumber(enteredText);
    }

    function resetInputHandler() {
        setEnterNumber('');
    }

    function confirmInputHandler() {
        const choserNumber = parseInt(enterNumber);
        if (isNaN(choserNumber) || choserNumber <= 0 || choserNumber > 99) {
            Alert.alert('Invalid number',
                'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }
        onPickNumber(choserNumber);
    }

    const marginTopDistance = height < 400 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContaner, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card style={styles.inputContainer}>
                        <InstuctionText>
                            Enter a Number
                        </InstuctionText>
                        <TextInput style={styles.numberInput} maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={enterNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContaner: {
        flex: 1,
        margin: 20,
        alignItems: 'stretch',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%'
    },
    buttonContainer: {
        flex: 1
    }
})
