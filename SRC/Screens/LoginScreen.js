import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
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
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { SetUserRole, setUserToken } from '../Store/slices/auth';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomStatusBar from '../Components/CustomStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const type = route?.params?.type;
  console.log("🚀 ~ LoginScreen ~ type:", type)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user_type = useSelector(state => state.authReducer.role)
  console.log("🚀 ~ LoginScreen ~ user_type:", user_type)
  const modalVisible = useSelector(state => state.commonReducer.modalVisible);
  const modalMessage = useSelector(state => state.commonReducer.modalMessage);
  console.log("🚀 ~ LoginScreen ~ modalVisible:", modalVisible, modalMessage)



  const Login = async () => {
    const url = "login";
    const body = {
      email: email,
      password: password,
    };
    for (let key in body) {
      if (body[key] == "") {
        return ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    const user = response?.data?.user_info;
    console.log("🚀 ~ Login ~ response:", user);
    if (response !== undefined && user) {
      dispatch(SetUserRole(type));
      dispatch(setUserData(user));
      dispatch(setUserToken({ token: response?.data?.token }));
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
      <Icon
        onPress={() => {
          navigation.goBack();
        }}
        as={Ionicons}
        name="arrow-back"
        size={moderateScale(30, 0.3)}
        color={Color.darkBlue}
        style={{
          position: 'absolute',
          top: moderateScale(30, 0.3),
          left: moderateScale(10, 0.3),
        }}
      />
      <View style={{
        width: windowWidth * 0.5,
        height: windowWidth * 0.29,
        alignSelf: "center",
        marginBottom: moderateScale(30, 0.6)
      }}>
        <CustomImage source={require('../Assets/Images/logo.png')} style={{
          width: '100%',
          height: '100%'
        }} />
      </View>
      <View style={styles.container}>
        <CustomText isBold style={styles.heading}>Welcome Back</CustomText>
        <CustomText style={styles.text}>Stay connected, access important resources, and manage your work efficiently. We’re glad to have you on board!</CustomText>
        <TextInputWithTitle
          iconName={'mail'}
          iconType={Ionicons}
          color={Color.blue}
          setText={setEmail}
          value={email}
          placeholder={'Type your Email'}
          placeholderColor={Color.veryLightGray}
          viewWidth={0.82}
          backgroundColor={'rgba(211, 211, 211, 0.3) '}
          borderRadius={moderateScale(10, 0.6)}
          viewHeight={0.07}
          marginTop={moderateScale(20, 0.3)}
          borderBottomWidth={2}
          borderColor={Color.blue}
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
          placeholderColor={Color.veryLightGray}
          viewWidth={0.82}
          backgroundColor={'rgba(211, 211, 211, 0.3) '}
          borderRadius={moderateScale(10, 0.6)}
          viewHeight={0.07}
          marginTop={moderateScale(10, 0.3)}
          borderBottomWidth={2}
          borderColor={Color.blue}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("VerifyEmail")
          }}
          activeOpacity={0.8}
          style={{
            alignSelf: 'flex-end',
            marginTop: moderateScale(7, 0.2),
            right: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(12, 0.3),
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
          bgColor={Color.themeBgColor}
          isGradient
          marginTop={moderateScale(20, 0.6)}
          onPress={() => {
            Login()
          }}
        />
        {type === 'employee' ? <></>
          :
          <>
            <CustomText style={{
              fontSize: moderateScale(13, 0.3),
              color: Color.darkbrown,
              paddingTop: windowHeight * 0.05,

            }}>Don’t have an Account?</CustomText>
            <TouchableOpacity activeOpacity={0.8}>
              <CustomText onPress={() => {
                navigation.navigate('SignupScreen', { type: type })
              }}
                isBold style={{
                  fontSize: moderateScale(20, 0.3),
                  color: Color.darkBlue
                }}>Sign Up</CustomText>
            </TouchableOpacity></>
        }
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: moderateScale(15, 0.3),
    alignItems: 'center',
    width: windowWidth * 0.92,
    // height: windowHeight * 0.6,
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: " rgba(255, 255, 255, 0.4)",
    borderRadius: moderateScale(20, 0.6),
    alignSelf: "center",
    borderTopWidth: 5,
    borderTopColor: Color.darkBlue
  },
  welcomeText: {
    fontSize: moderateScale(40, 0.3),
    color: Color.darkbrown,
  },
  subtextStyle: {
    fontSize: moderateScale(12, 0.3),
    color: '#333333',
  },
  heading: {
    fontSize: moderateScale(30, 0.6),
    textTransform: "capitalize",
    color: Color.blue,
    textAlign: 'center',
    marginTop: moderateScale(30, 0.6),
    width: '80%'
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '90%',
    color: Color.darkGray
  }
});
