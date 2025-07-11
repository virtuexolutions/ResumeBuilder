import React, {useState} from 'react';
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
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';


const VerifyEmail = props => {
  const dispatch = useDispatch();
  const navigationN = useNavigation();
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async values => {
    console.log('asdhkasdjagsdjags');
    const url = 'password/email';
    if(!email.includes("@")){
      return ToastAndroid.show("Email is invalid", ToastAndroid.SHORT);
    }

    setIsLoading(true);
    const response = await Post(url, {email: email}, apiHeader());
    setIsLoading(false);
    console.log('response data =========================>', response?.data);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);
      // fromForgot
      //   ?
      navigationN.navigate('VerifyNumber',{
        code: response?.data?.data[0]?.code,
        email : response?.data?.data[0]?.email});
      // : navigationService.navigate('VerifyNumber', {
      //     email: `${email}`,
      //   });
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
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
            size={moderateScale(22, 0.3)}
            color={Color.darkBlue}
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
          
          <View style={styles.text_input}>
          <TextInputWithTitle
          iconName={'mail'}
          iconType={Ionicons}
          color={Color.blue}
          setText={setEmail}
          value={email}
          placeholder={'Type your Email'}
          placeholderColor={Color.grey}
          viewWidth={0.7}
          borderBottomWidth={2}
          borderColor={Color.blue}
          marginTop={moderateScale(30,0.3)}
        />
                 
                  <CustomButton
                    text={isLoading ? <ActivityIndicator size={'small'} color={Color.white}/>:'submit'}
                    textColor={Color.white}
                    width={windowWidth * 0.65}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(20, 0.3)}
                    onPress={sendOTP}
                    borderRadius={30}
                    bgColor={Color.darkBlue}
                    // bgColor={
                    //   user_type === 'Rider' ? Color.darkBlue : Color.themeBlack
                    // }
                  />
                </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'white',
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.black,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '80%',
    marginVertical: moderateScale(15, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back: {
    position: 'absolute',
    top: moderateScale(20, 0.3),
    left: moderateScale(20, 0.3),
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.themeBlack,
    zIndex: 1,
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 0.45,
    width: windowWidth * 0.9,
    borderColor: Color.lightGrey,
    elevation:3,
    paddingVertical: moderateScale(20, 0.6),
    // height: windowHeight * 0.36,
    shadowRadius: 25,
    shadowColor: "grey",
    shadowOpacity:0.6,
    shadowOffset:{width:0, height:1},
    borderRadius: 25,
    paddingTop: windowHeight * 0.03,

    paddingHorizontal: moderateScale(30, 0.6),
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: windowHeight,
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    // backgroundColor: 'green',
    alignSelf: 'flex-start',
  },
});

export default VerifyEmail;
