import { useIsFocused } from '@react-navigation/core'
import { Icon } from 'native-base'
import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import navigationService from '../navigationService'

const Setting = () => {
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    const userData = useSelector(state => state.commonReducer.userData);
    const user_type = useSelector(state => state.authReducer.role)

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack={false} />
            <View style={styles.main_view}>
                <CustomText isBold style={styles.heading}>Setting</CustomText>
                <View style={[styles.row_view, {
                    marginTop: moderateScale(20, 0.6),
                    borderBottomWidth: 1,
                    paddingBottom: moderateScale(10, 0.6),
                    borderBottomColor: Color.lightGrey
                }]}>
                    <Icon as={MaterialIcons} name='person' color={Color.themeBlue} size={moderateScale(25, 0.6)} />
                    <CustomText isBold style={styles.sub_heading}>Account</CustomText>
                </View>
                <TouchableOpacity onPress={() => navigationService.navigate(user_type === 'Company' ? 'CompanyDetails' : 'EditProfile')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>{user_type === 'Company' ? 'Edit Company Details' : 'Edit Profile'}</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigationService.navigate('ChangePassword')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>Change Password</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
                <View style={[styles.row_view, {
                    marginTop: moderateScale(25, 0.6),
                    borderBottomWidth: 1,
                    paddingBottom: moderateScale(10, 0.6),
                    borderBottomColor: Color.lightGrey
                }]}>
                    <Icon as={MaterialIcons} name='notifications' color={Color.themeBlue} size={moderateScale(25, 0.6)} />
                    <CustomText isBold style={styles.sub_heading}>Notifications</CustomText>
                </View>
                <TouchableOpacity onPress={() => navigationService.navigate('Notification')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>Notifications</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
                <View style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>App Notifications</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </View>

                <View style={[styles.row_view, {
                    marginTop: moderateScale(25, 0.6),
                    borderBottomWidth: 1,
                    paddingBottom: moderateScale(10, 0.6),
                    borderBottomColor: Color.lightGrey
                }]}>
                    <Icon as={Feather} name='file-plus' color={Color.themeBlue} size={moderateScale(25, 0.6)} />
                    <CustomText isBold style={styles.sub_heading}>More</CustomText>
                </View>
                <TouchableOpacity onPress={() => navigationService.navigate('PrivacyPolicy')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>Privacy policy</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigationService.navigate('Help')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>Help</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
                <View style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>FAQ</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </View>
                <TouchableOpacity onPress={() => navigationService.navigate('TermsAndConditions')} style={[styles.row_view, {
                    marginTop: moderateScale(15, 0.6),
                }]}>
                    <CustomText style={styles.categories_text}>Terms And Services</CustomText>
                    <Icon as={Feather} name='chevron-right' color={Color.veryLightGray} size={moderateScale(25, 0.6)} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#F9F9F9',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
    },
    heading: {
        fontSize: moderateScale(28, 0.6),
        textAlign: 'left',
    },
    row_view: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    sub_heading: {
        fontSize: moderateScale(18, 0.6),
        width: '90%',
        marginLeft: moderateScale(5, 0.6),
        color: Color.themeBlue
    },
    categories_text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.veryLightGray,
        fontWeight: '700'
    }
})