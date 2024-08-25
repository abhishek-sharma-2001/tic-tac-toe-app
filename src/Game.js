import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import Box from './Box';

export default function Game({ difficulty, onBack }) {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningBoxes, setWinningBoxes] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const animationRef = useRef(null);
  const [isLocal, setIsLocal] = useState(difficulty === null);

  const PlayBox = (no) => (
    <Box
      no={no}
      boxInfo={{ boxes, setBoxes }}
      chance={{ isXChance, setIsXChance }}
      winner={winner}
      winningBoxes={winningBoxes}
    />
  );

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

  useEffect(() => {
    if (!isLocal && !isXChance && !winner && !isDraw) {
      setTimeout(() => {
        aiMove();
      }, 500);
    }
  },[isXChance, winner, isDraw]);
  const aiMove = () => {
    if (difficulty === "easy"){
      randomMove();
    } else if (difficulty === "medium"){
      mediumMove();
    } else if (difficulty === "hard"){
      hardMove();
    }
  };

  const randomMove = () => {
    const emptyIndices = boxes.map((value, index) => value === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex);
  };
  
  const mediumMove = () => {
    const winningMove = findWinningMove();
    if (winningMove !== null) {
      makeMove(winningMove);
      return;
    }
  
    const blockingMove = findBlockingMove();
    if (blockingMove !== null) {
      makeMove(blockingMove);
      return;
    }
  
    randomMove();
  };

  const minimax = (board, depth, isMaximizing) => {
    const scores = { X: 10, O: -10, draw: 0 };
    const winner = calculateWinner(board);
    if (winner) return scores[winner] - depth;
  
    if (board.every(box => box !== null)) return scores.draw;
  
    const emptyIndices = board.map((value, index) => value === null ? index : null).filter(index => index !== null);
    let bestScore = isMaximizing ? -Infinity : Infinity;
  
    for (const index of emptyIndices) {
      board[index] = isMaximizing ? 'X' : 'O';
      const score = minimax(board, depth + 1, !isMaximizing);
      board[index] = null;
  
      bestScore = isMaximizing
        ? Math.max(score, bestScore)
        : Math.min(score, bestScore);
    }
  
    return bestScore;
  };
  
  const findBestMove = () => {
    let bestMove = null;
    let bestScore = -Infinity;
  
    const emptyIndices = boxes.map((value, index) => value === null ? index : null).filter(index => index !== null);
  
    for (const index of emptyIndices) {
      boxes[index] = 'X'; // Assuming AI is X
      const score = minimax(boxes, 0, false);
      boxes[index] = null;
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  
    return bestMove;
  };
  
  const hardMove = () => {
    const bestMove = findBestMove();
    makeMove(bestMove);
  };

  const makeMove = (index) => {
    const newBoxes = [...boxes];
    newBoxes[index] = isXChance ? 'X' : 'O';
    setBoxes(newBoxes);
    setIsXChance(!isXChance);
  };
  
  const findWinningMove = () => {
    return findBestMoveForPlayer('X');
  };
  
  const findBlockingMove = () => {
    return findBestMoveForPlayer('O');
  };
  
  const findBestMoveForPlayer = (player) => {
    for (let i = 0; i < winPosition.length; i++) {
      const [a, b, c] = winPosition[i];
      if (boxes[a] === player && boxes[b] === player && boxes[c] === null) return c;
      if (boxes[a] === player && boxes[c] === player && boxes[b] === null) return b;
      if (boxes[b] === player && boxes[c] === player && boxes[a] === null) return a;
    }
    return null;
  };
  
  const calculateWinner = (board) => {
    for (let i = 0; i < winPosition.length; i++) {
      const [a, b, c] = winPosition[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };  

  const handleAnimationFinish = () => {
    setShowAnimation(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.featureContainer}>
        {winner !== null ? (
          <Text style={[styles.primaryText, styles.winnerText]}>
            Player {winner} Wins
          </Text>
        ) : isDraw ? (
          <Text style={styles.primaryText}>It's a Draw!</Text>
        ) : (
          <Text style={styles.primaryText}>
            Chance :{" "}
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
          onPress={onBack}
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
            source={require('../assets/fireworks2.json')}
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
