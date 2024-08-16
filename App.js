import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import Box from './src/Box';
import HomeScreen from './src/HomeScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home'); // Manage which screen to show
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningBoxes, setWinningBoxes] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const animationRef = useRef(null);

  const PlayBox = (no) => {
    return (
      <Box
        no={no}
        boxInfo={{ boxes, setBoxes }}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
        winningBoxes={winningBoxes}
      />
    );
  };

  const winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWin = () => {
    for (let i = 0; i < winPosition.length; i++) {
      const [a, b, c] = winPosition[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        setWinner(boxes[a]);
        setWinningBoxes([a, b, c]);
        setIsDraw(false);
        setShowAnimation(true);
        return;
      }
    }

    if (boxes.every((box) => box !== null) && winner === null) {
      setIsDraw(true);
    } else {
      setIsDraw(false);
    }
  };

  useEffect(() => {
    calculateWin();
    if (winner && animationRef.current) {
      console.log(`Player ${winner} wins! Playing animation.`);
      animationRef.current.play();
    }
  }, [boxes, winner]);

  const handleAnimationFinish = () => {
    setShowAnimation(false);
  };

  if (currentScreen === 'Home') {
    return <HomeScreen navigation={setCurrentScreen} />;
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" backgroundColor="white"/> */}
      <View style={styles.featureContainer}>
        {winner !== null ? (
          <Text style={[styles.primaryText, styles.winnerText]}>
            Player {winner} Wins
          </Text>
        ) : isDraw ? (
          <Text style={styles.primaryText}>It's a Draw!</Text>
        ) : (
          <Text style={styles.primaryText}>
            Chance:{" "}
            <Text style={{ color: isXChance ? "brown" : "purple" }}>
              {isXChance ? "X" : "O"}
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setCurrentScreen('Home'); // Navigate back to Home
          }}
        >
          <Text style={styles.text}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setBoxes(Array(9).fill(null));
            setIsXChance(true);
            setWinner(null);
            setIsDraw(false);
            setWinningBoxes([]);
            setShowAnimation(false);
          }}
        >
          <Text style={styles.text}>Play Again</Text>
        </Pressable>
      </View>

      {showAnimation && (
        <View style={styles.fireworkContainer}>
          <LottieView
            ref={animationRef}
            source={require('./assets/fireworks2.json')}
            loop={false}
            onAnimationFinish={handleAnimationFinish}
            style={styles.lottie}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000028',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBoard: {
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'orange',
  },
  rows: {
    flexDirection: 'row',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winnerText: {
    color: 'darkorange',
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  fireworkContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});
