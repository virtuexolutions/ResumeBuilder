import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  ToastAndroid,
  View
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { user_type } = useSelector(state => state.authReducer);
  const token = useSelector(state => state.authReducer.token);
  const [password, setPassword] = useState('');
  const [pre_password, setPrePassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    const url = 'auth/change_password';
    const body = {
      current_password: pre_password,
      new_password: password,
      confirm_password: confirm_password,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data != undefined) {
      setIsLoading(false);
      Platform.OS == 'android'
        ? ToastAndroid.show('change password uccessfully', ToastAndroid.SHORT)
        : Alert.alert('change password uccessfully');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <Header showBack={true} />
      <View style={styles.main_view}>
        <CustomText isBold style={styles.heading}>Create A New Password</CustomText>
        <CustomText style={styles.sub_heading}>Your new password must be different from previous use password.</CustomText>
        <View style={{ marginTop: moderateScale(15, 0.6) }} />
        <TextInputWithTitle
          title={"Enter previous Password : "}
          iconName={'lock'}
          iconType={Feather}
          color={Color.veryLightGray}
          setText={setPrePassword}
          value={pre_password}
          placeholder={'previous Password'}
          placeholderColor={Color.veryLightGray}
          viewWidth={0.9}
          viewHeight={0.060}
          border={1}
          borderRadius={moderateScale(10, 0.6)}
          borderColor={Color.themeBlue}
          secureText={true}
        />

        <TextInputWithTitle
          title={"Enter New Password : "}
          iconName={'lock'}
          iconType={Feather}
          color={Color.veryLightGray}
          setText={setPassword}
          value={password}
          placeholder={'New Password'}
          placeholderColor={Color.veryLightGray}
          viewWidth={0.9}
          viewHeight={0.060}
          border={1}
          borderRadius={moderateScale(10, 0.6)}
          borderColor={Color.themeBlue}
          secureText={true}
        />

        <TextInputWithTitle
          title={"Confirm New Password"}
          iconName={'lock'}
          iconType={Feather}
          setText={setConfirmPassword}
          value={confirm_password}
          color={Color.veryLightGray}
          placeholder={'Confirm password'}
          placeholderColor={Color.veryLightGray}
          viewWidth={0.9}
          viewHeight={0.060}
          border={1}
          borderRadius={moderateScale(10, 0.6)}
          borderColor={Color.themeBlue}
          secureText={true}
        />
        <CustomText style={styles.sub_heading}>Both Password must be match.</CustomText>
        <CustomButton
          text={loading ? <ActivityIndicator style={styles.indicatorStyle}
            size="small"
            color={Color.white} /> : 'Reset Password'}
          width={windowWidth * 0.9}
          height={windowHeight * 0.055}
          borderRadius={moderateScale(10, 0.3)}
          textColor={Color.white}
          bgColor={Color.themeBlue}
          marginTop={moderateScale(20, 0.6)}
          onPress={() => {
            handleReset()
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#F9F9F9',
    paddingTop: moderateScale(10, 0.6),
  },
  main_view: {
    paddingHorizontal: moderateScale(15, 0.6),
  },
  heading: {
    fontSize: moderateScale(18, 0.6),
  },
  sub_heading: {
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(10, 0.6),
    textTransform: 'none',
    color: Color.veryLightGray
  }
});
