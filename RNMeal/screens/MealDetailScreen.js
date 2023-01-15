import React, { useLayoutEffect } from 'react'
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../components/IconButton';
import MealDetails from '../components/MealDetails';
import List from '../components/MealDetals/List';
import Subtitle from '../components/MealDetals/Subtitle';
import { MEALS } from '../data/dummy-data';
// import { FavoritesContext } from '../store/context/favorites-context';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

export default function MealDetailScreen({ route, navigation }) {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            dispatch(removeFavorite({ id: mealId }));
            // favoriteMealsCtx.removeFavorite(mealId);
        } else {
            dispatch(addFavorite({ id: mealId }));
            // favoriteMealsCtx.addFavortite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton
                    icon={mealIsFavorite ? "star" : "star-outline"}
                    color='white'
                    onPress={changeFavoriteStatusHandler} />
            }
        });
    }, [navigation, changeFavoriteStatusHandler])
    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails duration={selectedMeal.duration}
                affordability={selectedMeal.affordability}
                complexity={selectedMeal.complexity}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%'
    },
    listOuterContainer: {
        alignItems: 'center'
    }
});
