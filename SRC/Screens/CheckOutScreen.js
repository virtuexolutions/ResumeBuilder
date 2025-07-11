import { useIsFocused } from '@react-navigation/core'
import React, { useState } from 'react'
import { ActivityIndicator, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import CustomButton from '../Components/CustomButton'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'

const CheckOutScreen = () => {
    const isFocused = useIsFocused()
    const [CheckOutScreens, setCheckOutScreens] = useState([])
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const [paymentmethod, setPaymentMethod] = useState('Credits')

    const payment_method = [
        {
            id: 1,
            method_name: 'Credits'
        },
        {
            id: 2,
            method_name: 'Paypal'
        },
        {
            id: 3,
            method_name: 'Apple Pay'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.bg_container}
                source={require('../Assets/Images/bg.png')}>
                <Header title={'Checkout'} hideUser={false} showBack={true} onPressPlus={() => navigationService.navigate('AddCheckOutScreen')} />
                <View style={styles.main_view}>
                    <CustomText style={styles.heading}>Total Price</CustomText>
                    <CustomText isBold style={styles.price}>{`$ ${'2,280.00'}`}</CustomText>
                    <CustomText style={styles.heading}>Payment Method</CustomText>
                    <View style={{
                        marginTop: moderateScale(10, 0.6),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {payment_method?.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => setPaymentMethod(item?.method_name)} style={[styles.tab, {
                                    backgroundColor: paymentmethod === item?.method_name ? Color.white : 'rgba(0,0,0,0.2)',

                                }]}>
                                    <CustomText style={[styles.tab_text, {
                                        color: paymentmethod === item?.method_name ? Color.themeBlue : Color.white,
                                    }]}>{item?.method_name}</CustomText>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {paymentmethod === 'Credits' && (
                        <View style={{
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            <TextInputWithTitle
                                style={{
                                }}
                                title={"Card Number"}
                                // iconName={'building'}
                                // iconType={FontAwesome5}
                                color={Color.veryLightGray}
                                // setText={setFullName}
                                // value={fullName}
                                placeholder={' Card number'}
                                placeholderColor={Color.grey}
                                viewWidth={0.9}
                                viewHeight={0.060}
                                border={1}
                                borderRadius={moderateScale(10, 0.6)}
                                borderColor={Color.white}
                            />
                            <View style={styles.row_view}>
                                <View>
                                    <TextInputWithTitle
                                        style={{
                                        }}
                                        title={"Expiry"}
                                        // iconName={'building'}
                                        // iconType={FontAwesome5}
                                        color={Color.veryLightGray}
                                        // setText={setFullName}
                                        // value={fullName}
                                        placeholder={'Month/Year'}
                                        placeholderColor={Color.grey}
                                        viewWidth={0.45}
                                        viewHeight={0.060}
                                        border={1}
                                        borderRadius={moderateScale(10, 0.6)}
                                        borderColor={Color.white}
                                    />
                                </View>
                                <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                                    <TextInputWithTitle
                                        style={{
                                        }}
                                        title={"CVV"}
                                        // iconName={'building'}
                                        // iconType={FontAwesome5}
                                        color={Color.veryLightGray}
                                        // setText={setFullName}
                                        // value={fullName}
                                        placeholder={'***'}
                                        placeholderColor={Color.grey}
                                        viewWidth={0.45}
                                        viewHeight={0.060}
                                        border={1}
                                        borderRadius={moderateScale(10, 0.6)}
                                        borderColor={Color.white}
                                    />
                                </View>
                            </View>
                            <TextInputWithTitle
                                style={{
                                }}
                                title={"Card Holder"}
                                // iconName={'building'}
                                // iconType={FontAwesome5}
                                color={Color.veryLightGray}
                                // setText={setFullName}
                                // value={fullName}
                                placeholder={' Card number'}
                                placeholderColor={Color.grey}
                                viewWidth={0.9}
                                viewHeight={0.060}
                                border={1}
                                borderRadius={moderateScale(10, 0.6)}
                                borderColor={Color.white}
                            />
                            <View style={[styles.row_view, {
                                justifyContent: 'flex-start'
                            }]}>
                                <CustomText style={styles.save_text}>Save Card Data for future Payment</CustomText>
                                <View style={{
                                    width: windowWidth * 0.05,
                                    height: windowWidth * 0.05,
                                    // backgroundColor: 'red',
                                    borderRadius: moderateScale(2, 0.6),
                                    marginTop: moderateScale(10, 0.6),
                                    borderWidth: 1,
                                    borderColor: Color.white,
                                    marginLeft: moderateScale(10, 0.6)
                                }}>
                                    <View />
                                </View>
                            </View>
                        </View>
                    )
                    }
                    <CustomButton
                        text={loading ? <ActivityIndicator style={styles.indicatorStyle}
                            size="small"
                            color={Color.white} /> : 'Proceed to confirm'}
                        width={windowWidth * 0.9}
                        height={windowHeight * 0.055}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.themeBlue}
                        bgColor={Color.white}
                        marginTop={moderateScale(40, 0.6)}
                        style={{
                            position: 'absolute',
                            bottom: 20
                        }}
                        onPress={() => {
                            // onPressSubmit()
                            // Login()
                        }}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

export default CheckOutScreen

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
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        // alignItems: 'left',
        // paddingHorizontal: moderateScale(10, 0.6),
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        width: windowWidth,
        height: windowHeight * 0.9,
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    heading: {
        fontSize: moderateScale(13, 0.6),
        color: Color.grey,
        marginTop: moderateScale(10, 0.6)
    },
    price: {
        fontSize: moderateScale(28, 0.6),
        color: Color.white
    },
    tab: {
        width: windowWidth * 0.3,
        marginRight: moderateScale(10, 0.6),
        height: windowWidth * 0.10,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: moderateScale(10, 0.6)
    },
    tab_text: {
        fontSize: moderateScale(14, 0.6)
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    save_text: {
        marginTop: moderateScale(10, 0.6),
        fontSize: moderateScale(14, 0.6),
        color: Color.white
    }
})