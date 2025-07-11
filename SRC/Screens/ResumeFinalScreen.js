import { ActivityIndicator, Alert, I18nManager, ImageBackground, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Header from '../Components/Header'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomButton'
import navigationService from '../navigationService'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
// import { PDFDocument, Page } from 'react-native-pdf-lib';
// import ViewShot from 'react-native-view-shot'
// import RNFS from 'react-native-fs';

const ResumeFinalScreen = (props) => {
    const data = props?.route?.params?.data;
    const fromHome = props?.route?.params?.fromHome;
    const viewShotRef = useRef();
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused()

    const onPressSave = async () => {
        const url = `auth/resumes`
        setLoading(true)
        const response = await Post(url, data, apiHeader(token))
        console.log("🚀 ~ onPressSave ~ response:", response)
        setLoading(false)
        console.log("🚀 ~ onPressConfirm ~ response:", response?.data)
        if (response?.data != undefined) {
            setLoading(false)
            navigationService.navigate('Home')
            Platform.OS == 'android'
                ? ToastAndroid.show('Saved', ToastAndroid.SHORT)
                : Alert.alert('Saved');
        }
    }
    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header title={' Resume'} hideUser={true} showBack={true} />

            <View style={styles.main_view}>
                <View style={styles.left_view}>
                    <CustomText isBold style={styles.heading}>{data?.name}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.45,
                        marginTop: moderateScale(10, 0.6)
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(10, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Profile</CustomText>
                    <CustomText style={styles.description}>{data?.summaryDetails}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.3,
                        marginTop: moderateScale(20, 0.6),

                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        width: windowWidth * 0.5,
                        marginTop: moderateScale(20, 0.6)
                    }]}>professional Experience</CustomText>

                    <CustomText style={{
                        fontSize: moderateScale(12, 0.6),
                        marginTop: moderateScale(10, 0.6),
                        color: '#79244b',
                    }}>{data?.positonName}</CustomText>
                    <CustomText style={{
                        fontSize: moderateScale(12, 0.6),
                        marginTop: moderateScale(2, 0.6),
                        color: '#79244b',
                    }}>{data?.DateofJoining + ' - ' + data?.DateofEnding} </CustomText>
                    <CustomText style={styles.description}>
                        {data?.summaryDetails}
                    </CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                </View>
                <View style={styles.right_view}>
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(30, 0.6),
                        width: windowWidth * 0.5,
                    }]}>CONTACT</CustomText>
                    <CustomText style={styles.description}>{data?.phone}</CustomText>
                    <CustomText style={styles.description}>{data?.email}</CustomText>
                    <CustomText style={styles.description}>{data?.address}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Education</CustomText>
                    <CustomText style={styles.description}>{data?.education}</CustomText>
                    <CustomText style={styles.description}>anythonygentile@gmail.com</CustomText>
                    <CustomText style={styles.description}>Sans Franciso, CA 12345</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Skills</CustomText>
                    {(typeof data?.skills === 'string' ? JSON.parse(data?.skills) : data?.skills)?.map((item, index) => {
                        console.log("🚀 ~ { ~ item:", item)
                        return (
                            <CustomText
                                key={index}
                                style={[
                                    styles.description,
                                    {
                                        fontSize: moderateScale(12, 0.6),
                                        width: windowWidth * 0.5,
                                    },
                                ]}
                            >
                                {item}
                            </CustomText>
                        )
                    })}
                    {/* {(JSON.parse(data?.skills) || data?.skills || [])?.map((item) => {
                        return (
                            <CustomText
                                key={index}
                                style={[
                                    styles.description,
                                    {
                                        fontSize: moderateScale(12, 0.6),
                                        width: windowWidth * 0.5,
                                    },
                                ]}
                            > 
                                {item}
                            </CustomText>
                        )
                    })} */}
                    {/* {data?.skills?.map((item) => {
                        return (
                         
                        );
                    })} */}
                    {/* {JSON.parse(data?.skills || '[]')?.map((item, index) => {
                        return (
                            <CustomText
                                key={index}
                                style={[
                                    styles.description,
                                    {
                                        fontSize: moderateScale(12, 0.6),
                                        width: windowWidth * 0.5,
                                    },
                                ]}
                            >
                                {item}
                            </CustomText>
                        );
                    })} */}
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Certificate</CustomText>
                    <CustomText style={styles.description}>{data?.CertificateName}</CustomText>
                    <CustomText style={styles.description}>{data?.CertificatePlaceName}</CustomText>
                    <CustomText style={styles.description}>{data?.CertificatYear}</CustomText>
                </View>
            </View>
            {/* {loading ?
                <ActivityIndicator
                    size="large"
                    style={styles.indicatorStyle}
                    color={Color.white}
                />
                : (
                    <> */}
            {/* <View style={styles.main_view}>
                <View style={styles.left_view}>
                    <CustomText isBold style={styles.heading}>{data?.name}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.45,
                        marginTop: moderateScale(10, 0.6)
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(10, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Profile</CustomText>
                    <CustomText style={styles.description}>{data?.summaryDetails}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.3,
                        marginTop: moderateScale(20, 0.6),

                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        width: windowWidth * 0.5,
                        marginTop: moderateScale(20, 0.6)
                    }]}>professional Experience</CustomText>

                    <CustomText style={{
                        fontSize: moderateScale(12, 0.6),
                        marginTop: moderateScale(10, 0.6),
                        color: '#79244b',
                    }}>{data?.positonName}</CustomText>
                    <CustomText style={{
                        fontSize: moderateScale(12, 0.6),
                        marginTop: moderateScale(2, 0.6),
                        color: '#79244b',
                    }}>{data?.DateofJoining + ' - ' + data?.DateofEnding} </CustomText>
                    <CustomText style={styles.description}>
                        {data?.summaryDetails}
                    </CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                </View>
                <View style={styles.right_view}>
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(30, 0.6),
                        width: windowWidth * 0.5,
                    }]}>CONTACT</CustomText>
                    <CustomText style={styles.description}>{data?.phone}</CustomText>
                    <CustomText style={styles.description}>{data?.email}</CustomText>
                    <CustomText style={styles.description}>{data?.address}</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Education</CustomText>
                    <CustomText style={styles.description}>{data?.education}</CustomText>
                    <CustomText style={styles.description}>anythonygentile@gmail.com</CustomText>
                    <CustomText style={styles.description}>Sans Franciso, CA 12345</CustomText>
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Skills</CustomText>
                    {data?.skills.map((item) => {
                        return (
                            <CustomText style={[styles.description, {
                                fontSize: moderateScale(12, 0.6),
                                width: windowWidth * 0.5,
                            }]}>{item}</CustomText>
                        )
                    })
                    }
                    <View style={{
                        backgroundColor: '#741b47',
                        height: moderateScale(2, 0.6),
                        width: windowWidth * 0.25,
                        marginTop: moderateScale(12, 0.6),
                    }} />
                    <CustomText isBold style={[styles.sub_heading, {
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.5,
                    }]}>Certificate</CustomText>
                    <CustomText style={styles.description}>{data?.CertificateName}</CustomText>
                    <CustomText style={styles.description}>{data?.CertificatePlaceName}</CustomText>
                    <CustomText style={styles.description}>{data?.CertificatYear}</CustomText>
                </View>
            </View> */}
            <CustomButton
                text={loading ?
                    <ActivityIndicator
                        size="small"
                        style={styles.indicatorStyle}
                        color={Color.white}
                    /> : fromHome ? 'Go Back' : 'Save'}
                textColor={Color.white}
                onPress={() => {
                    // navigationService.navigate('Home')
                    // fromHome ? navigationService.navigate("Home") :
                    onPressSave()
                    // captureAndCreatePDF()
                }} width={windowWidth * 0.7}
                height={windowHeight * 0.060}
                borderRadius={moderateScale(20, 0.3)}
                bgColor={Color.darkBlue}
                marginTop={moderateScale(20, 0.6)}
            />

        </ImageBackground>
    )
}

export default ResumeFinalScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    main_view: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.75,
        backgroundColor: Color.white,
        alignSelf: "center",
        marginTop: moderateScale(20, 0.6),
        flexDirection: 'row'
    },
    right_view: {
        backgroundColor: '#f4cccc',
        height: windowHeight * 0.75,
        width: windowWidth * 0.35,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(60, 0.6)
    },
    left_view: {
        backgroundColor: Color.white,
        height: windowHeight * 0.75,
        width: windowWidth * 0.55,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(40, 0.6)
    },
    heading: {
        color: '#79244b',
        fontSize: moderateScale(20, 0.6),
    },
    description: {
        fontSize: moderateScale(9, 0.6),
        color: '#79244b',
    },
    indicatorStyle: {
        paddingRight: 5,
        paddingLeft: I18nManager.isRTL ? 5 : 0,
    },
    sub_heading: {
        color: '#79244b',
        fontSize: moderateScale(16, 0.6),
        textTransform: 'capitalize',
        marginTop: moderateScale(10, 0.6)
    }
})