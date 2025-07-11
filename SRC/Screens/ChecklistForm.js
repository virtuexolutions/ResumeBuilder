import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
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
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';

const ChecklistForm = props => {
  const token = useSelector(state => state.authReducer.token);
  const tamplateType = props?.route?.params?.tamplateType;
  const detailData = props?.route?.params?.data;
  console.log("🚀 ~ detailData:", detailData)
  const [skillVisible, setSkillVisible] = useState(true);
  const [skills, setSkill] = useState([]);
  const [skillsVal, setSkillVal] = useState([]);
  const [optionsVal, setoptionsVal] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoImageModal, setLogoImageModal] = useState(false)
  const [image, setImage] = useState({})
  const [companyName, setCompanyName] = useState('');
  const onPressConfirm = async () => {
    const data = {
      skills: skills,
      options: options,
      image: image?.uri,
      templeteType: detailData?.templeteType,
      companyName: companyName,
      tamplate_title: detailData?.heading,
      tamplate_image: detailData?.image,
      tamplate_description: detailData?.description
    };
    console.log("🚀 ~ onPressConfirm ~ data:", data)
    navigationService.navigate(detailData?.key, { data: data, fromHome: false })
    // switch (data?.templeteType) {
    //   case 'checklist':
    //     navigationService.navigate('ChecklistScreen', {
    //       data: data,
    //       fromHome: false,
    //     });
    //     break;
    //   case 'customerForm':
    //     navigationService.navigate('CustomerSurveyForm', {
    //       data: data,
    //       fromHome: false,
    //     });
    //     break;
    //   case 'feedbackForm':
    //     navigationService.navigate('FeedBackForm', {
    //       data: data,
    //       fromHome: false,
    //     });
    //     break;
    //   case 'progressForm':
    //     navigationService.navigate('ProgressFeedback', {
    //       data: data,
    //       fromHome: false,
    //     });
    //     break;
    //   default:
    //     navigationService.navigate('SurvaryForm', {
    //       data: data,
    //       fromHome: false,
    //     });
    // }
  };


  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={'Edit'} hideUser={true} showBack={true} />
      <View style={styles.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tamplateType === 'checklist' ? (

            <View
              style={[
                styles.btn_view,
                {
                  height:
                    skillVisible === true
                      ? windowHeight * 0.11
                      : skills.length > 1
                        ? windowWidth * 0.78
                        : windowHeight * 0.3,
                  marginTop: moderateScale(15, 0.6),
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <View>
                  <CustomText isBold style={styles.btn_txt}>
                    document
                  </CustomText>
                  <CustomText
                    style={[
                      styles.btn_sub_txt,
                      {
                        color: Color.veryLightGray,
                        width: windowWidth * 0.8,
                      },
                    ]}>
                    Enter a skill with is match from professional background.
                  </CustomText>
                </View>
                <Icon
                  name="down"
                  onPress={() => setSkillVisible(!skillVisible)}
                  as={AntDesign}
                  color={Color.black}
                  size={moderateScale(18, 0.6)}
                />
              </View>
              {skillVisible === false && (
                <>
                  <FlatList
                    numColumns={3}
                    data={skills}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            backgroundColor: Color.lightGrey,
                            padding: moderateScale(2, .6),
                            marginRight: moderateScale(10, 0.6),
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: moderateScale(30, 0.6),
                            borderRadius: moderateScale(30, 0.6),
                            marginTop: moderateScale(6, 0.6),
                            flexDirection: 'row',
                            paddingHorizontal: moderateScale(8, 0.6),
                          }}>
                          <CustomText
                            style={{
                              color: Color.blue,
                              fontSize: moderateScale(10, 0.6),
                            }}>
                            {item}
                          </CustomText>
                          <Icon
                            name="cross"
                            as={Entypo}
                            color={Color.red}
                            size={moderateScale(18, 0.6)}
                          />
                        </View>
                      );
                    }}
                  />
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Add Document Name'}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setSkillVal}
                    value={skillsVal}
                  />
                  <CustomButton
                    text={'Add'}
                    textColor={Color.white}
                    onPress={() => {
                      console.log('first', skills);
                      setSkill([...skills, skillsVal]);
                    }}
                    width={windowWidth * 0.4}
                    height={windowHeight * 0.06}
                    borderRadius={moderateScale(20, 0.3)}
                    bgColor={Color.darkBlue}
                    marginTop={moderateScale(10, 0.6)}
                  />
                </>
              )}
            </View>
          ) : (
            <>
              <View>
                <CustomText isBold style={[styles.text, {
                  color: Color.white
                }]}>
                  company Logo :
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      '======================= > >> >> >> > here in m',
                    );
                    setLogoImageModal(true);
                  }}
                  style={[
                    styles.image_con,
                    Object.keys(image).length == 0 && {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  {Object.keys(image).length > 0 ? (
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'red',
                      }}
                      source={{ uri: image?.uri }}
                    />
                  ) : (
                    <Icon
                      onPress={() => {
                        console.log(
                          '======================= > >> >> >> > here in m',
                        );
                        setLogoImageModal(true);
                      }}
                      as={Entypo}
                      name="camera"
                      size={moderateScale(20, 0.6)}
                      color={Color.themeDarkGray}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <CustomText isBold style={[styles.text, {
                color: Color.white
              }]}>
                company Name :
              </CustomText>
              <TextInputWithTitle
                iconSize={moderateScale(20, 0.3)}
                color={Color.blue}
                placeholder={'Enter your company name '}
                placeholderColor={Color.grey}
                viewWidth={0.84}
                marginTop={moderateScale(10, 0.3)}
                style={styles.text_input}
                backgroundColor={Color.lightGrey}
                setText={setCompanyName}
                value={companyName}
              />
              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      skillVisible === true
                        ? windowHeight * 0.11
                        : skills.length > 1
                          ? windowWidth * 0.78
                          : windowHeight * 0.3,
                    marginTop: moderateScale(15, 0.6),
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View>
                    <CustomText isBold style={styles.btn_txt}>
                      Question
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter a Question with is match from Survey form.
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setSkillVisible(!skillVisible)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {skillVisible === false && (
                  <>
                    <FlatList
                      data={skills}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              backgroundColor: Color.lightGrey,
                              padding: moderateScale(2, .6),
                              marginRight: moderateScale(10, 0.6),
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: moderateScale(30, 0.6),
                              borderRadius: moderateScale(30, 0.6),
                              marginTop: moderateScale(6, 0.6),
                              flexDirection: 'row',
                              paddingHorizontal: moderateScale(8, 0.6),
                            }}>
                            <CustomText
                              style={{
                                color: Color.blue,
                                fontSize: moderateScale(10, 0.6),
                              }}>
                              {item}
                            </CustomText>
                            <Icon
                              name="cross"
                              as={Entypo}
                              color={Color.red}
                              size={moderateScale(18, 0.6)}
                            />
                          </View>
                        );
                      }}
                    />
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Add Document Name'}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setSkillVal}
                      value={skillsVal}
                    />
                    <CustomButton
                      text={'Add'}
                      textColor={Color.white}
                      onPress={() => {
                        console.log('first', skills);
                        setSkill([...skills, skillsVal]);
                      }}
                      width={windowWidth * 0.4}
                      height={windowHeight * 0.06}
                      borderRadius={moderateScale(20, 0.3)}
                      bgColor={Color.darkBlue}
                      marginTop={moderateScale(10, 0.6)}
                    />
                  </>
                )}
              </View>
              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      optionsVisible === true
                        ? windowHeight * 0.11
                        : options.length > 1
                          ? windowWidth * 0.78
                          : windowHeight * 0.3,
                    marginTop: moderateScale(15, 0.6),
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                  <View>
                    <CustomText isBold style={styles.btn_txt}>
                      options
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter a option with is match from Survey form.
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setOptionsVisible(!optionsVisible)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {optionsVisible === false && (
                  <>
                    <FlatList
                      data={options}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              backgroundColor: Color.lightGrey,
                              padding: moderateScale(2, .6),
                              marginRight: moderateScale(10, 0.6),
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: moderateScale(30, 0.6),
                              borderRadius: moderateScale(30, 0.6),
                              marginTop: moderateScale(6, 0.6),
                              flexDirection: 'row',
                              paddingHorizontal: moderateScale(8, 0.6),
                            }}>
                            <CustomText
                              style={{
                                color: Color.blue,
                                fontSize: moderateScale(10, 0.6),
                              }}>
                              {item}
                            </CustomText>
                            <Icon
                              name="cross"
                              as={Entypo}
                              color={Color.red}
                              size={moderateScale(18, 0.6)}
                            />
                          </View>
                        );
                      }}
                    />
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Add Options Name'}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setoptionsVal}
                      value={optionsVal}
                    />
                    <CustomButton
                      text={'Add'}
                      textColor={Color.white}
                      onPress={() => {
                        setOptions([...options, optionsVal]);
                      }}
                      width={windowWidth * 0.4}
                      height={windowHeight * 0.06}
                      borderRadius={moderateScale(20, 0.3)}
                      bgColor={Color.darkBlue}
                      marginTop={moderateScale(10, 0.6)}
                    />
                  </>
                )}
              </View>
            </>
          )
          }

          <CustomButton
            text={
              loading ? (
                <ActivityIndicator
                  size="small"
                  style={styles.indicatorStyle}
                  color={Color.darkBlue}
                />
              ) : (
                'confirm'
              )
            }
            textColor={Color.darkBlue}
            onPress={() => {
              console.log('first', skills);
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
      <ImagePickerModal
        show={logoImageModal}
        setShow={setLogoImageModal}
        setFileObject={setImage}
      />
    </ImageBackground>
  );
};

export default ChecklistForm;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
    // alignItems: 'left',
    // paddingHorizontal: moderateScale(10, 0.6),
  },
  image_con: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.2,
    backgroundColor: Color.lightGrey,

    borderRadius: moderateScale(10, 0.6),
    marginVertical: moderateScale(5.6),
    overflow: 'hidden',
  },
  main_view: {
    width: windowWidth,
    height: windowHeight * 0.9,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  btn_view: {
    width: windowWidth * 0.93,
    backgroundColor: Color.white,
    paddingVertical: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  btn_txt: {
    fontSize: moderateScale(18, 0.6),
  },
  btn_sub_txt: {
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.8,
  },
  text_input: {
    borderWidth: 1,
  },
  text: {
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(10, 0.6),
    color: Color.blue,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sub_text: {
    fontSize: moderateScale(11, 0.6),
    marginTop: moderateScale(9, 0.6),
    marginLeft: moderateScale(5, 0.6),
  },
});
