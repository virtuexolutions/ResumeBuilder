import { AddIcon, View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { ImageBackground } from 'react-native';
import Color from '../Assets/Utilities/Color';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {

  return (
    <ImageBackground style={styles.container} source={require('../Assets/Images/background_image.png')}>
      <View style={styles.logoStyle}>
        <CustomImage source={require('../Assets/Images/logo.png')} style={styles.image} />
      </View>
      <CustomText style={styles.tagline}>
        A simple, secure way to onboard, manage documents, and request approvals.
      </CustomText>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#E6F4FF',
    paddingHorizontal: moderateScale(20, 0.6)
  },
  text: {
    fontSize: moderateScale(30, 0.3),
    color: Color.themeBlue,
  },
  logoStyle: {
    width: windowWidth * 0.65,
    height: windowWidth * 0.4,
    marginLeft: moderateScale(10, 0.6)
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  tagline: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: Color.black,
    lineHeight: moderateScale(16, 0.6),
    width: windowWidth * 0.7
  },
});

export default SplashScreen;
