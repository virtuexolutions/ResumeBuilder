import { Icon } from 'native-base';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { setWalkThrough } from '../Store/slices/auth';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const WalkThroughScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const slidesref = useRef(null);
  const slides = [
    {
      key: 1,
      image: require('../Assets/Images/Walkimage1.png'),
      title: 'Lorem Ipsum',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    },
    {
      key: 2,
      image: require('../Assets/Images/Walkimage2.png'),
      //   // image1: require('../Assets/Images/icon2.png'),
      title: 'Lorem Ipsum',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    },
    {
      key: 3,
      image: require('../Assets/Images/Walkimage3.png'),
      // image1: require('../Assets/Images/icon2.png'),
      title: 'Lorem Ipsum',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    },
  ];
  console.log(slidesref.current, 'indexxxxxxx');

  const RenderSlider = ({ item }) => {
    return (
      <ImageBackground
        imageStyle={{
          height: '100%',
          width: '100%',
        }}
        // resizeMode='stretch'
        style={styles.container}
        source={item.image}>
        <View
          style={[
            item?.key === 2 ? styles.SecondscreenStyle : styles.textStyle,
          ]}>
          <CustomText isBold style={styles.titleText}>
            {item?.title}
          </CustomText>
          <CustomText style={styles.subText}>{item?.text}</CustomText>
        </View>
        {/* <CustomText
          style={{
            fontSize: moderateScale(11, 0.6),
            position: 'absolute',
            bottom: '46%',
            width: '80%',
            textAlign: 'center',
            marginHorizontal: moderateScale(50, 0.3),
          }}>
          {item?.text}
        </CustomText> */}
      </ImageBackground>
    );
  };

  const RenderNextBtn = () => {
    return (
      <TouchableOpacity
        // onPress={onPress}
        // onPress={() =>{
        //   slidesref.current.goToSlide(activeindex + 1)

        // }}
        style={{
          height: windowHeight * 0.09,
          width: windowHeight * 0.09,
          borderRadius: (windowHeight * 0.09) / 2,
          backgroundColor: 'white',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.black,
          // position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          // left: windowWidth* 0.5,
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
          }}>
          NEXT
        </CustomText>
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <View style={{
        // backgroundColor:"red", 
        // zIndex:1, 
        // right:moderateScale(130,0.2),
        top: moderateScale(12, 0.2), width: windowWidth * 0.2,
        paddingVertical: moderateScale(12, 0.2),
        borderRadius: (windowWidth * 0.2) / 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Color.white,
        // position:"absolute",


        // paddingHorizontal:moderateScale(4,0.3),
        // height: windowWidth * 0.1
      }
      }>

        <CustomText
          onPress={() => {
            dispatch(setWalkThrough(true));
          }}
          style={{ color: Color.white }}
        >
          Done
        </CustomText>
      </View>
    );
  };
  // const RenderSkipBtn = () => {
  //   return (
  //     <CustomText
  //       // onPress={onPress}
  //       onPress={() => {
  //         dispatch(setWalkThrough(true));
  //       }}
  //       style={[styles.generalBtn, styles.btnLeft]}>
  //       Skip
  //     </CustomText>
  //   );
  // };
  // const RenderBackBtn = () => {
  //   return (
  //     <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
  //   );
  // };
  return (
    <AppIntroSlider
      renderItem={RenderSlider}
      data={slides}
      renderNextButton={() => {
        RenderNextBtn()
      }}
      renderDoneButton={
        RenderDoneBtn
      }
      dotStyle={{ display: "none" }}
      activeDotStyle={{ display: "none" }}

    // // ref={slidesref}
    // renderPagination={activeindex => {
    //   console.log('activeeeeeee ,index ', activeindex);
    // }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  titleText: {
    fontSize: moderateScale(35, 0.3),
    color: Color.white,
  },
  subText: {
    fontSize: moderateScale(16, 0.3),
    color: Color.white,
    textAlign: 'center',
    width: windowWidth * 0.9,
    lineHeight: 22,

    // backgroundColor:'green',
  },
  textStyle: {
    bottom: moderateScale(50, 0.3),
    // zIndex:1,
    position: 'absolute',
    alignItems: 'center',
  },
  SecondscreenStyle: {
    alignItems: 'center',
    top: moderateScale(30, 0.3),
    // backgroundColor:'green'
  },
});

export default WalkThroughScreen;
const BoldText = ({ children }) => {
  return <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
};
