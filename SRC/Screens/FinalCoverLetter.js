import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';

const FinalCoverLetter = props => {
  const data = props?.route?.params?.data;
  console.log("🚀 ~ data:", data)
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false)

  const onPressSave = async () => {
    const url = 'auth/cover-letter'
    const response = await Post(url, data, apiHeader(token))
    console.log("🚀 ~ onPressSave ~ response:", response?.data)
    setLoading(false)
    if (response?.data != undefined) {
      setLoading(false)
      navigationService.navigate('Home')
      Platform.OS == 'android'
        ? ToastAndroid.show('Tamplate Saved SuccessFully', ToastAndroid.SHORT)
        : Alert.alert('Tamplate Saved SuccessFully');
    }
  }

  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={' cover letter'} hideUser={true} showBack={true} />
      <View style={styles.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.letter_bg}
            source={require('../Assets/Images/coverletterbg.png')}>
            <View style={styles.titlecontainer}>
              <CustomText style={styles.title}>{data?.name}</CustomText>
            </View>
            <View style={styles.per_data}>
              <CustomText style={styles.per_text}>{data?.address}</CustomText>
              <CustomText style={styles.per_text}>{data?.contact}</CustomText>
              <CustomText style={styles.per_text}>
                {data?.email}
              </CustomText>
            </View>

            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(4, 0.6),
                  // backgroundColor :'red'
                },
              ]}>
              {data?.date}
            </CustomText>
            <View style={styles.per_data}>
              <CustomText style={styles.per_text}>
                {data?.managerName}
              </CustomText>
              <CustomText style={styles.per_text}>
                {data?.companyName}
              </CustomText>
              <CustomText style={styles.per_text}>
                {data?.degreeYear}
              </CustomText>
            </View>
            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(7, 0.6),
                  //   marginHorizontal : moderateScale(10,.6),
                },
              ]}>
              subject :{' '}
              <CustomText
                style={[
                  styles.per_text,
                  {
                    paddingVertical: moderateScale(10, 0.6),
                    marginLeft: moderateScale(5, 0.6),
                  },
                ]}>
                {data?.subject}
              </CustomText>
            </CustomText>
            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(5, 0.6),
                },
              ]}>
              Dear {''}
              <CustomText style={styles.per_text}>
                {data?.managerName}
              </CustomText>
            </CustomText>

            <CustomText style={styles.per_text}>
              {data?.description}
              {/* {data?.details.replace(/\. /g, '.\n\n')} */}
            </CustomText>
            <View
              style={[
                styles.per_data,
                {
                  paddingVertical: moderateScale(10, 0.6),
                },
              ]}>
              <CustomText style={styles.per_text}>regard ,</CustomText>
              <CustomText style={styles.per_text}>{data?.name}</CustomText>
              <CustomText style={styles.per_text}>{data?.phone}</CustomText>
              <CustomText style={styles.per_text}>{data?.email}</CustomText>
            </View>
          </ImageBackground>
          <CustomButton
            text={loading ? <ActivityIndicator style={styles.indicatorStyle}
              size="small"
              color={Color.white} /> : 'confirm'}
            textColor={Color.darkBlue}
            onPress={() => {
              // navigationService.navigate('Home');
              onPressSave();
            }}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(20, 0.3)}
            bgColor={Color.white}
            marginTop={moderateScale(20, 0.6)}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default FinalCoverLetter;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
    // alignItems: 'left',
    // paddingHorizontal: moderateScale(10, 0.6),
  },
  main_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    paddingVertical: moderateScale(15, 0.6),
  },
  letter_bg: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.77,
    paddingHorizontal: moderateScale(20, 0.6),
    // paddingVertical: moderateScale(15, 0.6),
    // backgroundColor: 'red',
  },

  titlecontainer: {
    alignItems: 'center',
    paddingVertical: moderateScale(15, 0.6),
  },
  title: {
    fontSize: moderateScale(16, 0.6),
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    letterSpacing: 3,
  },
  title2: {
    fontSize: moderateScale(10, 0.6),
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
  },
  per_data: {
    alignItems: 'flex-start',
    // backgroundColor :'red'
  },

  per_text: {
    textTransform: 'capitalize',
    fontSize: moderateScale(11, 0.6),
  },
});
