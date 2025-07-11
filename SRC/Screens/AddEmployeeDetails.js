import { ActivityIndicator, Alert, FlatList, I18nManager, Platform, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomButton from '../Components/CustomButton'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import navigationService from '../navigationService'
import DropDown from '../Components/DropDown'
import { useIsFocused } from '@react-navigation/core'
import CustomText from '../Components/CustomText'
import FormWrapper from '../Components/FormWrapper'

const AddEmployeeDetails = () => {
    const isFocused = useIsFocused()
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [joining_date, setJoiningDate] = useState('');
    const [salary, setSalary] = useState(0);
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ AddEmployeeDetails ~ token:", token)
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState({})
    const [selectedCabCategory, setSelectedCabCategory] = useState(null)
    console.log("🚀 ~ AddEmployeeDetails ~ selectedCabCategory:", selectedCabCategory)
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ AddEmployeeDetails ~ userData:", userData)

    useEffect(() => {
        getDepartments()
    }, [isFocused])

    const getDepartments = async () => {
        const url = 'auth/department_list'
        const response = await Get(url, token)
        if (response?.data != undefined) {
            setDepartments(response?.data?.data)
        }
    }

    const onPressSubmit = async () => {
        const url = 'auth/add_employee'
        const body = {
            password: password,
            full_name: fullName,
            employee_email: email,
            employee_phone_number: phone1,
            confirm_password: password,
            department_id: selectedCabCategory?.id,
            designation: designation,
            joining_date: joining_date,
            salary: salary,
            company_id: userData?.company_detail?.id
        }
        console.log("🚀 ~ onPressSubmit ~ body:", body)
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        console.log("🚀 ~ onPressSubmit ~ response:", response?.data)
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            Platform.OS == 'android'
                ? ToastAndroid.show('Employee Added SuccessFully', ToastAndroid.SHORT)
                : Alert.alert('Employee Added SuccessFully');
            navigationService.navigate('AddEmployees');
        } else {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={'Add Employee'} isRight />
            <ScrollView style={
                styles.scrollView
            }>
                <View style={styles.main_view}>
                    <FormWrapper>

                        <TextInputWithTitle
                            title={"Enter Employee's Full Name : "}
                            iconName={'person'}
                            iconType={Ionicons}
                            color={Color.veryLightGray}
                            setText={setFullName}
                            value={fullName}
                            placeholder={'Full Name'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />

                        <TextInputWithTitle
                            title={"Enter Employee's Email Address : "}
                            iconName={'mail'}
                            iconType={Ionicons}
                            color={Color.veryLightGray}
                            setText={setEmail}
                            value={email}
                            placeholder={'Email Address'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />

                        <TextInputWithTitle
                            title={"Enter Employee's Password : "}
                            iconName={'lock'}
                            iconType={Feather}
                            color={Color.veryLightGray}
                            setText={setPassword}
                            value={password}
                            placeholder={'password'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />


                        <TextInputWithTitle
                            title={"Enter Employee's Phone Number : "}
                            iconName={'phone'}
                            iconType={Feather}
                            color={Color.veryLightGray}
                            setText={setPhone1}
                            value={phone1}
                            placeholder={'Phone Number'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />


                        <TextInputWithTitle
                            title={"Enter Employee's Salary : "}
                            iconName={'money'}
                            iconType={FontAwesome}
                            color={Color.veryLightGray}
                            setText={setSalary}
                            value={salary}
                            placeholder={'salary'}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />

                        <TextInputWithTitle
                            title={"Enter Joing Date : "}
                            iconName={'date'}
                            iconType={Fontisto}
                            color={Color.veryLightGray}
                            setText={setJoiningDate}
                            value={joining_date}
                            placeholder={'joining date '}
                            placeholderColor={Color.veryLightGray}
                            viewWidth={0.9}
                            viewHeight={0.060}
                            border={1}
                            borderRadius={moderateScale(10, 0.6)}
                            borderColor={Color.themeBlue}
                        />

                        <TextInputWithTitle
                            title={"Enter Designation Name : "}
                            iconName={'work'}
                            iconType={MaterialIcons}
                            color={Color.veryLightGray}
                            setText={setDesignation}
                            value={designation}
                            placeholder={'Designation Name'}
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
                            select department
                        </CustomText>
                    </FormWrapper>
                    <DropDown
                        array={departments}
                        data={selectedCabCategory}
                        setData={setSelectedCabCategory}
                        placeHolder="Select Department"
                        labelKey="department_name"
                    />
                    <CustomButton
                        text={loading ? <ActivityIndicator style={styles.indicatorStyle}
                            size="small"
                            color={Color.white} /> : 'Submit'}
                        width={windowWidth * 0.9}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddEmployeeDetails

const styles = StyleSheet.create({
    scrollView: {
        width: windowWidth,
        height: windowHeight
    },
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
        paddingHorizontal: moderateScale(15, 0.6)
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    indicatorStyle: {
        paddingRight: 5,
        paddingLeft: I18nManager.isRTL ? 5 : 0,
    },
})