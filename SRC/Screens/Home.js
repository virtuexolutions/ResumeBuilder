import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import SearchContainer from '../Components/SearchContainer';
import { FlatList, Icon, ScrollView } from 'native-base';
import CustomImage from '../Components/CustomImage';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';
import { useIsFocused } from '@react-navigation/core';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { date } from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Home ~ token:", token)
  const [loading, setLoading] = useState(false);
  const [saveresumeData, setSaveResumeData] = useState([]);
  const [tamplates, setTamplates] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [showCategory, setshowCategory] = useState('resume');
  const [selectedCategoty, setSelectedCategory] = useState({
    id: 2,
    text: 'email',
    subtext: 'tempaletes',
  });
  console.log("🚀 ~ Home ~ selectedCategoty:", selectedCategoty)

  useEffect(() => {
    getTamplates()
  }, [])


  const getTamplates = async () => {
    const url = 'auth/category-list'
    const response = await Get(url, token)
    console.log("🚀 ~ getTamplates ~ response:", response?.data?.data)
    setTamplates(response?.data?.data)
  }

  const category = [
    {
      id: 2,
      text: 'email',
      subtext: 'tempaletes',
    },
    {
      id: 3,
      text: 'cover',
      subtext: 'letter',
    },
    {
      id: 4,
      text: 'career',
      subtext: 'blog',
    },
    {
      id: 5,
      text: 'survay',
      subtext: 'forms',
    },
  ];
  const resumeData = [
    {
      id: 1,
      heading: 'Creative',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/resume.jpeg'),
      type: 'creative',
    },
  ];
  const coverletterData = [
    {
      id: 1,
      heading: 'Creative',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/coverletter.png'),
      type: 'coverLetter'
    },
  ];
  const careerBlogdata = [
    {
      id: 1,
      heading: 'Creative',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/blogbg.png'),
      type: 'blog',
    },
    {
      id: 2,
      heading: 'welcome OnBoarding',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/onboard.jpeg'),
      type: 'OnBoarding',
      templeteType: 1,
    },
    {
      id: 3,
      heading: 'welcome OnBoarding',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/onboard3.jpeg'),
      type: 'OnBoarding',
      templeteType: 2,
    },
  ];
  const cvdata = [
    // {
    //   id: 2,
    //   heading: 'WelCome Email',
    //   description:
    //     'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
    //   image: require('../Assets/Images/email_tamplate2.jpeg'),
    //   type: 'email',
    //   tamplateType: 'companyEmail'
    // },
    {
      id: 1,
      heading: 'late attendence policy',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/email-temp.jpeg'),
      tamplateType: 'attendencepolicy',
      type: 'attendencepolicy'
    },
  ];
  const survayForm = [
    {
      id: 1,
      heading: 'Survey Form',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/form_image.png'),
      templeteType: 'SurveyForm'
    },
    {
      id: 2,
      heading: 'Customer Survey Form',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/customer_survey.jpeg'),
      templeteType: 'customerForm'
    },
    {
      id: 3,
      heading: 'Feedback form',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/feedback_form.jpeg'),
      templeteType: 'feedbackForm'
    },
    {
      id: 4,
      heading: 'Progress FeedBack Form',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/feedback_form2.jpeg'),
      templeteType: 'progressForm'
    },
    {
      id: 5,
      heading: ' compliance checklist',
      description:
        'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
      image: require('../Assets/Images/checklist.jpeg'),
      templeteType: 'checklist',
      type: 'checklist',
    }
  ]

  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header hideUser={false} showBack={false} />

      <View style={styles.text_con}>
        <CustomText isBold style={styles.h1}>
          hello, {userData?.name}
        </CustomText>
        <CustomText style={styles.h2}>0 - 5 years of experience</CustomText>
      </View>
      <View
        style={{
          height: windowHeight * 0.07,
          paddingHorizontal: moderateScale(10, 0.6),
          marginVertical: moderateScale(10, 0.6),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <SearchContainer
          width={windowWidth * 0.8}
          height={moderateScale(50, 0.6)}
          // rightIcon={true}
          placeHolder={'search ..'}
          input={true}
        // data=
        />
        <TouchableOpacity
          onPress={() => navigationService.navigate('SavedTemplates')}
          style={{
            width: windowWidth * 0.12,
            height: windowWidth * 0.12,
            borderRadius: moderateScale(12, 0.6),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.white,
          }}>
          <Icon
            name={'save-alt'}
            as={MaterialIcons}
            size={moderateScale(22, 0.6)}
            color={Color.darkBlue}
            style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>
      </View>

      <CustomText style={styles.h3}>What do you need</CustomText>
      <View
        style={{
          width: '100%',
          height: windowHeight * 0.1,
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <FlatList
          contentContainerStyle={{
            flexDirection: 'row',
          }}
          style={{
            width: '100%',
            height: windowHeight * 0.05,
          }}
          horizontal
          data={tamplates}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            console.log(item, 'itemmmmmmmmmmmmmmmmm')
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item?.name);
                }}
                style={styles.category_con}>
                <CustomText>{item?.name}</CustomText>
                {/* <CustomText>{item?.subtext}</CustomText> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.row}>
        <CustomText
          isBold
          style={[
            styles.txt,
            {
              fontSize: moderateScale(15, 0.6),
            },
          ]}>
          {selectedCategoty?.text} {selectedCategoty?.subtext}
        </CustomText>
        {selectedCategoty?.text === 'Saved' ? (
          <TouchableOpacity
            onPress={() => setDropDown(!dropDown)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={[
                styles.txt,
                {
                  marginRight: moderateScale(3, 0.6),
                },
              ]}>
              Select category
            </CustomText>
            <Icon
              name={dropDown ? 'up' : 'down'}
              as={AntDesign}
              size={moderateScale(13, 0.6)}
              color={Color.white}
            />
          </TouchableOpacity>
        ) : (
          <CustomText style={styles.txt}>See more</CustomText>
        )}
        {dropDown && (
          <View style={styles.con}>
            {category.map(item => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(1, 0.6),
                  }}>
                  <CustomText
                    onPress={() => {
                      setshowCategory(item?.text);
                      setDropDown(false);
                    }}
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: Color.darkBlue,
                      paddingHorizontal: moderateScale(5, 0.6),
                      textTransform: 'capitalize',
                    }}>
                    {item?.text === 'Saved' ? '' : item?.text}
                  </CustomText>
                  {showCategory === item?.text && (
                    <Icon
                      style={{
                        paddingTop: moderateScale(2, 0.6),
                      }}
                      name="check"
                      as={AntDesign}
                      size={moderateScale(14, 0.6)}
                      color={Color.darkBlue}
                    />
                  )}
                </View>
              );
            })}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: moderateScale(10, 0.6),
              }}>
              <CustomText
                onPress={() => {
                  // setFilterPlaces('topRated')
                  // findNearestMcDonalds()
                }}
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.black,
                  paddingHorizontal: moderateScale(5, 0.6),
                  textTransform: 'capitalize'
                }}>
                top Rated
              </CustomText>
            </View> */}
          </View>
        )}
      </View>
      <View
        style={{
          width: '100%',
          height: windowHeight * 0.8,
          paddingHorizontal: moderateScale(10, 0.6),
          paddingBottom: moderateScale(12, 0.2),
        }}>
        {
          loading ? <ActivityIndicator size="small"
            style={{
              marginTop: moderateScale(20, 0.6)
            }}
            color={Color.darkBlue} />
            : (
              <FlatList
                style={{
                  // width: '100%',
                  height: '100%',
                  // backgroundColor:"red"
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={
                  selectedCategoty?.text === 'resume' ? resumeData :
                    selectedCategoty?.text === 'cover' ? coverletterData :
                      selectedCategoty?.text === 'career' ? careerBlogdata :
                        selectedCategoty?.text === 'survay' ? survayForm :
                          cvdata
                }
                ListFooterComponent={() => {
                  return <View style={{ height: windowHeight * 0.2 }} />;
                }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigationService.navigate('ResumeScreen', {
                          detailData: item,
                          data: item?.image,
                          type: selectedCategoty?.text,
                          tamplateType: item?.tamplateType
                        })
                      }
                      style={styles.card}>
                      <View style={styles.card_image}>
                        <CustomImage
                          onPress={() =>
                            navigationService.navigate('ResumeScreen', {
                              detailData: item,
                              data: item?.image,
                              type: selectedCategoty?.text,
                              tamplateType: item?.tamplateType
                            })
                          }
                          source={item?.image}
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </View>
                      <View style={styles.content}>
                        <View>
                          <CustomText style={styles.heading}>
                            {item?.heading}
                          </CustomText>
                          <CustomText style={styles.description}>
                            {item?.description}
                          </CustomText>
                        </View>
                        <View style={styles.ratingView}>
                          <Rating
                            type="custom"
                            startingValue={4}
                            ratingCount={5}
                            imageSize={moderateScale(12, 0.3)}
                            style={
                              {
                                // width: windowWidth * 0.04,
                              }
                            }
                            ratingBackgroundColor={'white'}
                          />
                          <CustomText
                            style={{
                              fontSize: moderateScale(12, 0.2),
                              color: Color.grey,
                            }}>
                            1/16
                          </CustomText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
        <View style={{ height: windowHeight * 0.14 }} />
      </View>
    </ImageBackground >
  );
};

export default Home;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    // alignItems: 'left',
    // paddingHorizontal: moderateScale(10, 0.6),
  },
  h1: {
    fontSize: moderateScale(25, 0.6),
    color: Color.white,
    textAlign: 'left',
    marginVertical: moderateScale(2, 0.6),
  },
  h2: {
    fontSize: moderateScale(15, 0.6),
    color: Color.white,
    textAlign: 'left',
  },
  text_con: {
    width: '95%',
    // paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  h3: {
    fontSize: moderateScale(15, 0.6),
    color: Color.white,
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  category_con: {
    width: windowWidth * 0.22,
    backgroundColor: Color.white,
    marginHorizontal: moderateScale(3, 0.3),
    marginVertical: moderateScale(5, 0.3),
    borderRadius: moderateScale(10, 0.6),
    alignItems: 'center',
    paddingVertical: moderateScale(15, 0.6),
  },
  item_txt: {
    fontSize: moderateScale(12, 0.6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  txt: {
    fontSize: moderateScale(13, 0.6),
    color: Color.white,
  },
  card: {
    width: windowWidth * 0.95,
    backgroundColor: Color.white,
    // height: windowHeight * 0.11,
    borderRadius: moderateScale(12, 0.6),
    flexDirection: 'row',
    gap: moderateScale(12, 0.3),
    marginTop: moderateScale(11, 0.2),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(12, 0.2),
  },
  card_image: {
    height: windowHeight * 0.11,
    width: windowWidth * 0.2,
    // backgroundColor: 'red',
  },
  content: {
    width: '75%',
    //  backgroundColor: Color.red,
    // flexDirection:"column",
    // overflow:'hidden'
  },
  heading: {
    fontSize: moderateScale(16, 0.3),
  },
  description: {
    // width:"100%",
    fontSize: moderateScale(10, 0.2),
    color: Color.grey,
  },
  ratingView: {
    // width:'100%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(4, 0.2),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(5, 0.4),
  },
  con: {
    backgroundColor: Color.lightGrey,
    height: windowHeight * 0.12,
    borderWidth: 1,
    borderColor: Color.lightGrey,
    width: windowWidth * 0.4,
    borderRadius: moderateScale(10, 0.6),
    zIndex: 1,
    position: 'absolute',
    right: 20,
    top: 35,
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});
