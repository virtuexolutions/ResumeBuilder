import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import CustomImage from '../Components/CustomImage';
import { useSelector } from 'react-redux';

const FinalBlogPost = props => {
  const data = props?.route?.params?.data;
  console.log("🚀 ~ data:", data)
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false)

  const onPressConfirm = async () => {
    const url = 'auth/career-blog'
    const body = {
      details: data?.details,
      heading: data?.heading,
      image: data?.image
    }
    setLoading(true)
    const response = await Post(url, body, apiHeader(token))
    console.log("🚀 ~ onPressSave ~ response:", response)
    setLoading(false)
    if (response?.data != undefined) {
      setLoading(false)
      navigationService.navigate('Home')
    }
  }
  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={'Edit cover letter'} hideUser={true} showBack={true} />
      <View style={styles.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.letter_bg}>
            <View style={styles.image_con}>
              <CustomImage style={{
                height: '100%',
                width: '100%',
              }} source={{ uri: data?.image?.uri }} />
            </View>
            <CustomText isBold style={styles.h1}>
              {data?.heading}
            </CustomText>

            <CustomText isBold style={styles.h2}>
              {data?.details}
            </CustomText>
          </View>

          <CustomButton
            text={loading ? <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={Color.blue}
            /> : 'Save'}
            textColor={Color.darkBlue}
            onPress={() => {
              // navigationService.navigate('Home')
              // console.log('first', skills);
              onPressConfirm();
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

export default FinalBlogPost;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
  },
  main_view: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.9,
    paddingVertical: moderateScale(15, 0.6),
  },
  letter_bg: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.77,
    paddingHorizontal: moderateScale(15, 0.6),
    backgroundColor: '#faf2de',
  },
  image_con: {
    height: windowHeight * 0.26,
    width: windowWidth * 0.85,
    backgroundColor: 'red',
    marginTop: moderateScale(25, 0.6),
    borderRadius: 10,
    overflow: 'hidden'
  },
  h1: {
    fontSize: moderateScale(22, 0.6),
    color: Color.black,
    paddingVertical: moderateScale(15, 0.6),
    letterSpacing: 0.7,
  },
  h2: {
    fontSize: moderateScale(12, 0.6),
    color: Color.darkGray,
    // paddingVertical : moderateScale(15,.6) ,
    letterSpacing: 0.7,
  },
});
