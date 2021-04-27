import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import {
  useFonts,
  Inter_500Medium,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export default function Home (props) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_800ExtraBold,
    Inter_900Black
  })
  
  const { navigation } = props

  const handleOnClick = (difficulty) => {
    if (!name) {
      alert('Please enter your name')
    } else if (!difficulty) {
      alert('Please select the difficulty')
    } else {
      navigation.navigate('Simply Sudoku', {
        name: name,
        difficulty: difficulty
      })
      setName('')
      setDifficulty('')
    }
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 30}}>
          <Text style={styles.title}>SIMPLY</Text>
          <Text style={styles.title}>SUDOKU</Text>
        </View>
        
        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Inter_500Medium', height: 30, width: 200, borderRadius: 5, textAlign: 'center'}}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor= "black"
          />
        </View>

        <Text style={{ color: 'white', fontFamily: 'Inter_800ExtraBold' }}>Select Difficulty</Text>
  
        <View style={{ marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <Button
              title="Easy"
              onPress={() => handleOnClick('easy')}
              color="grey"
              style={{  }}
            />
          </View>

          <View style={{marginHorizontal: 5}}>
            <Button
              title="Medium"
              onPress={() => handleOnClick('medium')}
              color="grey"
            />
          </View>

          <View style={{marginHorizontal: 5}}>
            <Button
              title="Hard"
              onPress={() => handleOnClick('hard')}
              color="grey"
            />
          </View>

          <View style={{marginHorizontal: 5}}>
            <Button
              title="Random"
              onPress={() => handleOnClick('random')}
              color="grey"
            />
          </View>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontFamily: 'Inter_900Black',
    color: 'white',
    textAlign: 'center',
    fontSize: 32
  }
});