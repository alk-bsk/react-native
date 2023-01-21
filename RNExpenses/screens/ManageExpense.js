import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyle } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

export default function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditng = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditng ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditng])

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (err) {
            setError('Could not delete expenses - please try again later!');
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditng) {
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (err) {
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={() => setError()} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler}
                submitButtonLabel={isEditng ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditng && <View style={styles.deleteContainer}>
                <IconButton icon="trash" color={GlobalStyle.colors.error500} size={36}
                    onPress={deleteExpenseHandler} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary800
    },
    deleteContainer: {
        margin: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: 'center'
    }
});
