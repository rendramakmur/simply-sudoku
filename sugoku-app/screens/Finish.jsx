import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import LeaderboardsList from '../components/LeaderboardsList'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

export default function Finish () {
  const leaderboards = useSelector(state => state.leaderboardsReducer.leaderboards)
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold
  })

  const newLeaderboards = JSON.parse(JSON.stringify(leaderboards))
  const sortedLeaderboards = newLeaderboards.sort((a,b) => {
    return b.points-a.points
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24, marginVertical: 5, fontFamily: 'Inter_900Black'}}>
          Leaderboards
        </Text>
        <Text style={{ color: 'white', fontSize: 20, marginVertical: 5, fontFamily: 'Inter_800ExtraBold'}}>
          Top 5
        </Text>
        {
          leaderboards.length !== 0 ?
          sortedLeaderboards.map((data, i) => (
            <LeaderboardsList data={data} key={i} index={i}/>
          ))
          :
          <Text style={{fontSize: 16, fontFamily: 'Inter_500Medium', textAlign: 'center', marginHorizontal: 30, marginVertical: 20}}>Leaderboards is empty, let's play and write your record here!</Text>
        }
  
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
  }
});