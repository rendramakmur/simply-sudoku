import React from 'react'
import { StyleSheet, ActivityIndicator, Text, View, Dimensions } from 'react-native';
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

export default function LeaderboardsList (props) {
  const { data, index } = props
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <View style={
        index === 0 ?
        { width: Dimensions.get('window').width / 1.1, height: Dimensions.get('window').height / 10, borderRadius: 5, borderWidth: 4, borderColor: 'gold',  alignItems: 'center', justifyContent: 'center', marginVertical: 5}
        :
        index === 1 ?
        { width: Dimensions.get('window').width / 1.1, height: Dimensions.get('window').height / 10, borderRadius: 5, borderWidth: 4, borderColor: 'silver',  alignItems: 'center', justifyContent: 'center', marginVertical: 5}
        :
        index === 2 ?
        { width: Dimensions.get('window').width / 1.1, height: Dimensions.get('window').height / 10, borderRadius: 5, borderWidth: 4, borderColor: '#cd7f32',  alignItems: 'center', justifyContent: 'center', marginVertical: 5}
        :
        { width: Dimensions.get('window').width / 1.1, height: Dimensions.get('window').height / 10, borderRadius: 5, borderWidth: 1, borderColor: 'white',  alignItems: 'center', justifyContent: 'center', marginVertical: 5}
        }>
        <Text style={{ color: 'white', fontFamily: 'Inter_900Black', fontSize: 16, marginVertical: 5 }}>
          {data.name}
        </Text>
        <Text style={{ color: 'white', fontSize: 14, marginVertical: 5, fontFamily: 'Inter_500Medium' }}>
          Points: {data.points} | Finished On: {data.timeFinished} | Difficulty: {data.difficulty} 
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});