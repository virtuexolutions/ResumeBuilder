import dayjs from 'dayjs';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
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


const HomeScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const fromSignup = route?.params?.fromSignup;
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ HomeScreen ~ userData:", userData)
    dayjs.extend(advancedFormat);
    dayjs.locale('en');
    const todayFormatted = dayjs().format('dddd , D MMMM YYYY');
    console.log(todayFormatted);
    const [loading, setLoading] = useState(false)
    const [docs, setDocs] = useState([])
    console.log("🚀 ~ HomeScreen ~ docs:", docs)
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ HomeScreen ~ token:", token)

    const documents = [
        {
            id: '1',
            title: 'Welcome Aboard!',
            date: '2025-05-26',
            status: 'new',
            assignedTo: 'me',
        },
        {
            id: '2',
            title: 'select_date_textly Survey',
            date: '2025-05-25',
            status: 'seen',
            assignedTo: 'me',
        },
        {
            id: '3',
            title: 'Compliance Training',
            date: '2025-04-15',
            status: 'new',
            assignedTo: 'everyone',
        },
    ];
    useEffect(() => {
        getDocs()
    }, [])


    const getDocs = async () => {
        const url = `auth/employee/${userData?.employee_detail?.id}`
        setLoading(true)
        const response = await Get(url, token)
        console.log("🚀 ~ getDepartments ~ responsdde:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setDocs(response?.data?.employee_info?.template_assigns)
        }
        else {
            setLoading(false)
        }
    }


    const onPressCard = async (data) => {
        console.log("🚀 ~ onPressCard ~ data:", data)
        navigationService.navigate(data?.assignable?.template?.key, { data: data?.assignable, fromSave: true })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_view}>
                <Header isShadow={false} hideUser={false} showBack={false} headerColor={Color.themeBlue} />
                <View style={styles.main_view}>
                    <CustomText style={styles.welcomeText}>{`Hello ${userData?.employee_detail?.full_name}`}</CustomText>
                    <CustomText style={styles.heading}>{userData?.department[0]?.department_name}</CustomText>
                    <CustomText isBold style={styles.date}>{todayFormatted}</CustomText>
                    <View style={styles.select_date_view}>
                        <View style={styles.icon_view}>
                            <Icon name='calendar' as={Entypo} size={moderateScale(25, 0.3)}
                                color={Color.themeBlue} />
                        </View>
                        <CustomText style={styles.select_date_text}>Choose Date</CustomText>
                        <Icon name='chevron-right' as={Entypo} size={moderateScale(25, 0.3)}
                            color={Color.white} />
                    </View>
                </View>
            </View>
            <View style={styles.main_view}>
                <View style={styles.text_view}>
                    <CustomText style={[styles.date, { color: Color.themeBlue, top: 0 }]} isBold>Documents</CustomText>
                    <CustomText style={styles.des}>see All</CustomText>
                </View>
                {loading ? <ActivityIndicator size={'small'} color={Color.themeBlue} style={{ marginTop: moderateScale(10, 0.6) }} /> : (
                    <FlatList
                        data={docs}
                        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                        ListEmptyComponent={
                            <CustomText style={styles.noDataText}>No Documents Found</CustomText>
                        }
                        renderItem={({ item }) => {
                            console.log("🚀 ~ Documents ~ item:", item?.assignable?.template?.image)
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        onPressCard(item)
                                    }
                                    style={styles.card}>
                                    <View style={[styles.card_image]}>
                                        <CustomImage
                                            source={{ uri: `${baseUrl}${item?.assignable?.template?.image}` }}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: moderateScale(4, 0.6),
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: moderateScale(10, 0.6), marginTop: moderateScale(10, 0.6), width: '70%' }}>
                                        <CustomText style={styles.list_heading}>
                                            {item?.assignable?.subject}
                                        </CustomText>
                                        <CustomText numberOfLines={1} style={styles.list_description}>
                                            {item?.assignable?.tamplate_description}
                                        </CustomText>
                                        <CustomText numberOfLines={1} style={styles.card_date}>
                                            {item?.assignable?.date}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )

                }
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
    des: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6)
    },
    heading_sub_view: {
        paddingHorizontal: moderateScale(15, 0.6),
    },
    welcomeText: {
        fontSize: moderateScale(35, 0.3),
        color: Color.white,
    },
    subtextStyle: {
        fontSize: moderateScale(16, 0.3),
        color: Color.white,
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
        color: Color.grey,
        top: -15
    },
    text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white
    },
    header_view: {
        width: windowWidth,
        height: windowHeight * 0.35,
        backgroundColor: Color.themeBlue,
        borderBottomLeftRadius: moderateScale(25, 0.6)
    },
    calender_view: {
        width: moderateScale(45, 0.6),
        height: moderateScale(45, 0.6),
        backgroundColor: Color.white,
        borderRadius: moderateScale(5, 0.6),
        alignItems: "center",
        justifyContent: 'center',
    },
    date: {
        fontSize: moderateScale(18, 0.6),
        color: Color.white,
        top: -15
    },
    card_date: {
        fontSize: moderateScale(10, 0.6),
        color: Color.themeBlue,
        width: '100%',
        textAlign: 'right'
    },
    select_date_text: {
        fontSize: moderateScale(14, 0.6),
        color: Color.white,
        width: '75%'
    },
    select_date_view: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.13,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.6),
        marginTop: moderateScale(15, 0.6)
    },
    icon_view: {
        width: windowWidth * 0.10,
        height: windowWidth * 0.10,
        backgroundColor: Color.white,
        borderRadius: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth * 0.9
    },
    card: {
        width: windowWidth * 0.95,
        backgroundColor: Color.lightGrey,
        height: windowWidth * 0.25,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'flex-start',
        alignItems: 'center', paddingHorizontal: moderateScale(5, 0.6),
        flexDirection: 'row',
        marginBottom: moderateScale(10, 0.6),
        marginTop: moderateScale(10, 0.6)
    },
    card_image: {
        height: windowHeight * 0.10,
        width: windowWidth * 0.2,
        borderRadius: moderateScale(10, 0.6),
    },
    list_description: {
        fontSize: moderateScale(11, 0.6),
        color: Color.veryLightGray,
    },
    list_heading: {
        fontSize: moderateScale(12, 0.6),
        color: Color.grey,
    },
    noDataText: {
        color: Color.red,
        textAlign: 'center',
        marginTop: moderateScale(20, 0.6)
    }
});
