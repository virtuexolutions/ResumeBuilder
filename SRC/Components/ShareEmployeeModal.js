import { ActivityIndicator, Alert, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import { useIsFocused } from '@react-navigation/core';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo'
import DropDown from './DropDown';
import CustomButton from './CustomButton';
const ShareEmployeeModal = props => {
    let { show, setShow, template_id } = props;
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ token:", token)
    const [employee, setEmployee] = useState([])
    console.log("🚀 ~ employee:", employee)
    const [loading, setLoading] = useState(false)
    const [share_loading, setShareLoading] = useState(false)
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ userData:", userData)
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    console.log("🚀 ~ selectedEmployees:", selectedEmployees)
    const [departments, setDepartments] = useState({})
    const [selectedCabCategory, setSelectedCabCategory] = useState(null)
    console.log("🚀 ~ selectedCabCategory:", selectedCabCategory)
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    console.log("🚀 ~ filteredEmployees:", filteredEmployees)

    useEffect(() => {
        getEmployees()
        getDepartments()
    }, [isFocused])


    useEffect(() => {
        if (selectedCabCategory) {
            const filtered = employee.filter(emp => emp.department_id === selectedCabCategory.id);
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees([]);
        }
    }, [selectedCabCategory, employee]);

    const getEmployees = async () => {
        const url = `auth/employee_list/${userData?.company_detail?.id}`
        setLoading(true)
        console.log("🚀 ~ getEmployees ~ url:", url)
        const response = await Get(url, token)
        console.log("🚀 ~ getDepartments ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setEmployee(response?.data?.employee_list)
        }
        else {
            setLoading(false)
        }
    }


    const getDepartments = async () => {
        const url = 'auth/department_list'
        const response = await Get(url, token)
        if (response?.data != undefined) {
            setDepartments(response?.data?.data)
        }
    }


    const isAllSelected = selectedEmployees.length === employee.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedEmployees([]);
        } else {
            const allIds = employee.map(emp => emp.id);
            setSelectedEmployees(allIds);
        }
    };


    const toggleEmployee = (id) => {
        if (selectedEmployees.includes(id)) {
            setSelectedEmployees(prev => prev.filter(empId => empId !== id));
        } else {
            setSelectedEmployees(prev => [...prev, id]);
        }
    };


    const SendTamplate = async () => {
        const url = 'auth/template_assign'
        setShareLoading(true)
        const data = {
            assignable_id: template_id,
            employee_id: selectedEmployees,
            form: 0,
            assignable_type: 'mail'
        }
        console.log("🚀 ~ SendTamplate ~ data:", data)
        const response = await Post(url, data, apiHeader(token))
        console.log("🚀 ~ SendTamplate ~ response:", response?.data)
        setShareLoading(false)
        if (response?.data != undefined) {
            setShareLoading(false)
            setShow(false)
            Platform.OS == 'android'
                ? ToastAndroid.show('Send Successfully', ToastAndroid.SHORT)
                : Alert.alert(' Send SuccessFully');
        }
    }

    return (
        <Modal
            isVisible={show}
            swipeDirection="up"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onBackdropPress={() => {
                setShow(false);
            }}>
            <View style={styles.main_view}>
                <CustomText isBold style={styles.heading}>Select the Employees</CustomText>
                <CustomText isBold style={[styles.row_heading, { marginTop: moderateScale(10, 0.6) }]}>Select Deparment</CustomText>
                <DropDown
                    width={windowWidth * 0.82}
                    array={departments}
                    data={selectedCabCategory}
                    setData={setSelectedCabCategory}
                    placeHolder="Select Department"
                    labelKey="department_name"
                />
                <View style={[styles.row_view, { marginTop: moderateScale(20, 0.6) }]}>
                    <CustomText isBold style={styles.row_heading}>All Employees</CustomText>
                    <View style={styles.row_view}>
                        <TouchableOpacity style={styles.checkBox} onPress={toggleSelectAll}>
                            {isAllSelected && (
                                <Icon name='check' as={Entypo} size={moderateScale(20, 0.6)} color={Color.themeBlue} />
                            )}
                        </TouchableOpacity>
                        <CustomText style={styles.row_text}>Select All</CustomText>
                    </View>
                </View>
                {filteredEmployees.map((item) => {
                    const isSelected = selectedEmployees.includes(item.id);
                    return (
                        <View key={item.id} style={styles.employee_list_view}>
                            <TouchableOpacity style={styles.checkBox} onPress={() => toggleEmployee(item.id)}>
                                {isSelected && (
                                    <Icon name='check' as={Entypo} size={moderateScale(20, 0.6)} color={Color.themeBlue} />
                                )}
                            </TouchableOpacity>
                            <View>
                                <CustomText style={styles.row_text}>{item?.full_name}</CustomText>
                                <CustomText style={styles.row_text}>{item?.designation}</CustomText>
                            </View>
                        </View>
                    );
                })}

                <CustomButton
                    onPress={() => SendTamplate()}
                    text={share_loading ?
                        <ActivityIndicator size={'small'} color={Color.white} /> :
                        'Send'
                    }
                    fontSize={moderateScale(12, 0.3)}
                    textColor={Color.white}
                    borderRadius={moderateScale(30, 0.3)}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.065}
                    marginTop={moderateScale(20, 0.3)}
                    bgColor={
                        Color.themeBlue
                    }
                    isBold
                    elevation
                    style={{
                        position: 'absolute',
                        bottom: 10
                    }}
                />
            </View>
        </Modal>
    )
}

export default ShareEmployeeModal

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.6,
        backgroundColor: Color.white,
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    heading: {
        fontSize: moderateScale(20, 0.6),
        color: Color.themeBlue,
        textAlign: 'center'
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row_heading: {
        fontSize: moderateScale(15, 0.6),
        color: Color.black
    },
    row_text: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray,
    },
    checkBox: {
        width: moderateScale(20, 0.6),
        height: moderateScale(20, 0.6),
        // backgroundColor: 'red',
        marginRight: moderateScale(5, 0.6),
        borderWidth: 1,
        borderRadius: moderateScale(2, 0.6),
        borderColor: Color.veryLightGray
    },
    employee_list_view: {
        marginTop: moderateScale(10, 0.6),
        width: windowWidth * 0.82,
        height: windowWidth * 0.15,
        backgroundColor: Color.lightGrey,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
        flexDirection: 'row',
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center'
    }
})