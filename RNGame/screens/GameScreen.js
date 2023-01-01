import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstuctionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRound, setGuessRound] = useState([]);

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRound.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) {

        if ((direction === 'lower' && currentGuess < userNumber)
            || (direction === 'greater' && currentGuess > userNumber)
            || (currentGuess < 0 || currentGuess > 99)) {
            Alert.alert("Don't lie!", "You know that this is wrong...",
                [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRound(pre => [newRndNumber, ...pre]);
    }

    const guessRoundsListLength = guessRound.length;

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstuctionText style={styles.instuctionText}>
                Higher or Lower?
            </InstuctionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color="white" />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 300) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color="white" />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>
                Opponent's Guess
            </Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRound}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%'
    },
    instuctionText: {
        marginBottom: 12
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16

    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignContent: 'center'
    }
});