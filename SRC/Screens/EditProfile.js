import { ActivityIndicator, Alert, FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomButton from '../Components/CustomButton'
import CustomImage from '../Components/CustomImage'
import { Icon } from 'native-base'
import ImagePickerModal from '../Components/ImagePickerModal'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useDispatch, useSelector } from 'react-redux'
import navigationService from '../navigationService'
import { setUserData } from '../Store/slices/common'
import FormWrapper from '../Components/FormWrapper'
import CustomText from '../Components/CustomText'
import { date } from 'yup'
import { baseUrl, imageUrl, profilePicUrl } from '../Config'

const EditProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ EditProfile ~ token:", token)
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState(null)
  console.log("🚀 ~ EditProfile ~ image:", image)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ EditProfile ~ userData:", userData)
  const [skills, setSkill] = useState([])
  console.log("🚀 ~ EditProfile ~ skills:", `${baseUrl}/${userData.photo}`)
  const [skillsVal, setSkillVal] = useState([])
  const [dateofBirth, setDateOfBirth] = useState('')

  const onPressSubmit = async () => {
    const formData = new FormData();
    const url = 'auth/profile';

    formData.append('date_of_birth', dateofBirth);
    formData.append('address', address);
    formData.append('phone', phoneNumber);
    formData.append('full_name', name);

    skills.forEach((item, index) => {
      formData.append(`skills[${index}]`, item);
    });

    if (image?.uri) {
      formData.append('photo', {
        uri: image.uri,
        name: image.fileName || 'photo.jpg',
        type: image.type || 'image/jpeg',
      });
    }

    console.log("🚀 ~ onPressSubmit ~ formData:", formData)
    setLoading(true);
    const response = await Post(url, formData, apiHeader(token, true));
    setLoading(false);
    console.log("🚀 EditProfile ~ response:", response?.data);
    if (response !== undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Profile Edit Successfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Edit Successfully');
      navigationService.navigate('MyDrawer');
      dispatch(setUserData(response?.data?.user_info));
    }
  };


  const handleDelete = (itemToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== itemToRemove);
    setSkill(updatedSkills);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack hideUser={false} title={'Edit Profile'} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.main_view}>
          <FormWrapper>
            <TouchableOpacity onPress={() => setShowModal(true)} style={{
              width: windowWidth * 0.3,
              height: windowWidth * 0.3,
              borderWidth: 1.5,
              borderColor: Color.themeBlue,
              borderRadius: windowWidth,
              alignSelf: 'center'
            }}>
              <CustomImage
                onPress={() => setShowModal(true)}
                source={
                  userData?.photo
                    ? { uri: `${baseUrl}/${userData.photo}` }
                    : image?.uri
                      ? { uri: image.uri }
                      : require('../Assets/Images/no_image.jpg')
                }
                style={styles.image}
              />
              <View style={{
                width: moderateScale(30, 0.6),
                height: moderateScale(30, 0.6),
                backgroundColor: Color.themeBlue,
                borderRadius: windowWidth,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: -10,
                right: 10
              }}>
                <Icon name='edit' as={Feather} size={moderateScale(15, 0.6)} color={Color.white} />
              </View>
            </TouchableOpacity>
            <TextInputWithTitle
              title={"Enter your Name : "}
              iconName={'person'}
              iconType={Ionicons}
              color={Color.veryLightGray}
              setText={setName}
              value={name}
              placeholder={userData?.employee_detail?.full_name}
              placeholderColor={Color.veryLightGray}
              viewWidth={0.9}
              viewHeight={0.060}
              border={1}
              borderRadius={moderateScale(10, 0.6)}
              borderColor={Color.themeBlue}
            />
            <TextInputWithTitle
              title={"Enter contact Number : "}
              iconName={'phone'}
              iconType={Feather}
              color={Color.veryLightGray}
              setText={setPhoneNumber}
              value={phoneNumber}
              placeholder={userData?.phone ? userData?.phone : 'phone number'}
              placeholderColor={Color.veryLightGray}
              viewWidth={0.9}
              viewHeight={0.060}
              border={1}
              borderRadius={moderateScale(10, 0.6)}
              borderColor={Color.themeBlue}
              keyboardType={'numeric'}

            />
            <TextInputWithTitle
              title={"Email Address : "}
              iconName={'mail'}
              iconType={Ionicons}
              color={Color.veryLightGray}
              setText={setEmail}
              value={email}
              placeholder={userData?.email}
              placeholderColor={Color.veryLightGray}
              viewWidth={0.9}
              viewHeight={0.060}
              border={1}
              borderRadius={moderateScale(10, 0.6)}
              borderColor={Color.themeBlue}
              disable
            />
            <TextInputWithTitle
              title={"Enter Address"}
              iconName={'work'}
              iconType={MaterialIcons}
              color={Color.veryLightGray}
              setText={setAddress}
              value={address}
              placeholder={userData?.address ? userData?.address : 'Address'}
              placeholderColor={Color.veryLightGray}
              viewWidth={0.9}
              viewHeight={0.060}
              border={1}
              borderRadius={moderateScale(10, 0.6)}
              borderColor={Color.themeBlue}
            />
            <TextInputWithTitle
              title={"Enter Date Of Birth"}
              iconName={'date'}
              iconType={Fontisto}
              color={Color.veryLightGray}
              setText={setDateOfBirth}
              value={dateofBirth}
              placeholder={userData?.date_of_birth ? userData?.date_of_birth : "Date of Birth"}
              placeholderColor={Color.veryLightGray}
              viewWidth={0.9}
              viewHeight={0.060}
              border={1}
              borderRadius={moderateScale(10, 0.6)}
              borderColor={Color.themeBlue}
            />
            <CustomText isBold
              style={[
                {
                  color: Color.black,
                  fontSize: moderateScale(15, 0.3),
                  marginBottom: moderateScale(5, 0.3),
                  width: windowWidth,
                  paddingHorizontal: moderateScale(10, 0.6),
                  marginTop: moderateScale(10, 0.3),
                  textAlign: 'left'
                },
              ]}>
              Skills
            </CustomText>
            <View style={{
              flexDirection: 'row',
              width: windowWidth * 0.9,
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
              <TextInputWithTitle
                iconSize={moderateScale(20, 0.3)}
                color={Color.blue}
                placeholder={'skills'}
                placeholderColor={Color.veryLightGray}
                viewWidth={0.62}
                viewHeight={0.060}
                border={1}
                borderRadius={moderateScale(10, 0.6)}
                borderColor={Color.themeBlue}
                setText={setSkillVal}
                value={skillsVal}
              />
              <CustomButton
                text={'Add'}
                textColor={Color.white}
                onPress={() => {
                  setSkill([...skills, skillsVal])
                }}
                width={windowWidth * 0.25}
                height={windowHeight * 0.060}
                borderRadius={moderateScale(20, 0.3)}
                bgColor={Color.themeBlue}
              />
            </View>
            <FlatList numColumns={3} data={skills} renderItem={({ item }) => {
              return (
                <View style={{
                  backgroundColor: Color.lightGrey,
                  width: windowWidth * 0.26,
                  marginRight: moderateScale(10, 0.6),
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: moderateScale(30, 0.6),
                  borderRadius: moderateScale(30, 0.6),
                  marginTop: moderateScale(6, 0.6),
                  flexDirection: 'row',
                  paddingHorizontal: moderateScale(8, 0.6)
                }}>
                  <CustomText style={{
                    color: Color.blue,
                    fontSize: moderateScale(10, 0.6)
                  }}>{item}</CustomText>
                  <Icon name='cross' as={Entypo} color={Color.red} size={moderateScale(18, 0.6)} onPress={() => handleDelete(item)} />
                </View>
              )
            }} />
            <CustomButton
              text={loading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Submit'}
              width={windowWidth * 0.9}
              height={windowHeight * 0.055}
              borderRadius={moderateScale(10, 0.3)}
              textColor={Color.white}
              bgColor={Color.themeBlue}
              marginTop={moderateScale(40, 0.6)}
              onPress={() => {
                onPressSubmit()
              }}
            />
          </FormWrapper>
        </View>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: moderateScale(15, 0.3),
    // paddingVertical: moderateScale(20, 0.6),
    alignItems: 'center',
    paddingTop: moderateScale(10, 0.6),
    // justifyContent : 'center'
  },
  main_view: {
    paddingVertical: moderateScale(10, 0.6),
    // paddingHorizontal: moderateScale(15, 0.6)
  },
  search_bar_view: {
    width: windowWidth * 0.94,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: moderateScale(10, 0.6)
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: windowWidth
  }
})