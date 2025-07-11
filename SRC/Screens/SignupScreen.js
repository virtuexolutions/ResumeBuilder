import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import navigationService from '../navigationService';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../Store/slices/auth';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setUserData } from '../Store/slices/common';
import CustomImage from '../Components/CustomImage';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  console.log("🚀 ~ SignupScreen ~ email:", email)
  const [isLoading, setIsLoading] = useState(false);
  const user_type = useSelector(state => state.authReducer.role)

  const signUp = async () => {
    const url = "register";
    const body = {
      name: userName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      role: user_type === 'Employee' ? 'user' : 'company'
    };
    for (let key in body) {
      if (body[key] == "") {
        return ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({ token: response?.data?.token }));
    }

  }

  return (
    <ScrollView>
      <SafeAreaView style={[styles.container, {
        backgroundColor: Color.white
      }]}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          as={Ionicons}
          name="arrow-back"
          size={moderateScale(25, 0.3)}
          color={user_type === 'Company' ? Color.white : Color.blue}
          style={{
            position: 'absolute',
            top: moderateScale(20, 0.3),
            left: moderateScale(10, 0.3),
          }}
        />
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
          iconName={'user'}
          iconType={FontAwesome}
          setText={setUserName}
          value={userName}
          placeholder={user_type === 'Company' ? 'Type your company' : 'Type your Name'}
          viewWidth={0.75}
          borderBottomWidth={2}
          color={Color.blue}
          placeholderColor={Color.grey}
          borderColor={Color.blue}
          marginTop={moderateScale(30, 0.3)}
        />
        <TextInputWithTitle
          iconName={'mail'}
          iconType={Ionicons}
          setText={setEmail}
          value={email}
          placeholder={'Type your Email'}
          viewWidth={0.75}
          borderBottomWidth={2}
          color={Color.blue}
          placeholderColor={Color.grey}
          borderColor={Color.blue}
          marginTop={moderateScale(30, 0.3)}
        />
        <TextInputWithTitle
          iconSize={moderateScale(20, 0.3)}
          iconName={'key'}
          iconType={Ionicons}
          secureText={true}
          setText={setPassword}
          value={password}
          placeholder={'Type your password'}
          viewWidth={0.75}
          borderBottomWidth={2}
          color={Color.blue}
          placeholderColor={Color.grey}
          borderColor={Color.blue}
          marginTop={moderateScale(30, 0.3)}
        />
        <TextInputWithTitle
          iconSize={moderateScale(20, 0.3)}
          iconName={'key'}
          iconType={Ionicons}
          secureText={true}
          setText={setConfirmPassword}
          value={confirmPassword}
          placeholder={'Confirm Your Password'}
          viewWidth={0.75}
          borderBottomWidth={2}
          color={Color.blue}
          placeholderColor={Color.grey}
          borderColor={Color.blue}
          marginTop={moderateScale(30, 0.3)}
        />
        {/* <CustomButton
          text={isLoading ? <ActivityIndicator color={"white"} size={moderateScale(24, 0.2)} /> : 'Create Account'}
          textColor={Color.white}
          onPress={() => {
            console.log("first");
            signUp();
          }}
          style={{
            width: windowWidth * 0.55,
            height: moderateScale(45, 0.3),
            borderRadius: moderateScale(20, 0.3),
            backgroundColor: Color.themeBlue,
            top: windowHeight * 0.055
          }}
        /> */}
        <CustomButton
          text={isLoading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Create'}
          textColor={Color.white}
          onPress={() => {
            signUp()
          }}
          isBold
          width={windowWidth * 0.7}
          height={windowHeight * 0.060}
          borderRadius={moderateScale(20, 0.3)}
          bgColor={Color.themeBlue}
          marginTop={moderateScale(20, 0.6)}
        />
        <CustomText style={{
          fontSize: moderateScale(11, 0.3),
          color: Color.darkbrown,
          paddingTop: windowHeight * 0.09,

        }}>Do You Have An Account ?</CustomText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen")
          }}
          activeOpacity={0.8}>
          <CustomText
            isBold style={{
              fontSize: moderateScale(18, 0.3),
              color: Color.blue,
            }}>Log in</CustomText>
        </TouchableOpacity>

      </SafeAreaView>
    </ScrollView >
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.3),
    // paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    paddingTop: windowHeight * 0.15,
    // justifyContent : 'center'
  },
  welcomeText: {
    fontSize: moderateScale(40, 0.3),
    color: Color.darkbrown,
  },
  subtextStyle: {
    fontSize: moderateScale(13, 0.3),
    color: '#333333',
  },
});
