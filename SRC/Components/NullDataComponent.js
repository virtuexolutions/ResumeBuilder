import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'

const NullDataComponent = ({height , width , title}) => {
  return (
    <View
    style={{
      height: height ? height : windowHeight * 0.5,
      width: width ? width : windowWidth,
      justifyContent: 'center',
    //   backgroundColor : 'red'
    }}>
        <CustomText isBold style={{
            fontSize : moderateScale(15,0.6),
            color : Color.black,
            textAlign : 'center',
            // backgroundColor : 'green'
        }} >{title}</CustomText>
    <CustomImage
      source={require('../Assets/Images/notFound.jpg')}
      style={{
        alignSelf : 'center',
        width : '60%',
        height : '60%',
        // backgroundColor : 'yellow'
      }}
    />
  </View>
  )
}

export default NullDataComponent

const styles = StyleSheet.create({})