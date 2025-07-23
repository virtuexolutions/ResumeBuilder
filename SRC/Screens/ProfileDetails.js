import dayjs from 'dayjs';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    // SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/en'; // or your preferred locale
import { Get } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import { baseUrl } from '../Config';
import navigationService from '../navigationService';


const ProfileDetails = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.commonReducer.userData);
    const token = useSelector(state => state.authReducer.token);

    const PointsView = ({ name, index }) => {
        return (
            <View key={index ? index : ''} style={[styles.row_view, {
                marginTop: moderateScale(8, 0.6)
            }]}>
                <View style={{
                    width: moderateScale(6, 0.6),
                    height: moderateScale(6, 0.6),
                    backgroundColor: Color.themeBlue,
                    borderRadius: windowWidth,
                    marginLeft: moderateScale(6, 0.6)
                }} />
                <CustomText style={[styles.text, { marginLeft: moderateScale(7, 0.6) }]}>
                    {name}
                </CustomText>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header isShadow={false} hideUser={false} showBack={false} headerColor={Color.themeBlue} backgroundColor={Color.themeBlue} />
            <ScrollView style={{ width: windowWidth, height: windowHeight * 0.9 }}>
                <View style={styles.header_view}>
                    <View style={styles.header_subview}>
                        <View style={styles.profile_view}>
                            <CustomImage source={
                                userData?.photo
                                    ? { uri: `${baseUrl}/${userData.photo}` }
                                    : require('../Assets/Images/no_image.jpg')
                            } style={styles.image_style} />
                        </View>
                        <View style={styles.text_view}>
                            <CustomText style={styles.subtextStyle}>{userData?.employee_detail?.full_name}</CustomText>
                            <CustomText isBold style={styles.heading}>{userData?.employee_detail?.designation + ' - ' + userData?.employee_detail?.department?.department_name}</CustomText>
                        </View>
                        <View style={styles.icon_view}>
                            <View style={styles.icon}>
                                <Icon name='mail' as={Feather} size={moderateScale(20, 0.3)}
                                    color={Color.themeBlue} />
                            </View>
                            <View style={styles.icon}>
                                <Icon name='call-outline' as={Ionicons} size={moderateScale(20, 0.3)}
                                    color={Color.themeBlue} />
                            </View>
                            <View style={styles.icon}>
                                <Icon name='building' as={FontAwesome5} size={moderateScale(20, 0.3)}
                                    color={Color.themeBlue} />
                            </View> <View style={styles.icon}>
                                <Icon name='user-edit' as={FontAwesome5} size={moderateScale(20, 0.3)}
                                    color={Color.themeBlue} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.main_view, { marginTop: moderateScale(40, 0.6) }]}>
                    <CustomText isBold style={styles.heading}>Email</CustomText>
                    <View style={[styles.row_view, {
                        marginTop: moderateScale(10, 0.6)
                    }]}>
                        <View style={styles.detail_icon}>
                            <Icon name='mail' as={Feather} size={moderateScale(20, 0.3)}
                                color={Color.white} />
                        </View>
                        <View style={{
                            marginLeft: moderateScale(10, 0.6)
                        }}>
                            <CustomText style={styles.des}>offical</CustomText>
                            <CustomText style={[styles.text, {
                                textTransform: 'lowercase'
                            }]}>{userData?.employee_detail?.employee_email}</CustomText>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <CustomText isBold style={styles.heading}>Mobile Number</CustomText>
                    <View style={[styles.row_view, {
                        marginTop: moderateScale(10, 0.6)
                    }]}>
                        <View style={styles.detail_icon}>
                            <Icon name='call-outline' as={Ionicons} size={moderateScale(20, 0.3)}
                                color={Color.white} />
                        </View>
                        <View style={{
                            marginLeft: moderateScale(10, 0.6)
                        }}>
                            <CustomText style={[styles.text, {
                                textTransform: 'lowercase'
                            }]}>{userData?.employee_detail?.employee_phone_number}</CustomText>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <CustomText isBold style={styles.heading}>Company Details</CustomText>

                    <PointsView name={'Company Name:  ' + userData?.employee_detail?.company?.company_name} />
                    <PointsView name={'Company Email Address:  ' + userData?.employee_detail?.company?.business_email_address} />
                    <PointsView name={'Bussiness Type :  ' + userData?.employee_detail?.company?.business_type} />
                    <PointsView name={'Company Address :  ' + userData?.employee_detail?.company?.company_address} />
                    <PointsView name={'Industry:  ' + userData?.employee_detail?.company?.industry} />
                    <PointsView name={'Company Phone Number :  ' + userData?.employee_detail?.company?.company_number} />
                    <PointsView name={'Number of Employees:  ' + userData?.employee_detail?.company?.number_of_employees + ' Employees'} />

                    <View style={styles.line} />
                    <CustomText isBold style={styles.heading}>Team</CustomText>
                    <View style={[styles.row_view, {
                        marginTop: moderateScale(10, 0.6)
                    }]}>
                        <View style={styles.detail_icon}>
                            <Icon name='team' as={AntDesign} size={moderateScale(20, 0.3)}
                                color={Color.white} />
                        </View>
                        <View style={{
                            marginLeft: moderateScale(10, 0.6)
                        }}>
                            <CustomText style={[styles.text, {
                                textTransform: 'lowercase'
                            }]}>{userData?.employee_detail?.department?.department_name}</CustomText>
                        </View>
                    </View>
                    <View style={{ marginLeft: moderateScale(20, 0.6) }}>
                        <PointsView name={'Department Type : ' + userData?.employee_detail?.department?.department_type} />
                        <PointsView name={'Lead Name : ' + userData?.employee_detail?.department?.lead_full_name} />
                        <PointsView name={'Lead Email Address : ' + userData?.employee_detail?.department?.lead_email_address} />
                        <PointsView name={'Lead Phone Number : ' + userData?.employee_detail?.department?.lead_contact_number} />
                        <PointsView name={'number of employee in department : ' + userData?.employee_detail?.department?.number_of_employees_in_depart + " Employees"} />
                    </View>
                    <View style={styles.line} />
                    <CustomText isBold style={styles.heading}>Leads By</CustomText>
                    <View style={[styles.row_view, {
                        marginTop: moderateScale(10, 0.6)
                    }]}>
                        <View style={styles.detail_icon}>
                            <Icon name='user' as={AntDesign} size={moderateScale(20, 0.3)}
                                color={Color.white} />
                        </View>
                        <View style={{
                            marginLeft: moderateScale(10, 0.6)
                        }}>
                            <CustomText style={styles.des}>
                                {userData?.employee_detail?.department?.lead_full_name}
                            </CustomText>
                            <CustomText style={[styles.text, {
                                textTransform: 'lowercase'
                            }]}>{userData?.employee_detail?.department?.lead_email_address}</CustomText>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <CustomText isBold style={styles.heading}>Skills</CustomText>

                    {userData?.skills && JSON.parse(userData.skills).map((item, index) => (
                        <PointsView name={item} key={index} />
                    ))}
                    <View style={{ height: windowHeight * 0.1 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({
    safe_area: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(15, 0.3),
        paddingVertical: moderateScale(20, 0.6),
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    des: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
    },
    heading_sub_view: {
        paddingHorizontal: moderateScale(15, 0.6),
    },
    welcomeText: {
        fontSize: moderateScale(35, 0.3),
        color: Color.white,
    },
    subtextStyle: {
        fontSize: moderateScale(18, 0.3),
        color: Color.veryLightGray,
    },
    tab_sub_view: {
        width: '55%',
        height: '100%',
        // backgroundColor: 'blue',
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(20, 0.6)
    },
    sub_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: moderateScale(40, 0.6),
        paddingHorizontal: moderateScale(15, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.45,
        height: windowWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    heading: {
        fontSize: moderateScale(18, 0.6),
        color: Color.themeBlue,
    },
    text: {
        fontSize: moderateScale(12, 0.6),
        color: Color.grey
    },
    header_view: {
        width: windowWidth,
        height: windowHeight * 0.27,
        backgroundColor: Color.themeBlue,
        borderBottomLeftRadius: moderateScale(50, 0.6),
        borderBottomEndRadius: moderateScale(50, 0.6),
    },
    header_subview: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.22,
        backgroundColor: Color.white,
        alignSelf: 'center',
        marginTop: moderateScale(80, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius: moderateScale(20, 0.6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile_view: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
        backgroundColor: Color.white,
        alignSelf: 'center',
        borderRadius: windowWidth,
        top: -60,
        borderWidth: 5,
        borderColor: Color.themeBlue
    },
    image_style: {
        width: '100%',
        height: '100%',
        borderRadius: windowWidth,
    },
    text_view: {
        justifyContent: "center",
        alignItems: "center",
        top: -55
    },
    icon_view: {
        width: windowWidth * 0.6,
        height: windowWidth * 0.2,
        top: -40,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: windowHeight * 0.1 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: Color.themeBlue
    },
    detail_icon: {
        borderRadius: windowHeight * 0.1 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.10,
        height: windowWidth * 0.10,
        backgroundColor: 'rgba(36, 187, 245,0.4)',
        borderWidth: 1,
        borderColor: Color.themeBlue
    },
    line: {
        width: windowWidth * 0.92,
        height: 1,
        backgroundColor: Color.lightGrey,
        marginVertical: moderateScale(10, 0.6)
    }
});
