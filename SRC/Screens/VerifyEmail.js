import React, { useState } from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';


const VerifyEmail = props => {
  const dispatch = useDispatch();
  const navigationN = useNavigation();
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async values => {
    console.log('asdhkasdjagsdjags');
    const url = 'password/email';
    if (!email.includes("@")) {
      return ToastAndroid.show("Email is invalid", ToastAndroid.SHORT);
    }

    setIsLoading(true);
    const response = await Post(url, { email: email }, apiHeader());
    setIsLoading(false);
    console.log('response data =========================>', response?.data);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);
      navigationN.navigate('VerifyNumber', {
        code: response?.data?.data[0]?.code,
        email: response?.data?.data[0]?.email
      });
    }
  };

  return (
    <ImageBackground source={require('../Assets/Images/background_image.png')}
      style={styles.gradient}
    >
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity
          onPress={() => {
            navigationN.goBack();
          }}
          activeOpacity={0.8}
          style={styles.back}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(24, 0.3)}
            color={Color.themeBlue}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Forget Password
          </CustomText>
          <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and
            create your new password!
          </CustomText>
          <TextInputWithTitle
            iconName={'mail'}
            iconType={Ionicons}
            color={Color.themeBlue}
            setText={setEmail}
            value={email}
            placeholder={'Type your Email'}
            viewWidth={0.9}
            placeholderColor={Color.veryLightGray}
            backgroundColor={'rgba(211, 211, 211, 0.4)'}
            borderRadius={moderateScale(10, 0.6)}
            viewHeight={0.07}
            marginTop={moderateScale(10, 0.3)}
            borderBottomWidth={2}
            borderColor={Color.blue}
          />
          <CustomButton
            text={isLoading ? <ActivityIndicator size={'small'} color={Color.white} /> : 'submit'}
            textColor={Color.white}
            width={windowWidth * 0.86}
            height={windowHeight * 0.07}
            marginTop={moderateScale(40, 0.3)}
            onPress={sendOTP}
            borderRadius={moderateScale(10, 0.6)}
            bgColor={Color.themeBgColor}
            isGradient
          />
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  gradient: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_container: {
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: moderateScale(20, 0.6),
    marginTop: moderateScale(15, 0.6)
  },
  txt2: {
    color: Color.blue,
    fontSize: moderateScale(24, 0.6),
    marginTop: moderateScale(20, 0.6)
  },
  txt3: {
    color: Color.black,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'left',
    width: '90%',
    marginVertical: moderateScale(15, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back: {
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: moderateScale(20, 0.6)
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    // backgroundColor: 'green',
    alignSelf: 'flex-start',
  },
});

export default VerifyEmail;
