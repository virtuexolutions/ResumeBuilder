import { useIsFocused } from '@react-navigation/core'
import moment from 'moment'
import { Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, I18nManager, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import CustomButton from '../Components/CustomButton'
import CustomText from '../Components/CustomText'
import DropDown from '../Components/DropDown'
import FormWrapper from '../Components/FormWrapper'
import Header from '../Components/Header'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import navigationService from '../navigationService'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'

const AddEmployeeDetails = (props) => {
    const { isDetails, data } = props?.route?.params;
    const isFocused = useIsFocused()
    const [fullName, setFullName] = useState(data?.full_name ? data?.full_name : "");
    const [email, setEmail] = useState(data?.employee_email ? data?.employee_email : '');
    const [phone1, setPhone1] = useState(data?.employee_phone_number ? data?.employee_phone_number : '');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState(data?.designation ? data?.designation : '');
    const [joining_date, setJoiningDate] = useState(data?.joining_date ? data?.joining_date : '');
    const [salary, setSalary] = useState(data?.salary ? data?.salary : 0);
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState({})
    const [selectedCabCategory, setSelectedCabCategory] = useState(null)
    const userData = useSelector(state => state.commonReducer.userData);
    const [date, setDate] = useState(new Date());
    console.log("🚀 ~ HomeScreen ~ date:", date)
    const [open, setOpen] = useState(false);

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
            joining_date: date,
            salary: salary,
            company_id: userData?.company_detail?.id
        }
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
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

    const onPressUpdate = async () => {
        const url = `auth/update_employee/${data?.id}`
        const body = {
            password: password,
            full_name: fullName,
            employee_email: email,
            employee_phone_number: phone1,
            confirm_password: password,
            department_id: data?.department_id,
            designation: designation,
            joining_date: date,
            salary: salary,
            company_id: userData?.company_detail?.id
        }
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            Platform.OS == 'android'
                ? ToastAndroid.show('Employee Update SuccessFully', ToastAndroid.SHORT)
                : Alert.alert('Employee Update SuccessFully');
            navigationService.navigate('AddEmployees');
        } else {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Header showBack hideUser={false} title={'Add Employee'} />
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
                        <CustomText isBold style={{
                            fontSize: moderateScale(15, 0.3),
                            marginBottom: moderateScale(5, 0.3),
                            width: windowWidth * props.viewWidth,
                            paddingHorizontal: moderateScale(10, 0.6),
                            marginTop: moderateScale(10, 0.3),
                            textAlign: 'left'
                        }}>Choose Joining Date</CustomText>
                        <TouchableOpacity onPress={() => setOpen(true)} style={{
                            width: windowWidth * 0.9,
                            height: windowHeight * 0.060,
                            borderRadius: moderateScale(10, 0.6),
                            // borderWidth: 1,
                            // borderColor: Color.themeBlue,
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            paddingHorizontal: moderateScale(15, 0.6),
                            backgroundColor: Color.lightGrey
                        }}>
                            <Icon name='calendar' as={Entypo} size={moderateScale(17, 0.3)} color={Color.veryLightGray} />
                            <CustomText style={{
                                marginLeft: moderateScale(15, 0.6),
                                color: Color.veryLightGray
                            }}>{date ? moment(date).format('DD MMM YYYY') : 'Choose Date'}</CustomText>
                        </TouchableOpacity>
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
                            color={Color.white} /> : isDetails ? 'Update' : 'Submit'}
                        width={windowWidth * 0.9}
                        height={windowHeight * 0.055}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.white}
                        bgColor={Color.themeBlue}
                        marginTop={moderateScale(40, 0.6)}
                        onPress={() => {
                            isDetails ? onPressUpdate() :
                                onPressSubmit()
                        }}
                    />
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                    }}
                    mode="date"
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            </ScrollView>
        </View>
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
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight
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