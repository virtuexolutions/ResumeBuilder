import {
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
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import { useSelector } from 'react-redux';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';

const EditCoverLetter = props => {
  const type = props?.route?.params?.type;
  console.log('🚀 EditCoverLetter ~ type yhi ho:', type);
  const cardData = props?.route?.params?.data;
  console.log("EditCoverLetter🚀 ~ cardData:", cardData)
  const tamplateType = props?.route?.params?.type;
  console.log("🚀 ~ tamplateType:", tamplateType)
  const token = useSelector(state => state.authReducer.token);

  const [personalDataTab, setPersonalDataTab] = useState(true);
  const [summary, setSummary] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [details, setDetails] = useState('');
  const [skillVisible, setSkillVisible] = useState(true);
  const [skills, setSkill] = useState([]);
  const [skillsVal, setSkillVal] = useState([]);
  const [phone, setphone] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(true);
  const [socialData, setSocialData] = useState(true);
  const [socialAccount, setSocialAccount] = useState('');
  const [experience, setexperience] = useState(true);
  const [Certificate, setCertificate] = useState(true);
  const [managerName, setManagerName] = useState('');
  const [companyName, setCompanyName] = useState(userData?.company_name);
  const [companyAddress, setCompanyAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [managerEmail, setManagerEmail] = useState(userData?.email);
  const [startDate, setJobTitle] = useState('');
  const [positonName, setpositonName] = useState('');
  const [experiencePlaceName, setexperiencePlaceName] = useState('');
  const [DateofJoining, setDateofJoining] = useState('');
  const [DateofEnding, setDateofEnding] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [summaryDetails, setsummaryDetails] = useState('');
  const [logoImageModal, setLogoImageModal] = useState(false);
  const [image, setImage] = useState({});
  console.log('🚀 ~ image:', image);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ userData:", userData)

  const onPressConfirm = async () => {
    console.log('yaahaa a rha ha')
    const data = {
      name: name,
      email: email,
      month: month,
      summary: details,
      address: address,
      details: details,
      phone: phone,
      managerName: managerName,
      companyName: companyName,
      companyAddress: companyAddress,
      subject: subject,
      date: date,
      tamplate_title: cardData?.heading,
      tamplate_image: null,
      tamplate_description: cardData?.description,
      template_id: cardData?.id
    };
    const body = {
      name: name,
      phone: phone,
      summary: details,
      date: date,
      details: details,
      managerName: managerName,
      subject: subject,
      email: userData?.email,
      tamplate_title: cardData?.heading,
      tamplate_image: null,
      tamplate_description: cardData?.description,
      template_id: cardData?.id
    };
    const details = {
      companyName: companyName,
      companyAddress: companyAddress,
      managerEmail: managerEmail,
      managerName: managerName,
      positonName: positonName,
      startDate: startDate,
      image: image,
      tamplate_title: cardData?.heading,
      tamplate_image: null,
      tamplate_description: cardData?.description,
      template_id: cardData?.id
    }
    tamplateType === 'companyEmail'
      ? navigationService.navigate(cardData?.key, { data: details })
      : type === 'email'
        ? navigationService.navigate(cardData?.key, { data: body })
        : navigationService.navigate(cardData?.key, { data: data });
  };


  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header
        title={type == 'email' ? 'edit email' : 'Edit Email'}
        hideUser={true}
        showBack={true}
      />
      <View style={styles.main_view}>
        <ScrollView keyboardShouldPersistTaps={'never'} showsVerticalScrollIndicator={false}>
          {type == 'email' ? (
            <>
              {tamplateType === 'companyEmail' ? (
                <>
                  <View>
                    <CustomText
                      isBold
                      style={[
                        styles.text,
                        {
                          color: Color.white,
                        },
                      ]}>
                      company Logo :
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => setLogoImageModal(true)}
                      style={{
                        width: windowWidth * 0.3,
                        height: windowWidth * 0.3,
                        backgroundColor: Color.lightGrey,
                        borderRadius: moderateScale(10, 0.6),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CustomImage
                        source={
                          Object.keys(image).length > 0
                            ? { uri: image.uri }
                            : require('../Assets/Images/no_image.jpg')
                        }
                        style={{ width: '100%', height: '100%' }}
                      />
                    </TouchableOpacity>
                  </View>
                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    company Name :
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={userData?.company_detail?.company_name}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setCompanyName}
                    value={companyName}
                  />
                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    company Website :
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Enter your company website url '}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setCompanyAddress}
                    value={companyAddress}
                  />
                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    Manager Name
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Enter your Manager Name '}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setManagerName}
                    value={managerName}
                  />
                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    Manager Email
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Enter your Manager Email '}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setManagerEmail}
                    value={managerEmail}
                  />
                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    Job title
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Enter your   Job title'}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setpositonName}
                    value={positonName}
                  />

                  <CustomText
                    isBold
                    style={[
                      styles.text,
                      {
                        color: Color.white,
                      },
                    ]}>
                    Start Date
                  </CustomText>
                  <TextInputWithTitle
                    iconSize={moderateScale(20, 0.3)}
                    color={Color.blue}
                    placeholder={'Start Date '}
                    placeholderColor={Color.grey}
                    viewWidth={0.84}
                    marginTop={moderateScale(10, 0.3)}
                    style={styles.text_input}
                    backgroundColor={Color.lightGrey}
                    setText={setDateofJoining}
                    value={DateofJoining}
                  />
                </>
              ) : (
                <>
                  <View
                    style={[
                      styles.btn_view,
                      {
                        height:
                          personalDataTab === true
                            ? windowHeight * 0.11
                            : windowHeight * 0.56,
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
                          Personal Data
                        </CustomText>
                        <CustomText style={styles.btn_sub_txt}>
                          Complete your personal Data make your resume even
                          better
                        </CustomText>
                      </View>
                      <Icon
                        name="down"
                        onPress={() => setPersonalDataTab(!personalDataTab)}
                        as={AntDesign}
                        color={Color.black}
                        size={moderateScale(18, 0.6)}
                      />
                    </View>
                    {personalDataTab === false && (
                      <>
                        <CustomText isBold style={styles.text}>
                          Name :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter your full name '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setName}
                          value={name}
                        />
                        <CustomText isBold style={styles.text}>
                          Email :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter your email '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setEmail}
                          value={email}
                        />
                        <CustomText isBold style={styles.text}>
                          Address :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter your Address '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setAddress}
                          value={address}
                        />
                        {/* <CustomText isBold style={styles.text}>
                      {' '}
                      city :
                    </CustomText>
                    <View style={styles.row_view}>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          city
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'city'}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setCity}
                          value={city}
                        />
                      </View>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          state
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'state'}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setMonth}
                          value={month}
                        />
                      </View>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          zip code
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'40202 '}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setYear}
                          value={year}
                        />
                      </View>
                    </View> */}
                        <CustomText isBold style={styles.text}>
                          Phone Number :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter your Phone Number'}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setphone}
                          value={phone}
                        />
                      </>
                    )}
                  </View>
                  <View
                    style={[
                      styles.btn_view,
                      {
                        height:
                          summary === true
                            ? windowHeight * 0.11
                            : windowHeight * 0.33,
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
                          description
                        </CustomText>
                        <CustomText
                          style={[
                            styles.btn_sub_txt,
                            {
                              color: Color.veryLightGray,
                              width: windowWidth * 0.8,
                              marginTop: moderateScale(15, 0.6),
                            },
                          ]}>
                          Enter a brief description of your professional
                          background of your choosen specific skill.
                        </CustomText>
                      </View>
                      <Icon
                        name="down"
                        onPress={() => setSummary(!summary)}
                        as={AntDesign}
                        color={Color.black}
                        size={moderateScale(18, 0.6)}
                      />
                    </View>
                    {summary === false && (
                      <>
                        <CustomText isBold style={styles.text}>
                          Summary :
                        </CustomText>
                      </>
                    )}
                  </View>
                  <View
                    style={[
                      styles.btn_view,
                      {
                        height:
                          Certificate === true
                            ? windowHeight * 0.09
                            : windowHeight * 0.43,
                        marginTop: moderateScale(15, 0.6),
                        alignSelf: 'center',
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
                          subject
                        </CustomText>
                        <CustomText
                          style={[
                            styles.btn_sub_txt,
                            {
                              color: Color.veryLightGray,
                              width: windowWidth * 0.8,
                            },
                          ]}>
                          Enter your subject for cover Letter
                        </CustomText>
                      </View>
                      <Icon
                        name="down"
                        onPress={() => setCertificate(!Certificate)}
                        as={AntDesign}
                        color={Color.black}
                        size={moderateScale(18, 0.6)}
                      />
                    </View>
                    {Certificate === false && (
                      <>
                        <CustomText isBold style={styles.text}>
                          subject :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter subject '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setSubject}
                          value={subject}
                        />
                        <CustomText isBold style={styles.text}>
                          date :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter date '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setDate}
                          value={date}
                        />
                        <CustomText isBold style={styles.text}>
                          manager name :
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'Enter manager name '}
                          placeholderColor={Color.grey}
                          viewWidth={0.84}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setManagerName}
                          value={managerName}
                        />
                      </>
                    )}
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      personalDataTab === true
                        ? windowHeight * 0.11
                        : windowHeight * 0.7,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // alignItems :'center'
                  }}>
                  <View>
                    <CustomText isBold style={styles.btn_txt}>
                      Personal Data
                    </CustomText>
                    <CustomText style={styles.btn_sub_txt}>
                      Complete your personal Data make your resume even better
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setPersonalDataTab(!personalDataTab)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {personalDataTab === false && (
                  <>
                    <CustomText isBold style={styles.text}>
                      Name :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={"Enter Employee's name "}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setName}
                      value={name}
                    />
                    <CustomText isBold style={styles.text}>
                      Email :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter Employee email '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setEmail}
                      value={email}
                    />
                    <CustomText isBold style={styles.text}>
                      Address :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter Employee Address '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setAddress}
                      value={address}
                    />
                    <CustomText isBold style={styles.text}>
                      {' '}
                      city :
                    </CustomText>
                    <View style={styles.row_view}>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          city
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'city'}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setCity}
                          value={city}
                        />
                      </View>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          state
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'state'}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setMonth}
                          value={month}
                        />
                      </View>
                      <View>
                        <CustomText isBold style={styles.sub_text}>
                          zip code
                        </CustomText>
                        <TextInputWithTitle
                          iconSize={moderateScale(20, 0.3)}
                          color={Color.blue}
                          placeholder={'40202 '}
                          placeholderColor={Color.grey}
                          viewWidth={0.25}
                          marginTop={moderateScale(10, 0.3)}
                          style={styles.text_input}
                          backgroundColor={Color.lightGrey}
                          setText={setYear}
                          value={year}
                        />
                      </View>
                    </View>
                    <CustomText isBold style={styles.text}>
                      Phone Number :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter Employee Phone Number'}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setphone}
                      value={phone}
                    />
                  </>
                )}
              </View>
              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      summary === true
                        ? windowHeight * 0.11
                        : windowHeight * 0.36,
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
                      description
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter a brief description of your professional background
                      of your choosen specific skill.
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setSummary(!summary)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {summary === false && (
                  <>
                    <CustomText isBold style={styles.text}>
                      Summary :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Details'}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      inputHeight={windowHeight * 0.15}
                      viewHeight={0.15}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setDetails}
                      value={details}
                      multiline
                    />
                  </>
                )}
              </View>
              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      companyInfo === true
                        ? windowHeight * 0.10
                        : windowHeight * 0.4,
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
                      company info
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter info of company
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setCompanyInfo(!companyInfo)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {companyInfo === false && (
                  <>
                    <CustomText isBold style={styles.text}>
                      manager full name :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter manager full name '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setManagerName}
                      value={managerName}
                    />
                    <CustomText isBold style={styles.text}>
                      company Name
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={userData?.company_detail?.company_name}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setCompanyName}
                      value={companyName}
                      disable
                    />
                    <CustomText isBold style={styles.text}>
                      company address
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={userData?.company_detail?.company_address}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setCompanyAddress}
                      value={companyAddress}
                      disable
                    />
                    {/* <CustomText isBold style={styles.text}>
                      city
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter city'}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setCompanyCity}
                      value={companyCity}
                    /> */}
                  </>
                )}
              </View>

              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      Certificate === true
                        ? windowHeight * 0.09
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
                      subject
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter your subject for cover Letter
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setCertificate(!Certificate)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {Certificate === false && (
                  <>
                    <CustomText isBold style={styles.text}>
                      subject :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter subject '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setSubject}
                      value={subject}
                    />
                    <CustomText isBold style={styles.text}>
                      date :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter date '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setDate}
                      value={date}
                    />
                    {/* <CustomText isBold style={styles.text}>Certificate Place Name</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Place name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setCertificatPlaceName}
                                    value={CertificatePlaceName}
                                />
                                <CustomText isBold style={styles.text}>Year</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Year '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setCertificatYear}
                                    value={CertificatYear}
                                /> */}
                  </>
                )}
              </View>

              <View
                style={[
                  styles.btn_view,
                  {
                    height:
                      socialData === true
                        ? windowHeight * 0.09
                        : windowHeight * 0.2,
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
                      social Data
                    </CustomText>
                    <CustomText
                      style={[
                        styles.btn_sub_txt,
                        {
                          color: Color.veryLightGray,
                          width: windowWidth * 0.8,
                        },
                      ]}>
                      Enter your social Data
                    </CustomText>
                  </View>
                  <Icon
                    name="down"
                    onPress={() => setSocialData(!socialData)}
                    as={AntDesign}
                    color={Color.black}
                    size={moderateScale(18, 0.6)}
                  />
                </View>
                {socialData === false && (
                  <>
                    <CustomText isBold style={styles.text}>
                      linkdin id :
                    </CustomText>
                    <TextInputWithTitle
                      iconSize={moderateScale(20, 0.3)}
                      color={Color.blue}
                      placeholder={'Enter your user name '}
                      placeholderColor={Color.grey}
                      viewWidth={0.84}
                      marginTop={moderateScale(10, 0.3)}
                      style={styles.text_input}
                      backgroundColor={Color.lightGrey}
                      setText={setSocialAccount}
                      value={socialAccount}
                    />
                  </>
                )}
              </View>
            </>
          )}
          <CustomButton
            text={'confirm'}
            textColor={Color.darkBlue}
            onPress={() => {
              // onPressConfirm();
              tamplateType === 'companyEmail' || 'attendencepolicy'
                ? navigationService.navigate(cardData?.key, {
                  data: {
                    name: name,
                    email: email,
                    month: month,
                    summary: '',
                    address: address,
                    details: details,
                    managerName: managerName,
                    companyName: companyName,
                    companyAddress: companyAddress,
                    subject: subject,
                    date: date,
                    tamplate_title: cardData?.heading,
                    tamplate_image: null,
                    tamplate_description: cardData?.description,
                    template_id: cardData?.id
                  },
                })
                : onPressConfirm();
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

export default EditCoverLetter;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
  },
  main_view: {
    width: windowWidth,
    height: windowHeight * 0.9,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    alignItems: 'center',
  },
  btn_view: {
    width: windowWidth * 0.9,
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
