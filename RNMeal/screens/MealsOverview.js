import React, { useLayoutEffect } from 'react'
import MealsList from '../components/MealsList/MealsList';
import { CATEGORIES, MEALS } from '../data/dummy-data';

export default function MealsOverview({ route, navigation }) {
    const catId = route.params.categoryId;

    const displayMeals = MEALS.filter((mealItem) => mealItem.categoryIds.indexOf(catId) >= 0);

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
        navigation.setOptions({ title: categoryTitle });
    }, [catId, navigation])
    return <MealsList items={displayMeals} />

}

