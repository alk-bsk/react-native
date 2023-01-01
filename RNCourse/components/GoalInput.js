import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';

export default function GoalInput({ onAddGoal, visible, onCancel }) {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    function goalnputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler() {
        onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/goal.png')} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Your course goal!'
                    value={enteredGoalText}
                    onChangeText={goalnputHandler}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color="#b180f0" />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={onCancel} color="#f31282" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    button: {
        marginHorizontal: 8,
        width: '50%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 8,
        width: '100%',
        padding: 15,
        color: '#120438'
    },
    image: {
        width: 200,
        height: 100,
        margin: 10
    }
});
