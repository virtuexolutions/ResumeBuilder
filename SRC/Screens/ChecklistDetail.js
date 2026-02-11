import { FlatList } from 'native-base'
import React from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import AvatarGroup from '../Components/AvaterGroup'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'

const ChecklistDetail = ({ route }) => {
    const data = route?.params?.data;
    console.log(data, '============================>')
    return (
        <ImageBackground source={require('../Assets/Images/drawer_image2.png')} style={{ width: windowWidth, height: windowHeight }} resizeMethod='cover'>
            <Header color={Color.white} hideUser={false} showBack={true} backBtnStyle={Color.darkBlue} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingBottom: moderateScale(10, .6)
            }}>
                <CustomText isBold style={styles.main_heading}>{data?.name}</CustomText>
                <LinearGradient
                    colors={['#1877F2', '#00C6FF', '#2AF598']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }} style={styles.main_view}>
                    <View style={styles.sub_view}>
                        <CustomText isBold style={styles.heading}>Meeting Summary :</CustomText>
                        <CustomText style={styles.summary}>{data?.summary}</CustomText>
                        <View style={styles.line} />
                        <CustomText isBold style={[styles.heading, { marginTop: moderateScale(10, 0.6) }]}>Meeting Overview :</CustomText>
                        <CustomText isBold style={styles.sub_heading}>Topic :</CustomText>
                        <CustomText style={styles.value}>{data?.agenda}</CustomText>
                        <CustomText isBold style={styles.sub_heading}>description :</CustomText>
                        <CustomText style={styles.value}>{data?.description}</CustomText>
                        <View style={styles.row_view}>
                            <CustomText isBold style={styles.sub_heading}>Meeting Link:</CustomText>
                            <CustomText style={[styles.value, {
                                marginTop: moderateScale(10, 0.6),
                                marginLeft: moderateScale(5, 0.7),
                                textDecorationLine: 'underline',
                                textDecorationColor: Color.darkBlue,
                                textTransform: 'lowercase',
                                color: Color.darkBlue
                            }]}>{data?.meetingLink}</CustomText>
                        </View>
                        <View style={styles.row_view}>
                            <CustomText isBold style={styles.sub_heading}>Host By :</CustomText>
                            <CustomText style={[styles.value, {
                                marginTop: moderateScale(10, 0.6),
                                marginLeft: moderateScale(5, 0.7)
                            }]}>{data?.host}</CustomText>
                        </View>
                        <View style={styles.row_view}>
                            <CustomText isBold style={styles.sub_heading}>priority :</CustomText>
                            <View style={styles.priority_card}>
                                <CustomText style={[styles.value, {
                                    color: Color.white
                                }]}>{data?.priority}</CustomText>
                            </View>
                        </View>
                        <View style={[styles.row_view, { marginTop: moderateScale(15, 0.66) }]}>
                            <CustomText isBold style={styles.sub_heading}>members :</CustomText>
                            <AvatarGroup avatars={data?.members} />
                        </View>
                        <CustomText isBold style={styles.sub_heading}>objectives :</CustomText>
                        {data?.objectives?.map((item) => {
                            return (
                                <View style={[styles.row_view, {
                                    marginTop: moderateScale(4, 0.6)
                                }]}>
                                    <View style={{ width: 6, height: 6, backgroundColor: Color.themeBlue, borderRadius: windowWidth / 2, marginRight: moderateScale(10, 0.6) }} />
                                    <CustomText style={styles.value}>{item}</CustomText>
                                </View>
                            )
                        })}
                        <CustomText isBold style={styles.sub_heading}>topics :</CustomText>
                        {data?.topics?.map((item) => {
                            return (
                                <View style={[styles.row_view, {
                                    marginTop: moderateScale(4, 0.6)
                                }]}>
                                    <View style={{ width: 6, height: 6, backgroundColor: Color.themeBlue, borderRadius: windowWidth / 2, marginRight: moderateScale(10, 0.6) }} />
                                    <CustomText style={styles.value}>{item}</CustomText>
                                </View>
                            )
                        })}
                        <CustomText isBold style={styles.sub_heading}>Department :</CustomText>
                        <FlatList
                            data={data?.department}
                            style={{
                                paddingVertical: moderateScale(10, 0.6)
                            }}
                            contentContainerStyle={{
                                paddingBottom: moderateScale(10, .6)
                            }}
                            numColumns={3}
                            renderItem={(({ item }) => {
                                return (
                                    <View style={{
                                        paddingHorizontal: moderateScale(16, 0.6),
                                        backgroundColor: Color.darkBlue,
                                        marginRight: moderateScale(6, 0.5),
                                        height: moderateScale(30, 0.7),
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        borderRadius: moderateScale(10, 0.7),
                                    }}>
                                        <CustomText isBold style={{
                                            color: Color.white,
                                            fontSize: moderateScale(10, 0.6)
                                        }}>{item}</CustomText>
                                    </View>
                                )
                            })}
                        />
                        <View style={[styles.row_view]}>
                            <CustomText isBold style={[styles.sub_heading, { marginTop: 0 }]}>Meeting platform :</CustomText>
                            <CustomText isBold style={[styles.value, {
                                marginLeft: moderateScale(5, 0.7),
                                color: Color.themeBlue
                            }]}>{data?.platform}</CustomText>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </ImageBackground >
    )
}

export default ChecklistDetail

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        borderTopRightRadius: moderateScale(40, 0.7),
        borderTopLeftRadius: moderateScale(40, 0.6),
    },
    sub_view: {
        flex: 1,
        borderTopRightRadius: moderateScale(50, 0.7),
        borderTopLeftRadius: moderateScale(50, 0.6),
        backgroundColor: Color.white,
        marginTop: moderateScale(10, 0.7),
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(30, 0.6)
    },
    card: {
        height: windowWidth * 0.45,
        backgroundColor: Color.white,
        borderRadius: moderateScale(10, 0.7),
        borderBottomColor: Color.darkBlue,
        borderBottomWidth: 3.5,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    heading: {
        fontSize: moderateScale(20, 0.6),
        color: Color.darkBlue
    },
    title: {
        fontSize: moderateScale(16, 0.6),
        color: Color.black
    },
    value: {
        fontSize: moderateScale(13, 0.6),
        color: Color.veryLightGray,
        marginTop: moderateScale(2, 0.6),

    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    main_heading: {
        fontSize: moderateScale(20, 0.7),
        marginLeft: moderateScale(10, 0.6),
        marginVertical: moderateScale(20, 0.7),
        color: Color.white
    },
    summary: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray
    },
    line: {
        width: windowWidth * 0.9,
        borderWidth: 0.6,
        borderColor: Color.lightGrey,
        marginTop: moderateScale(10, 0.6)
    },
    sub_heading: {
        fontSize: moderateScale(16, 0.6),
        // paddingTop: moderateScale(10, .6),
        marginTop: moderateScale(10, 0.6),
        color: Color.darkGray
    },
    priority_card: {
        backgroundColor: 'rgba(24, 119, 242, 0.6)',
        marginTop: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(2, 0.6),
        marginLeft: moderateScale(5, 0.7),
        borderRadius: moderateScale(5, 0.6),
        justifyContent: 'center',
        alignItems: 'center'
    }
})
