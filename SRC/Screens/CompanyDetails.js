import { ActivityIndicator, Alert, FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton'
import CustomImage from '../Components/CustomImage'
import { Icon } from 'native-base'
import ImagePickerModal from '../Components/ImagePickerModal'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useDispatch, useSelector } from 'react-redux'
import navigationService from '../navigationService'
import { setUserData } from '../Store/slices/common'
import FormWrapper from '../Components/FormWrapper'

const CompanyDetails = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    const [showModal, setShowModal] = useState(false)
    const [image, setImage] = useState(null)
    const [company_name, setCompanyName] = useState('')
    const [bussiness_type, setBussinessType] = useState('')
    const [industry, setIndustry] = useState('')
    const [contact_number, setCoontactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [website_url, setWebsiteUrl] = useState('')
    const [company_address, setCompanyAddress] = useState('')
    const [number_of_employees, setNumberOfEmployees] = useState('')
    const [tax_verification_number, setVerificationNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.commonReducer.userData);

    const onPressSubmit = async () => {
        const formData = new FormData();

        const url = 'auth/add_company'

        formData.append('company_name', company_name ? company_name : userData?.company_detail?.company_name);
        formData.append('business_type', bussiness_type ? bussiness_type : userData?.company_detail?.business_type);
        formData.append('industry', industry ? industry : userData?.company_detail?.industry);
        formData.append('company_number', contact_number ? contact_number : userData?.company_detail?.company_number);
        formData.append('business_email_address', email ? email : userData?.company_detail?.business_email_address);
        formData.append('business_phone_number', contact_number ? contact_number : userData?.company_detail?.company_number);
        formData.append('website_url', website_url ? website_url : userData?.company_detail?.website_url);
        formData.append('company_address', company_address ? company_address : userData?.company_detail?.company_address);
        formData.append('number_of_employees', number_of_employees ? number_of_employees : userData?.company_detail?.number_of_employees);
        formData.append('tax_identification_number', 0);

        if (image?.uri) {
            formData.append('company_logo', {
                uri: image.uri,
                name: image.fileName || 'photo.jpg',
                type: image.type || 'image/jpeg',
            });
        }

        setLoading(true)
        const response = await Post(url, formData, apiHeader(token, true))
        console.log("🚀 ~ onPressSubmit ~ response:", response?.data)
        if (response != undefined) {
            Platform.OS == 'android'
                ? ToastAndroid.show('Company added Successfully', ToastAndroid.SHORT)
                : Alert.alert('Company added Successfully');
            navigationService.navigate('MyDrawer')
            dispatch(setUserData(response?.data?.user_info));
        }
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={'Add Company Details'} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.main_view}>
                    <FormWrapper>
                        <TouchableOpacity onPress={() => setShowModal(true)} style={{
                            width: windowWidth * 0.6,
                            height: windowWidth * 0.3,
                            borderWidth: 1.5,
                            borderColor: Color.themeBlue,
                        }}>
                            <CustomImage
                                onPress={() => setShowModal(true)}
                                source={
                                    !image || !image.uri
                                        ? require('../Assets/Images/no_image.jpg')
                                        : { uri: image.uri }
                                }
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <TextInputWithTitle
                            title={"Enter Company Name : "}
                            iconName={'person'}
                            iconType={Ionicons}
                            color={Color.veryLightGray}
                            setText={setCompanyName}
                            value={company_name}
                            placeholder={userData?.company_detail?.company_name ? userData?.company_detail?.company_name : 'company Name'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"Enter Bussiness Type: "}
                            // iconName={'mail'}
                            // iconType={Ionicons}
                            iconName={'work'}
                            iconType={MaterialIcons}
                            color={Color.veryLightGray}
                            setText={setBussinessType}
                            value={bussiness_type}
                            placeholder={userData?.company_detail?.business_type ? userData?.company_detail?.business_type : 'Email bussiness type'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"Enter Industry: "}
                            iconName={'building'}
                            iconType={FontAwesome5}
                            color={Color.veryLightGray}
                            setText={setIndustry}
                            value={industry}
                            placeholder={userData?.company_detail?.industry ? userData?.company_detail?.industry : 'industry'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}

                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"Enter Company contact Number : "}
                            iconName={'phone'}
                            iconType={Feather}
                            color={Color.veryLightGray}
                            setText={setCoontactNumber}
                            value={contact_number}
                            placeholder={userData?.company_detail?.company_number ? userData?.company_detail?.company_number : 'company contact Number'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"Enter Bussiness Email Address : "}
                            iconName={'mail'}
                            iconType={Ionicons}
                            color={Color.veryLightGray}
                            setText={setEmail}
                            value={email}
                            placeholder={userData?.company_detail?.business_email_address ? userData?.company_detail?.business_email_address : 'email address'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"enter website url"}
                            iconName={'work'}
                            iconType={MaterialIcons}
                            color={Color.veryLightGray}
                            setText={setWebsiteUrl}
                            value={website_url}
                            placeholder={userData?.company_detail?.website_url ? userData?.company_detail?.website_url : 'website url'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"enter company Address "}
                            iconName={'work'}
                            iconType={MaterialIcons}
                            color={Color.veryLightGray}
                            setText={setCompanyAddress}
                            value={company_address}
                            placeholder={userData?.company_detail?.company_address ? userData?.company_detail?.company_address : 'company address'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}

                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        <TextInputWithTitle
                            title={"enter Number of employees"}
                            iconName={'work'}
                            iconType={MaterialIcons}
                            color={Color.veryLightGray}
                            setText={setNumberOfEmployees}
                            value={number_of_employees}
                            placeholder={userData?.company_detail?.number_of_employees ? userData?.company_detail?.number_of_employees : 'number of employees'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.85}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />
                        {/* <TextInputWithTitle
                        title={"Enter tax indentification number"}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setVerificationNumber}
                        value={tax_verification_number}
                        placeholder={'website url'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    /> */}
                        <CustomButton
                            text={loading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Submit'}
                            width={windowWidth * 0.85}
                            height={windowHeight * 0.055}
                            borderRadius={moderateScale(10, 0.3)}
                            textColor={Color.white}
                            bgColor={Color.themeBlue}
                            marginTop={moderateScale(40, 0.6)}
                            onPress={() => {
                                // Login()
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

export default CompanyDetails

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
        height: '100%'
    }
})