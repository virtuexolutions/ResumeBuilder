import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import { setUserToken } from '../Store/slices/auth';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const fromSignup = route?.params?.fromSignup;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user_type = useSelector(state => state.authReducer.role)
  console.log("🚀 ~ LoginScreen ~ user_type:", user_type)

  const Login = async () => {
    const url = "login";
    const body = {
      email: email,
      password: password,
    };
    console.log("🚀 ~ Login ~ body:", body)
    for (let key in body) {
      if (body[key] == "") {
        return ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    console.log("🚀 ~ Login ~ response:", response?.data?.user_info)
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({ token: response?.data?.token }));
    }
  }

  return (
    <SafeAreaView style={[styles.container, {
      backgroundColor: Color.white
    }]}>
      {fromSignup && <Icon
        onPress={() => {
          navigationService.goback();
        }}
        as={Ionicons}
        name="arrow-back"
        size={moderateScale(25, 0.3)}
        color={Color.blue}
        style={{
          position: 'absolute',
          top: moderateScale(20, 0.3),
          left: moderateScale(10, 0.3),
        }}
      />}
      <View style={{
        width: windowWidth * 0.6,
        height: windowWidth * 0.35,
      }}>
        <CustomImage source={require('../Assets/Images/logo.png')} style={{
          width: '100%',
          height: '100%'
        }} />
      </View>
      <TextInputWithTitle
        iconName={'mail'}
        iconType={Ionicons}
        color={Color.blue}
        setText={setEmail}
        value={email}
        placeholder={'Type your Email'}
        placeholderColor={Color.grey}
        viewWidth={0.75}
        borderBottomWidth={2}
        borderColor={Color.blue}
        marginTop={moderateScale(30, 0.3)}
      />
      <TextInputWithTitle
        iconSize={moderateScale(20, 0.3)}
        iconName={'key'}
        iconType={Ionicons}
        color={Color.blue}
        secureText={true}
        setText={setPassword}
        value={password}
        placeholder={'Password'}
        placeholderColor={Color.grey}
        viewWidth={0.75}
        borderBottomWidth={2}
        borderColor={Color.blue}
        marginTop={moderateScale(30, 0.3)}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("VerifyEmail")
        }}
        activeOpacity={0.8}
        style={{
          alignSelf: 'flex-end',
          marginTop: moderateScale(7, 0.2),
          right: moderateScale(42, 0.3),
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.3),
            color: Color.darkbrown,
            textDecorationLine: 'underline',
          }}>
          Forgot password
        </CustomText>
      </TouchableOpacity>
      <CustomButton
        text={isLoading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Log In'}
        width={windowWidth * 0.7}
        height={windowHeight * 0.060}
        borderRadius={moderateScale(20, 0.3)}
        textColor={Color.white}
        bgColor={Color.themeBlue}
        marginTop={moderateScale(20, 0.6)}
        onPress={() => {
          Login()
        }}
      />
      {user_type === 'Employee' ? <></>
        :
        <>
          <CustomText style={{
            fontSize: moderateScale(11, 0.3),
            color: Color.darkbrown,
            paddingTop: windowHeight * 0.05,

          }}>Don’t have an accout ?</CustomText>
          <TouchableOpacity activeOpacity={0.8}>
            <CustomText onPress={() => {
              navigation.navigate('SignupScreen')
            }}
              isBold style={{
                fontSize: moderateScale(18, 0.3),
                color: Color.blue,
              }}>Sign Up</CustomText>
          </TouchableOpacity></>
      }
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.3),
    // paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    paddingTop: windowHeight * 0.2,
    // justifyContent : 'center'
  },
  welcomeText: {
    fontSize: moderateScale(40, 0.3),
    color: Color.darkbrown,
  },
  subtextStyle: {
    fontSize: moderateScale(12, 0.3),
    color: '#333333',
  },
});
