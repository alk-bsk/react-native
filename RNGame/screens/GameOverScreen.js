import { Image, StyleSheet, View, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constancts/colors";

function GameOverScreen({ roundNumber, userNumber, onStartNewGame }) {
    return <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/images/success.png')} />
        </View>
        <Text style={styles.summaryText}>Your Phone needed
            <Text style={styles.highlight}> {roundNumber} </Text> rounds to guess the number
            <Text style={styles.highlight}> {userNumber} </Text>.</Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: Colors.primary800,
        borderWidth: 3,
        overflow: "hidden",
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});