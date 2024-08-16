// src/Fireworks.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Fireworks from 'react-native-fireworks';

const FireworksComponent = ({ show }) => {
  return (
    show && (
      <View style={styles.container}>
        <Fireworks
          autoStart={true}  // Automatically start fireworks when component is rendered
          loop={false}      // Do not loop the animation
          speed={2}         // Adjust speed of animation
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    pointerEvents: 'none', // Ensures fireworks do not block touch events
  },
});

export default FireworksComponent;
