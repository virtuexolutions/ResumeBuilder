import { AddIcon, View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { ImageBackground, SafeAreaView } from 'react-native';
import Color from '../Assets/Utilities/Color';

const SplashScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <CustomImage source={require('../Assets/Images/logo.png')} />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: Color.white
  },
  text: {
    fontSize: moderateScale(30, 0.3),
    color: Color.white
  },
  logoStyle: {
    // flexDirection: 'row',
    width: windowWidth * 0.8,
    height: windowWidth * 0.3,
    backgroundColor: "red"
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default SplashScreen;
