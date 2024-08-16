import React from 'react';
import { View, Text, Pressable, StyleSheet,Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
        <Pressable style={styles.button} onPress={() => navigation('Local')}>
          <Text style={styles.buttonText}>Local Multiplayer</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation('Online')}>
          <Text style={styles.buttonText}>Online Multiplayer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000028',
  },
  titleContainer: {
    marginTop: 150, // Adjust this value to move the title further up or down
    marginBottom: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center', // Align buttons in the center horizontally
    width: '100%', // Make the button container take the full width
  },
  button: {
    width: '80%', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginVertical: 10,
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
