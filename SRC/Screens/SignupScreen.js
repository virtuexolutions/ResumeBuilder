import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { SetUserRole, setUserToken } from '../Store/slices/auth';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation, route }) => {
  const type = route?.params?.type;
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
      role: type === 'Private' ? 'user' : 'company',
      private: type === "Private" ? true : false,
    };
    for (let key in body) {
      if (body[key] === "" || body[key] === null || body[key] === undefined) {
        return ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(SetUserRole(type));
    }
  }

  return (
    <ImageBackground source={require('../Assets/Images/background_image.png')}
      style={styles.gradient}
    >
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ScrollView style={styles.scroll_view} contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          as={Ionicons}
          name="arrow-back"
          size={moderateScale(25, 0.3)}
          color={Color.darkBlue}
          style={{
            position: 'absolute',
            top: moderateScale(20, 0.3),
            left: moderateScale(10, 0.3),
          }}
        />
        <View style={{
          width: windowWidth * 0.5,
          height: windowWidth * 0.3,
          alignSelf: 'center',
        }}>
          <CustomImage source={require('../Assets/Images/logo.png')} style={{
            width: '100%',
            height: '100%'
          }} />
        </View>
        <View style={styles.container}>
          <CustomText isBold style={styles.heading}>Create Your Account</CustomText>
          <CustomText style={styles.text}>Sign up to unlock important resources, streamline your workflow, and stay connected wherever you are.</CustomText>
          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            setText={setUserName}
            value={userName}
            placeholder={type === 'Company' ? 'Type your company' : 'Type your Name'}
            placeholderColor={Color.veryLightGray}
            viewWidth={0.82}
            backgroundColor={'rgba(211, 211, 211, 0.3) '}
            borderRadius={moderateScale(10, 0.6)}
            viewHeight={0.07}
            marginTop={moderateScale(10, 0.3)}
            borderBottomWidth={2}
            borderColor={Color.blue}
          />
          <TextInputWithTitle
            iconName={'mail'}
            iconType={Ionicons}
            setText={setEmail}
            value={email}
            placeholder={'Type your Email'}
            placeholderColor={Color.veryLightGray}
            viewWidth={0.82}
            backgroundColor={'rgba(211, 211, 211, 0.3) '}
            borderRadius={moderateScale(10, 0.6)}
            viewHeight={0.07}
            marginTop={moderateScale(10, 0.3)}
            borderBottomWidth={2}
            borderColor={Color.blue}
          />
          <TextInputWithTitle
            iconSize={moderateScale(20, 0.3)}
            iconName={'key'}
            iconType={Ionicons}
            secureText={true}
            setText={setPassword}
            value={password}
            placeholder={'Type your password'}
            placeholderColor={Color.veryLightGray}
            viewWidth={0.82}
            backgroundColor={'rgba(211, 211, 211, 0.3) '}
            borderRadius={moderateScale(10, 0.6)}
            viewHeight={0.07}
            marginTop={moderateScale(10, 0.3)}
            borderBottomWidth={2}
            borderColor={Color.blue}
          />
          <TextInputWithTitle
            iconSize={moderateScale(20, 0.3)}
            iconName={'key'}
            iconType={Ionicons}
            secureText={true}
            setText={setConfirmPassword}
            value={confirmPassword}
            placeholder={'Confirm Your Password'}
            placeholderColor={Color.veryLightGray}
            viewWidth={0.82}
            backgroundColor={'rgba(211, 211, 211, 0.3) '}
            borderRadius={moderateScale(10, 0.6)}
            viewHeight={0.07}
            marginTop={moderateScale(10, 0.3)}
            borderBottomWidth={2}
            borderColor={Color.blue}
          />
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
            marginTop={moderateScale(20, 0.6)}
            bgColor={Color.themeBgColor}
            isGradient
          />
          <CustomText style={{
            fontSize: moderateScale(13, 0.3),
            color: Color.darkbrown,
            marginTop: moderateScale(10, 0.6),
            textAlign: 'center'
          }}>Do You Have An Account ?</CustomText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen")
            }}
            activeOpacity={0.8}>
            <CustomText
              isBold style={{
                fontSize: moderateScale(20, 0.3),
                color: Color.darkBlue,
                textAlign: 'center'
              }}>Log in</CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView >
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
  },
  gradient: {
    // width: windowWidth,
    // height: windowHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: moderateScale(15, 0.3),
    alignItems: 'center',
    width: windowWidth * 0.92,
    height: windowHeight * 0.65,
    backgroundColor: " rgba(255, 255, 255, 0.4)",
    borderRadius: moderateScale(20, 0.6),
    alignSelf: "center",
    marginTop: moderateScale(10, 0.6),
    justifyContent: 'center',
    borderTopWidth: 5,
    borderTopColor: Color.darkBlue
  },
  welcomeText: {
    fontSize: moderateScale(40, 0.3),
    color: Color.darkbrown,
  },
  subtextStyle: {
    fontSize: moderateScale(13, 0.3),
    color: '#333333',
  },
  heading: {
    fontSize: moderateScale(25, 0.6),
    textTransform: "capitalize",
    color: Color.blue,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '90%',
    color: Color.darkGray
  }
});
