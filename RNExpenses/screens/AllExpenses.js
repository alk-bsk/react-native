import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

export default function AllExpenses() {
    const expenseCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total"
            fallbackText="No registered expense found." />
    )
}
