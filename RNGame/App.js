import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constancts/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRound] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(noOfRounds) {
    setGameIsOver(true);
    setGuessRound(noOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRound();
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber}
      roundNumber={guessRounds}
      onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[Colors.primary800, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/images/background.jpg')}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
