import { AddIcon, View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { ImageBackground} from 'react-native';
import Color from '../Assets/Utilities/Color';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <CustomImage source={require('../Assets/Images/logo.png')} />
    </View>
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
