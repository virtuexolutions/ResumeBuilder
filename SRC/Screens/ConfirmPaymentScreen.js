import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CardField from '@stripe/stripe-react-native';
import CustomImage from '../Components/CustomImage'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import CustomButton from '../Components/CustomButton'
import navigationService from '../navigationService'
import LottieView from 'lottie-react-native'
import CustomText from '../Components/CustomText'
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirmPaymentScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main_view}>
                <View style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.3,
                    borderRadius: moderateScale(10, 0.6),
                    marginBottom: moderateScale(22, 0.6)
                }}>
                    <LottieView
                        autoPlay
                        loop
                        style={[
                            {
                                height: '100%',
                                width: 200,
                                alignItems: 'center',
                                alignSelf: 'center',
                            },
                        ]}
                        source={require('../Assets/animations/success_payment.json')}
                    />
                </View>
                <CustomText isBold style={styles.heading}>Thank you for your purchase</CustomText>
                <CustomText style={styles.text}>Your purchased template is now available in your account, Click the button below to start customizing it right away, Need help? Visit our help center or contact our support team.</CustomText>
                <CustomButton
                    text={"Start Customizing"}
                    width={windowWidth * 0.5}
                    height={windowHeight * 0.050}
                    borderRadius={moderateScale(10, 0.3)}
                    textColor={Color.white}
                    bgColor={Color.themeBlue}
                    onPress={() => {
                        navigationService.navigate('MyDrawer')
                    }}
                    marginTop={moderateScale(20, 0.6)}
                />
            </View>
        </View>
    )
}

export default ConfirmPaymentScreen

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(15, 0.3),
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        alignItems: 'center',
        height: windowHeight * 0.9,
        justifyContent: 'center'
    },
    heading: {
        fontSize: moderateScale(18, 0.6),
        width: windowWidth * 0.9,
        textAlign: 'center',
        color: Color.darkGray
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth * 0.9,
        marginVertical: moderateScale(10, 0.6)
    },
    btn: {
        position: 'absolute',
        bottom: 30
    },
    text: {
        fontSize: moderateScale(13, 0.6),
        color: Color.themeLightGray,
        textAlign: "center",
        width: windowWidth * 0.9
    }

})
