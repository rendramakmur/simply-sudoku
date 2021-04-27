import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import ColInput from './ColInput'

export default function RowInput(props) {
  const { board, indexI } = props
  return (
    <View style={styles.containerGrid}>
      {
        board.map((input, i) => (
          <ColInput input={input} key={i} indexJ={i} indexI={indexI}></ColInput>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  containerGrid: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});