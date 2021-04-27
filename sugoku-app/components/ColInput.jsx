import React, { useState, useEffect } from 'react'
import { TextInput, Dimensions, ActivityIndicator, View } from 'react-native';
import { setValueBoards } from '../store/actions'
import { useDispatch } from 'react-redux'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

export default function ColInput(props) {
  const [value, setValue] = useState('')
  const { input, indexI, indexJ } = props
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold
  })
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setValue(e.replace(/[^0-9]/g, ''))
  }

  useEffect(() => {
    if (input === 0) {
      dispatch(setValueBoards(indexI, indexJ, Number(value)))
    }
  }, [value])
  
  return (
    <TextInput
      maxLength={1}
      style={(indexI) % 3 === 0 && (indexJ) % 3 === 0 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderTopWidth: 5, borderLeftWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 8 && (indexJ) === 0 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderBottomWidth: 5, borderLeftWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 8 && (indexJ) === 3 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderBottomWidth: 5, borderLeftWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 8 && (indexJ) === 6 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderBottomWidth: 5, borderLeftWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 8 && (indexJ) === 8 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderBottomWidth: 5, borderRightWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 0 && (indexJ) === 8 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderTopWidth: 5, borderRightWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 3 && (indexJ) === 8 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderTopWidth: 5, borderRightWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 6 && (indexJ) === 8 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderTopWidth: 5, borderRightWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) % 3 === 0 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderTopWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexJ) % 3 === 0 ?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderLeftWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexJ) === 8?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderRightWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        (indexI) === 8?
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', borderBottomWidth: 5, borderColor: 'white', backgroundColor: 'black', color: 'white', fontFamily: 'Inter_800ExtraBold'}
        :
        { height: Dimensions.get("window").width / 13 , width: Dimensions.get("window").width / 13 , borderColor: 'gray', borderWidth: 1, textAlign: 'center', backgroundColor: 'black', color: 'white', borderColor: 'white', fontFamily: 'Inter_800ExtraBold'}}
      value={input === 0 ? value.toString() : input.toString()}
      editable={input === 0 ? true : false}
      onChangeText={(e) => handleInputChange(e)}
    />
  )
}