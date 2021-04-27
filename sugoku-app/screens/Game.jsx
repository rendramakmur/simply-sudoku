import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import RowInput from '../components/RowInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoardsAsync, solveBoardsAsync, validateBoardsAsync, addLeaderboards, fetchBoardsDifficultyAsync, setStartTimer, validateBoards } from '../store/actions';
import useTimer from '../helpers/customHooks/timer';
import convertPoints from '../helpers/convertPoints';
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

export default function Game(props) {
  const [timesUp, setTimesUp] = useState(false)
  const { navigation } = props
  const { name, difficulty } = props.route.params
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold
  })

  const boards = useSelector(state => state.boardReducer.boards)
  const validate = useSelector(state => state.boardReducer.validate)
  const startTimer = useSelector(state => state.boardReducer.startTimer)
  const loading = useSelector(state => state.boardReducer.isLoading)
  const validateLoading = useSelector(state => state.boardReducer.validateLoading)
  const solveLoading = useSelector(state => state.boardReducer.solveLoading)
  const dispatch = useDispatch()
  
  const timer = useTimer(300, startTimer)

  useEffect(() => {
    dispatch(fetchBoardsDifficultyAsync(difficulty))
  }, [])

  useEffect(() => {
    if (timer === '00:00') {
      alert('Time is out!')
      setTimesUp(true)
    }
  }, [timer])

  const handleValidate = () => {
    dispatch(validateBoardsAsync())
  }

  const handleSolveBoards = () => {
    dispatch(solveBoardsAsync())
  }

  const handleSubmit = () => {
    if (validate === 'solved') {
      let userPoints = convertPoints(timer)
      let user = {
        name: name,
        difficulty: difficulty,
        timeFinished: timer,
        points: userPoints
      }

      dispatch(addLeaderboards(user))
      dispatch(setStartTimer(false))
      dispatch(validateBoards('unsolved'))
      dispatch(fetchBoardsAsync())
      navigation.replace('Finish')

    } else {
      alert(`The board status ${validate}`)
    }
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 20, textAlign: 'center', color: 'white', fontFamily: 'Inter_900Black'}}>{`Goodluck, ${name}!`}</Text>
        <Text style={{marginBottom: 20, textAlign: 'center', color: 'white', fontFamily: 'Inter_900Black', fontSize: 23}}>{timer}</Text>
        {
          loading ?
          <>
            <ActivityIndicator style={{marginVertical: 100}}/>
          </>
          :
          boards.map((board, i) => (
            <RowInput board={board} key={i} indexI={i} ></RowInput>
          ))
        }
  
        <View style={{marginTop: 20}}>
          <Text style={{color: 'white', marginBottom: 5, textAlign: 'center', fontFamily: 'Inter_900Black'}}>Status: {validate.toUpperCase()}</Text>
        </View>
  
        {
          timesUp ?
            <View style={{marginTop: 10}}>
                <Button
                  title="Game Over"
                  onPress={() => navigation.replace('Finish')}
                  color="grey"
                />
            </View>
          :
          <>
            {
              validateLoading ?
              <>
                <ActivityIndicator style={{marginTop: 20}}/>
              </>
              :
              <View style={{marginTop: 20}}>
                <Button
                  title="Validate"
                  onPress={() => handleValidate()}
                  color="grey"
                />
              </View>
            }
  
            {
              solveLoading ?
              <>
                <ActivityIndicator style={{marginTop: 10}}/>
              </>
              :
              <View style={{marginTop: 10}}>
                <Button
                  title="Solve"
                  onPress={() => handleSolveBoards()}
                  color="grey"
                />
              </View>
            }
  
            <View style={{marginTop: 10}}>
              <Button
                title="Submit"
                onPress={() => handleSubmit()}
                color="grey"
              />
            </View>
          </>
        }
  
        <StatusBar style="auto" />
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