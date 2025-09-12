import { Alert, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import { CardField, createPaymentMethod, createToken } from '@stripe/stripe-react-native';
import CustomImage from '../Components/CustomImage'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import CustomButton from '../Components/CustomButton'
import { Post } from '../Axios/AxiosInterceptorFunction'
import CustomLoading from '../Components/CustomLoading'
import { useSelector } from 'react-redux'
import navigationService from '../navigationService'

const PaymentScreen = props => {
    const data = props?.route?.params?.data;
    const [name, setName] = useState('');
    const [strpie_token, setStripeToken] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(strpie_token, 'stripeeeeeeeeeeeeeeeeeee')
    const [cardDetails, setCardDetails] = useState(null)
    const user_token = useSelector(state => state.authReducer.token);

    const stripeToken = async () => {
        setLoading(true);
        const { token, error } = await createToken({ type: 'Card' });

        if (error) {
            console.log('Token error:', error);
            setLoading(false);
            return;
        }

        try {
            const url = 'auth/templates-buy';

            const templateIds = Array.isArray(data) ? data.map(item => item.id) : [data?.id];

            const body = {
                stripe_token: token.id,
                template_ids: templateIds,
            };

            console.log('Sending body:', body);

            const response = await Post(url, body, apiHeader(user_token));

            if (response) {
                Platform.OS === 'android'
                    ? ToastAndroid.show('Payment Successful', ToastAndroid.SHORT)
                    : Alert.alert('Payment Successful');
                navigationService.navigate('ConfirmPaymentScreen')
            }
        } catch (apiError) {
            console.log('API error:', apiError);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={"Add Card Details"} />
            <View style={styles.main_view}>
                <View style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.24,
                    borderRadius: moderateScale(10, 0.6),
                    marginBottom: moderateScale(22, 0.6)
                }}>
                    <CustomImage resizeMode={'cover'} source={require('../Assets/Images/credit_card_image.png')} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: moderateScale(10, 0.6)
                    }} />
                </View>
                <View style={{
                    width: windowWidth * 0.9,
                }}>
                    <CardField
                        postalCodeEnabled={false}
                        placeholderColor={Color.darkGray}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: Color.lightGrey,
                            borderRadius: moderateScale(10, 0.6),
                            width: windowWidth * 0.9,
                            textColor: 'black',
                            placeholderColor: Color.darkGray,
                        }}
                        style={{
                            width: '95%',
                            height: windowHeight * 0.06,
                            marginVertical: moderateScale(10, 0.3),
                        }}
                        onCardChange={(details) => {
                            console.log(details, 'detaiiiiiiiiiiiiiiillllls');
                            setCardDetails(details);
                        }}
                        onFocus={focusedField => { }}
                    />
                </View>
                <TextInputWithTitle
                    title={"Cardholder Name: "}
                    color={Color.lightGrey}
                    placeholder={'Cardholder Name'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    value={name}
                    setText={setName}
                    viewHeight={0.060}
                    borderRadius={moderateScale(10, 0.6)}
                    backgroundColor={'rgba(205, 208, 209,0.4)'}
                    titleColor={Color.veryLightGray}
                />
                {loading ? <CustomLoading show={loading} setShow={setLoading} /> :
                    <CustomButton
                        text={"Pay Now"}
                        width={windowWidth * 0.9}
                        height={windowHeight * 0.070}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.white}
                        bgColor={Color.themeBlue}
                        marginTop={moderateScale(20, 0.6)}
                        onPress={() => {
                            stripeToken()
                        }}
                        style={styles.btn}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen

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
        height: windowHeight * 0.9
    },
    heading: {
        fontSize: moderateScale(15, 0.6),
        textAlign: "left",
        width: windowWidth * 0.9
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
    }
})
