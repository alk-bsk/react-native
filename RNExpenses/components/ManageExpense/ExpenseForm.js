import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { GlobalStyle } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';
import Input from './Input';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        },
    });



    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs(pre => {
            return {
                ...pre,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check your input values');
            setInputs(pre => {
                return {
                    amount: { value: pre.amount.value, isValid: amountIsValid },
                    date: { value: pre.date.value, isValid: dateIsValid },
                    description: { value: pre.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount"
                style={styles.rowInput}
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }} />
            <Input label="Date"
                style={styles.rowInput}
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} />
        </View>
        <Input label="Description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                //autoCorrect: false,
                //autoCapitalize: 'none'
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
        {formIsInvalid &&
            <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
        <View style={styles.buttons}>
            <Button mode='flat' style={styles.button} onPress={onCancel} >Cancel</Button>
            <Button style={styles.button} onPress={submitHandler} >{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyle.colors.error500,
        margin: 8
    }
});