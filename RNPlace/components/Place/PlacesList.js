import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlacesList({ places }) {

    const navigation = useNavigation();

    function selectPlaceHandler(id) {
        navigation.navigate('PlaceDetails', {
            placeId: id
        })
    }

    if (!places || places.length === 0) {
        return <View style={styles.fallbackCOntainer}>
            <Text style={styles.fallbackText}>No Places added yet - start adding now.</Text>
        </View>
    }

    return <FlatList style={styles.list} data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item}
            onSelect={selectPlaceHandler} />}
    />
}

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallbackCOntainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})