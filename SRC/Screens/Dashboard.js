import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { useIsFocused } from '@react-navigation/core';

const Dashboard = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()

    const fromSignup = route?.params?.fromSignup;
    const [numberOfEmployees, setnumberOfEmployees] = useState(0);
    const [numberOfDepartment, setnumberOfDepartment] = useState(0);
    const [numberOfDocuments, setnumberOfDocuments] = useState(0);
    console.log("🚀 ~ Dashboard ~ numberOfDocuments:", numberOfDocuments)
    console.log("🚀 ~ Dashboard ~ numberOfDepartment:", numberOfDepartment)
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('Dashboard')
    const userData = useSelector(state => state.commonReducer.userData);
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ Dashboard ~ token:", token)

    console.log("🚀 ~ Dashboard ~ userData:", userData)
    const pieData = [
        { value: numberOfEmployees, color: '#6366F1', text: numberOfEmployees },
        { value: numberOfDepartment, color: '#2DD4BF', text: numberOfDepartment },
        { value: numberOfDocuments, color: '#D1D5DB', text: '0' },
        { value: numberOfDocuments, color: '#D946EF', text: '0' },
    ];

    useEffect(() => {
        getDetails()
    }, [isFocused])

    const getDetails = async () => {
        const url = 'auth/company_detail'
        const response = await Get(url, token)
        console.log("🚀 ~ getDetails ~ response:", response?.data?.company_detail)
        if (response != undefined) {
            setnumberOfDepartment(response?.data?.company_detail?.departments.length)
            setnumberOfEmployees(response?.data?.company_detail?.employee.length)
            setnumberOfDocuments(response?.data?.company_detail?.save_template?.mail?.length)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header hideUser={false} showBack={false} />
            <View style={styles.main_view}>
                <View style={styles.tab_view}>
                    <TouchableOpacity onPress={() => setStatus('Dashboard')} style={[styles.tab_sub_view, {
                        borderBottomWidth: 2,
                        borderBottomColor: status === 'Dashboard' ? Color.themeBlue : Color.veryLightGray,
                    }]}>
                        <Icon name='document-text' as={Ionicons} size={moderateScale(40, 0.6)} color={Color.themeBlue} />
                        <CustomText style={styles.subtextStyle}>Dashboard</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStatus('Status')} style={[styles.tab_sub_view, {
                        borderBottomWidth: 2,
                        borderBottomColor: status === 'Status' ? Color.themeBlue : Color.veryLightGray
                    }]}>
                        <Icon name='circular-graph' as={Entypo} size={moderateScale(40, 0.6)} color={Color.themeBlue} />
                        <CustomText style={styles.subtextStyle}>Status</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: windowWidth,
                    height: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                    marginTop: moderateScale(10, 0.6)
                }} />
                <View style={{
                    paddingHorizontal: moderateScale(10, 0.6)
                }}>
                    {status === 'Dashboard' ? (
                        <>
                            <View style={styles.sub_view}>
                                <TouchableOpacity onPress={() => navigationService.navigate('AddEmployees')} style={styles.btn_view}>
                                    <CustomText isBold style={styles.heading}>{numberOfEmployees}</CustomText>
                                    <CustomText style={styles.text}>Employees</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigationService.navigate('Department')} style={[styles.btn_view, {
                                    backgroundColor: '#31C3BB'
                                }]}>
                                    <CustomText isBold style={styles.heading}>{numberOfDepartment}</CustomText>
                                    <CustomText style={styles.text}>Department</CustomText>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.sub_view, {
                                marginTop: moderateScale(15, 0.6)
                            }]}>
                                <TouchableOpacity onPress={() => navigationService.navigate('Categories')} style={[styles.btn_view, {
                                    backgroundColor: '#557AFF'
                                }]}>
                                    <CustomText isBold style={styles.heading}>{numberOfDocuments}</CustomText>
                                    <CustomText style={styles.text}>categories</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigationService.navigate('Documents')} style={[styles.btn_view, {
                                    backgroundColor: '#C131C3'
                                }]}>
                                    <CustomText isBold style={styles.heading}>{numberOfDocuments}</CustomText>
                                    <CustomText style={styles.text}>document</CustomText>
                                </TouchableOpacity>
                            </View>

                        </>
                    ) : (
                        <>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(40, 0.6) }}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    showText
                                    textColor="white"
                                    innerRadius={70}
                                    radius={160}
                                />
                            </View>
                            <View style={[styles.row_view, {
                                marginTop: moderateScale(30, 0.6)
                            }]}>
                                <Icon name='team' as={AntDesign} size={moderateScale(30, 0.6)} color={'#6366F1'} />
                                <CustomText style={[styles.graph_text, {
                                    color: '#6366F1',
                                    marginTop: moderateScale(10, 0.6),
                                    marginLeft: moderateScale(10, 0.6)
                                }]}>Number of Employees</CustomText>
                            </View>
                            <View style={[styles.row_view, {
                                marginTop: moderateScale(10, 0.6)
                            }]}>
                                <Icon name='building' as={FontAwesome5} size={moderateScale(30, 0.6)} color={'#2DD4BF'} />
                                <CustomText style={[styles.graph_text, {
                                    color: '#2DD4BF',
                                    marginTop: moderateScale(10, 0.6),
                                    marginLeft: moderateScale(10, 0.6)
                                }]}>Number of Department</CustomText>
                            </View>
                            <View style={[styles.row_view, {
                                marginTop: moderateScale(10, 0.6)
                            }]}>
                                <Icon name='folder1' as={AntDesign} size={moderateScale(30, 0.6)} color={'#D1D5DB'} />
                                <CustomText style={[styles.graph_text, {
                                    color: '#D1D5DB',
                                    marginTop: moderateScale(10, 0.6),
                                    marginLeft: moderateScale(10, 0.6)
                                }]}>Number of categories</CustomText>
                            </View>
                            <View style={[styles.row_view, {
                                marginTop: moderateScale(10, 0.6)
                            }]}>
                                <Icon name='page-doc' as={Foundation} size={moderateScale(30, 0.6)} color={'#D946EF'} />
                                <CustomText style={[styles.graph_text, {
                                    color: '#D946EF',
                                    marginTop: moderateScale(10, 0.6),
                                    marginLeft: moderateScale(10, 0.6)
                                }]}>Number of documents</CustomText>
                            </View>
                        </>
                    )
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
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
    welcomeText: {
        fontSize: moderateScale(40, 0.3),
        color: Color.darkbrown,
    },
    subtextStyle: {
        fontSize: moderateScale(16, 0.3),
        color: Color.themeBlue,
    },
    tab_view: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.2,
        // backgroundColor: "red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        // borderBottomColor: Color.ver,
        // borderBottomWidth: 1
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
        width: windowWidth * 0.42,
        height: windowWidth * 0.36,
        backgroundColor: "#C4C4C4",
        borderRadius: moderateScale(15, 0.6),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    heading: {
        fontSize: moderateScale(20, 0.6),
        color: Color.white
    },
    text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white
    },
    row_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    graph_text: {
        fontSize: moderateScale(15, 0.6)
    }
});
