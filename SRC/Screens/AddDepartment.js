import { ActivityIndicator, Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomButton from '../Components/CustomButton'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import navigationService from '../navigationService'

const AddDepartment = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [numberOfEmployee, setNumberOfEmployee] = useState('');
    console.log("🚀 ~ AddDepartment ~ numberOfEmployee:", numberOfEmployee)
    const [employeeId, setEmployeeId] = useState('');
    const [department_type, setDepartmentType] = useState('');
    const [lead_name, setLeadName] = useState('');
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.commonReducer.userData);

    const onPressSubmit = async () => {
        const url = 'auth/add_department'
        const body = {
            department_name: fullName,
            department_type: department_type,
            lead_full_name: lead_name,
            lead_email_address: email,
            lead_contact_number: phone1,
            number_of_employees_in_depart: numberOfEmployee,
            company_id: userData?.company_detail?.id
        }
        console.log("🚀 ~ onPressSubmit ~ body:", body)
        setLoading(true)
        console.log("🚀 ~ onPressSubmit ~ apiHeader(token):", apiHeader(token))
        const response = await Post(url, body, apiHeader(token))
        setLoading(false)
        console.log("🚀 ~ onPressSubmit ~ response:", response?.data)
        if (response != undefined) {
            setLoading(false)
            Platform.OS == 'android'
                ? ToastAndroid.show('Deparment added successfully', ToastAndroid.SHORT)
                : Alert.alert('Deparment added successfully');
            navigationService.navigate('Department');
        } else {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} />
            <View style={styles.main_view}>
                <TextInputWithTitle
                    title={"Enter Department Name : "}
                    iconName={'building'}
                    iconType={FontAwesome5}
                    color={Color.veryLightGray}
                    setText={setFullName}
                    value={fullName}
                    placeholder={'Department Name'} 
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}   
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Department Type : "}
                    iconName={'building'}  
                    iconType={FontAwesome5}
                    color={Color.veryLightGray}
                    setText={setDepartmentType}
                    value={department_type}
                    placeholder={'Department Type'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Lead Name : "}
                    iconName={'person'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    setText={setLeadName}
                    value={lead_name}
                    placeholder={'Lead Name'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />

                <TextInputWithTitle
                    title={"Enter Lead Email Address :"}
                    iconName={'mail'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    setText={setEmail}
                    value={email}
                    placeholder={'lead email address'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />


                <TextInputWithTitle
                    title={"Enter Lead Phone Number : "}
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
                    title={"Enter Number of Employee in Depart"}
                    iconName={'person'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    value={numberOfEmployee}
                    setText={setNumberOfEmployee}
                    placeholder={'number of employee'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
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
                    style={{
                        position: 'absolute',
                        bottom: 10
                    }}
                    onPress={() => {
                        onPressSubmit()
                        // Login()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddDepartment

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
        paddingHorizontal: moderateScale(15, 0.6),
        height: windowHeight * 0.88,
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    }
})