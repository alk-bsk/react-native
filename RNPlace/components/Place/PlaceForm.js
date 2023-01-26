import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { useCallback, useState } from 'react';
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from '../../modules/place';

export default function PlaceForm({ onCreatePlace }) {
    const [enteredTitle, setEnteredTitle] = useState();
    const [pickedLocaiton, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }
    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);
    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectedImage, pickedLocaiton);
        onCreatePlace(placeData);
    }

    return (<ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler}
                value={enteredTitle} />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>);
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderWidth: 2,
        backgroundColor: Colors.primary200
    }
});