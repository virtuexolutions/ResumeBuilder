import React, { useState } from 'react';
import { ActivityIndicator, I18nManager, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const EditEmailTamplate2 = props => {
  const data = props?.route?.params?.data;
  console.log('🚀 ~ EditEmailTamplate2 ~ props:', props?.route?.params?.data);
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false)



  const onPressSave = async () => {
    const url = 'auth/cover-letter'
    setLoading(true)
    const response = await Post(url, data, apiHeader(token))
    setLoading(false)
    console.log("🚀 ~ onPressSave ~ response:", response?.data)
    if (response?.data != undefined) {
      setLoading(false)
      navigationService.navigate('Home');
    }
  }

  const onPressSaveEmail = async () => {
    const url = 'auth/mail'
    setLoading(true)
    const response = await Post(url, data, apiHeader(token))
    setLoading(false)
    console.log("🚀 ~ onPressSave ~ response:", response?.data)
    if (response?.data != undefined) {
      setLoading(false)
      navigationService.navigate('Home');
    }
  }

  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={'Edit cover letter'} hideUser={true} showBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_con}>
          <View style={styles.border}></View>
          <View style={styles.txt_con}>
            <CustomText isBold style={styles.txt}>{data?.name}</CustomText>
            <CustomText style={styles.txt2}>{data?.contact}</CustomText>
            <CustomText style={styles.txt2}>{data?.email}</CustomText>
            <CustomText style={styles.txt2}>{data?.address}</CustomText>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: windowWidth * 0.85,
            }}>
            <CustomText isBold style={{
              textTransform: 'capitalize',
              fontSize: moderateScale(14, 0.6)
            }}>{data?.managerName} </CustomText>
            <CustomText style={styles.txt2}>
              hiring represntive, really Great place
            </CustomText>
            <CustomText style={styles.txt2}>{data?.contact}</CustomText>
            <CustomText style={styles.txt2}>{data?.email}</CustomText>
            <CustomText style={styles.txt2}>{data?.address}</CustomText>
            <CustomText isBold
              style={
                {
                  paddingVertical: moderateScale(10, 0.6),
                  fontSize: moderateScale(13, 0.6)
                }
              }>
              policy :{data?.subject}
            </CustomText>
            <CustomText style={styles.des}>
              {data?.description}
            </CustomText>

            <CustomText
              isBold
              style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }
              }>
              {data?.name}
            </CustomText>
            <View style={styles.row}>
              <CustomText style={styles.txt2}>data :</CustomText>
              <CustomText style={styles.txt2}>{data?.date}</CustomText>
            </View>
          </View>
          <View
            style={[
              styles.border,
              {
                position: 'absolute',
                bottom: 60,
                height: windowHeight * 0.004,
              },
            ]}></View>
          <View
            style={[
              styles.border,
              {
                position: 'absolute',
                bottom: 0,
                height: windowHeight * 0.025,
              },
            ]}></View>
        </View>
        <CustomButton
          text={loading ? <ActivityIndicator style={styles.indicatorStyle}
            size="small"
            color={Color.blue} /> : 'save'}
          textColor={Color.darkBlue}
          onPress={() => {
            // 
            // console.log('first', skills);
            // onPressConfirm();
            if (data?.tamplate_type === 'attendencepolicy') {
              onPressSaveEmail()
            } else {
              onPressSave()
            }
          }}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          borderRadius={moderateScale(20, 0.3)}
          bgColor={Color.white}
          marginTop={moderateScale(20, 0.6)}
          marginBottom={moderateScale(30, 0.6)}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default EditEmailTamplate2;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
  },
  main_con: {
    height: windowHeight * 0.75,
    width: windowWidth * 0.95,
    backgroundColor: 'white',
    // paddingHorizontal: moderateScale(20, 0.6),
    alignItems: 'center',
  },
  border: {
    width: windowWidth * 0.9,
    backgroundColor: '#d1e4e2',
    height: windowHeight * 0.025,
    alignSelf: 'center',
  },
  txt_con: {
    width: windowWidth * 0.85,
    paddingVertical: moderateScale(20, 0.6),
    borderBottomWidth: 3.5,
    borderTopWidth: 3.5,
    borderColor: '#d1e4e2',
    marginVertical: moderateScale(25, 0.6),
  },
  txt: {
    fontSize: moderateScale(16, 0.6),
    textTransform: 'uppercase'
  },
  txt2: {
    fontSize: moderateScale(11, 0.6),
    color: Color.black,
  },
  des: {
    fontSize: moderateScale(11, 0.6),
    width: windowWidth * 0.8,
    paddingBottom: moderateScale(50, 0.6),
  },
  row: {
    flexDirection: 'row',
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
});
