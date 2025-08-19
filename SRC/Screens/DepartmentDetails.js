import 'dayjs/locale/en'; // or your preferred locale
import React from 'react';
import {
    // SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';


const DepartmentDetails = (props) => {
    const data = props?.route?.params?.data;
    console.log("🚀 ~ DepartmentDetails ~ data:", data)
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
            <Header isShadow={false} hideUser={false} showBack={true} headerColor={Color.white} backgroundColor={Color.themeBlue} />
            <ScrollView style={{ width: windowWidth, height: windowHeight * 0.99, backgroundColor: Color.white }}>
                <View style={styles.main_view}>
                    <View style={styles.profile_view}>

                        <CustomText isBold style={styles.heading}>{data?.department_name}</CustomText>
                        <CustomText style={styles.text}>{data?.department_type}</CustomText>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
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
        height: windowWidth * 0.3,
        backgroundColor: Color.themeBlue,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        position: "absolute"
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
