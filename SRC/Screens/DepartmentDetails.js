import 'dayjs/locale/en'; // or your preferred locale
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Platform,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import ListEmphtyComponent from '../Components/ListEmphtyComponent';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useNavigation } from '@react-navigation/native';
import CustomLoading from '../Components/CustomLoading';

const DepartmentDetails = (props) => {
    const data = props?.route?.params?.data;
    console.log(data, 'asjdajsdj')
    const dispatch = useDispatch();
    const userData = useSelector(state => state.commonReducer.userData);
    const token = useSelector(state => state.authReducer.token);
    const navigationN = useNavigation();
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const onDelete = async () => {
        console.log('aaaaaaaaaaaaaaaaaaaaaa')
        const url = `auth/delete_department/${data?.id}`
        console.log("Delete URL ===>", url)
        setLoading(true)
        const response = await Post(url, {}, apiHeader(token))
        console.log(response?.data, 'responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            Platform.OS == 'android'
                ? ToastAndroid.show('Deparment Deleted successfully', ToastAndroid.SHORT)
                : Alert.alert('Deparment Deleted successfully');
            navigationN.goBack()
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setShowModal(loading);
    }, [loading]);


    return (
        <View style={styles.container}>
            <Header isShadow={false} hideUser={false} showBack={true} headerColor={Color.white} />
            <ScrollView style={{ width: windowWidth, height: windowHeight * 0.99, backgroundColor: Color.white }}>
                <View style={styles.main_view}>
                    <View style={styles.profile_view}>
                        <CustomText isBold style={styles.heading}>{data?.department_name}</CustomText>
                        <CustomText style={[styles.text, {
                            textTransform: 'uppercase',
                            width: '80%',
                            textAlign: 'center'
                        }]}>{data?.department_type}</CustomText>
                        <View style={[styles.row_view, { marginTop: moderateScale(10, 0.6) }]}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.icon_view} onPress={() => onDelete()}>
                                <Icon name='delete-outline' as={MaterialIcons} size={moderateScale(25, 0.6)} color={Color.veryLightGray} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.icon_view, { marginLeft: moderateScale(5, 0.6) }]} onPress={() => navigationN.navigate('AddDepartment', { isDepartment: true, data: data })}>
                                <Icon name='edit' as={AntDesign} size={moderateScale(25, 0.6)} color={Color.veryLightGray} />
                            </TouchableOpacity>
                            <View style={[styles.icon_view, { marginLeft: moderateScale(5, 0.6) }]}>
                                <Icon name='reader' as={Ionicons} size={moderateScale(25, 0.6)} color={Color.veryLightGray} />
                            </View>
                        </View>
                    </View>
                    <CustomText isBold style={styles.sub_heading}>Lead Details</CustomText>
                    <View style={styles.row_view}>
                        <CustomText isBold style={styles.view_heading}>Lead Contact number : </CustomText>
                        <CustomText>{data?.lead_contact_number}</CustomText>
                    </View>
                    <View style={styles.row_view}>
                        <CustomText isBold style={styles.view_heading}>Lead Email Address : </CustomText>
                        <CustomText>{data?.lead_email_address}</CustomText>
                    </View>
                    <View style={styles.row_view}>
                        <CustomText isBold style={styles.view_heading}>Lead full Name : </CustomText>
                        <CustomText>{data?.lead_full_name}</CustomText>
                    </View>
                    <View style={styles.row_view}>
                        <CustomText isBold style={styles.view_heading}>Number of Employees : </CustomText>
                        <CustomText>{data?.number_of_employees_in_depart}</CustomText>
                    </View>
                    <CustomText isBold style={styles.sub_heading}>Team Members</CustomText>
                    <FlatList data={data?.employees}
                        ListEmptyComponent={() => <ListEmphtyComponent />}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    width: windowWidth * 0.9,
                                    height: windowWidth * 0.2,
                                    backgroundColor: Color.lightGrey,
                                    borderRadius: moderateScale(10, 0.6),
                                    alignSelf: "center",
                                    paddingHorizontal: moderateScale(10, 0.6),
                                    paddingVertical: moderateScale(10, 0.6),
                                    flexDirection: 'row',
                                    marginTop: moderateScale(7, 0.6)
                                }}>
                                    <View style={{
                                        width: windowWidth * 0.16,
                                        height: windowWidth * 0.16,
                                        backgroundColor: Color.veryLightGray,
                                        borderRadius: windowWidth
                                    }}>
                                        <CustomImage style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: windowWidth
                                        }} resizeMode={'cover'} source={require('../Assets/Images/no_user_image.png')} />
                                    </View>
                                    <View style={{
                                        marginLeft: moderateScale(10, 0.6),
                                        justifyContent: 'center'
                                    }}>
                                        <View style={styles.row_view}>
                                            <CustomText style={styles.list_heading}>Employee Name : </CustomText>
                                            <CustomText isBold>{item?.full_name}</CustomText>
                                        </View>
                                        <View style={styles.row_view}>
                                            <CustomText style={styles.list_heading}>Employee Email : </CustomText>
                                            <CustomText isBold>{item?.employee_email}</CustomText>
                                        </View>
                                        <View style={styles.row_view}>
                                            <CustomText style={styles.list_heading}>designation : </CustomText>
                                            <CustomText isBold>{item?.designation}</CustomText>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>
            <CustomLoading show={showModal} setShow={setShowModal} />
        </View>
    );
};

export default DepartmentDetails;

const styles = StyleSheet.create({
    safe_area: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        // backgroundColor: Color.themeBlue,
        paddingHorizontal: moderateScale(15, 0.3),
        alignItems: 'center',
    },
    des: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray
    },
    view_heading: {
        fontSize: moderateScale(15, 0.6),
        color: Color.black
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
    },
    heading_sub_view: {
        paddingHorizontal: moderateScale(15, 0.6),
    },
    sub_heading: {
        fontSize: moderateScale(22, 0.6),
        color: Color.themeBlue,
        marginTop: moderateScale(20, 0.6),
        marginBottom: moderateScale(7, 0.6)
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
        fontSize: moderateScale(25, 0.6),
        color: Color.white,
    },
    text: {
        fontSize: moderateScale(16, 0.6),
        color: Color.white
    },
    header_view: {
        width: windowWidth,
        height: windowHeight * 0.27,
        backgroundColor: Color.themeBlue,
        borderBottomLeftRadius: moderateScale(50, 0.6),
        borderBottomEndRadius: moderateScale(50, 0.6),
    },
    list_heading: {
        fontSize: moderateScale(12, 0.6),
        color: Color.grey
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
        width: windowWidth,
        height: windowWidth * 0.4,
        backgroundColor: Color.themeBlue,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
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
        width: moderateScale(40, 0.6),
        height: moderateScale(40, 0.6),
        backgroundColor: Color.lightGrey,
        borderRadius: windowWidth,
        alignItems: "center",
        justifyContent: 'center',
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
