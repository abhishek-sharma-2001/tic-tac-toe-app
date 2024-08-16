import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Box = ({ no, boxInfo, chance, winner, winningBoxes }) => {
  const { isXChance, setIsXChance } = chance;
  const { boxes, setBoxes } = boxInfo;
  const player = isXChance ? 'X' : 'O';

  const isWinningBox = winningBoxes.includes(no);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (boxes[no] === null && winner === null) {
          setBoxes((prevBoxInfo) => {
            const newBoxes = [...prevBoxInfo];
            newBoxes[no] = player;
            return newBoxes;
          });
          setIsXChance((prevState) => !prevState);
        }
      }}
    >
      {boxes[no] !== null ? (
        <View style={[styles.boxView, isWinningBox && styles.winningBox]}>
          {boxes[no] === 'X' ? (
            <Entypo name="cross" size={68} color="brown" />
          ) : (
            <Entypo name="circle" size={68} color="purple" />
          )}
        </View>
      ) : (
        <View style={styles.boxView}></View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default Box;

const styles = StyleSheet.create({
  boxView: {
    minWidth: 110,
    minHeight: 110,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winningBox: {
    backgroundColor: 'green',
  },
});
