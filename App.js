import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './src/HomeScreen';
import DifficultyScreen from './src/DifficultyScreen';
import Game from './src/Game'; // Import the new Game component

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [difficulty, setDifficulty] = useState(null); // To store selected difficulty

  if (currentScreen === 'Home') {
    return <HomeScreen navigation={setCurrentScreen} />;
  } else if (currentScreen === 'Difficulty') {
    return <DifficultyScreen navigation={(screen, params) => {
      setCurrentScreen(screen);
      // console.log(screen, params);
      if (params && params.difficulty) {
        setDifficulty(params.difficulty);
      }
    }} />;
  } else if (currentScreen === 'Game') {
    console.log('Navigating to Game with difficulty:', difficulty);
    return <Game difficulty={difficulty} onBack={() => {
       setDifficulty(null);
       setCurrentScreen('Home')} }
       />;
  }

  return null;
}

const styles = StyleSheet.create({
  // Add any global styles if needed
});
