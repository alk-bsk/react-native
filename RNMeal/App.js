import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverview from './screens/MealsOverview';
import MealDetailScreen from './screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
// import FavoritesContextProvider from './store/context/favorites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator
    useLegacyImplementation={true}
    screenOptions={{
      headerStyle: { backgroundColor: '#613014' },
      headerTintColor: 'white',
      // sceneContainerStyle: { backgroundColor: '#3f2f25' },
      drawerContentStyle: { backgroundColor: '#613014' },
      drawerInactiveTintColor: 'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#e4baa1'
    }}>
    <Drawer.Screen name="Categories" component={CategoriesScreen}
      options={{
        title: 'All Categories',
        drawerIcon: ({ color }) => <Ionicons name='list' color={color} />
      }} />
    <Drawer.Screen name="Favorites" component={FavoritesScreen}
      options={{
        drawerIcon: ({ color }) => <Ionicons name='star' color={color} />
      }}
    />

  </Drawer.Navigator>
}


export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#613014' },
            headerTintColor: 'white',
            // contentStyle: { backgroundColor: '#3f2f25' }
          }}>
            <Stack.Screen name='Drawer'
              component={DrawerNavigator}
              options={{
                headerShown: false
              }} />
            <Stack.Screen name="MealsOverview" component={MealsOverview}
            // options={({ route, navigation }) => {
            //   const catId = route.params.categoryId;
            //   return {
            //     title: catId
            //   }
            // }} 
            />
            <Stack.Screen name="MealDetails" component={MealDetailScreen}
              options={{
                title: 'About the Meal'
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}
