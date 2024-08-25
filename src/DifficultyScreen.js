import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';

const DifficultyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image 
          source={require('../assets/logo3.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation('Game', { difficulty: "easy" })}>
          <Text style={styles.buttonText}>Easy</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation('Game', { difficulty: "medium" })}>
          <Text style={styles.buttonText}>Medium</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation('Game', { difficulty: "hard" })}>
          <Text style={styles.buttonText}>Hard</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation('Home')}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default DifficultyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000028',
  },
  titleContainer: {
    marginTop: 150,
    marginBottom: 32,
  },
  logo: {
    width: 200, // Adjust as necessary
    height: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '80%', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    fontFamily: 'Roboto',
  },
});
