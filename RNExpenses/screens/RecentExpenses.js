import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

export default function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expenseCtx = useContext(ExpensesContext);


    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (err) {
                setError('Could not fetch ecpenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, [])

    function errorHandler() {
        setError();
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expenseCtx.expenses.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date >= date7DaysAgo && expense.date <= today);
    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days"
            fallbackText="No expenses registered for the last 7 days." />
    )
}
