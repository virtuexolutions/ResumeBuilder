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
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';

import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { Formik } from 'formik';
import { forgotpassword } from '../Constant/schema';
import { mode } from 'native-base/lib/typescript/theme/tools';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const { user_type } = useSelector(state => state.authReducer);
  const email = props?.route?.params?.email;
  console.log('🚀 ~ ResetPassword ~ email===================:', email);

  const navigationN = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    const url = 'password/reset';
    const data = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    setIsLoading(true);
    const response = await Post(url, data, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`Password Reset SuccessFully`, ToastAndroid.SHORT)
        : alert(`Password Reset SuccessFully`);
      navigationN.navigate('LoginScreen');
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.back}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(30, 0.3)}
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
            iconSize={moderateScale(20, 0.3)}
            iconName={'key'}
            iconType={Ionicons}
            color={Color.themeBlue}
            secureText={true}
            setText={setPassword}
            value={password}
            placeholder={'Password'}
            viewWidth={0.86}
            border={1}
            placeholderColor={Color.grey}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={moderateScale(10, 0.6)}
            backgroundColor={Color.lightGrey}
          />
          <TextInputWithTitle
            iconSize={moderateScale(20, 0.3)}
            iconName={'key'}
            iconType={Ionicons}
            color={Color.themeBlue}
            secureText={true}
            setText={setConfirmPassword}
            value={confirmPassword}
            placeholder={'Confirm New Password'}
            viewWidth={0.86}
            border={1}
            placeholderColor={Color.grey}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={moderateScale(10, 0.6)}
            backgroundColor={Color.lightGrey}
          />

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                'Reset'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.86}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            onPress={resetPassword}
            borderRadius={moderateScale(10, 0.6)}
            bgColor={Color.themeBlue}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6)
  },
  txt2: {
    color: Color.themeBlue,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.veryLightGray,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'left',
    width: '90%',
    marginVertical: moderateScale(10, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back: {
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
  },
  container: {
    alignItems: 'flex-start',
    marginTop: moderateScale(20, 0.6)
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    alignSelf: 'flex-start',
  },
});

export default ResetPassword;
