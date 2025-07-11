import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import navigationService from '../navigationService';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { color } from 'native-base/lib/typescript/theme/styled-system';
import CustomButton from '../Components/CustomButton';
import { SetUserRole, setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';
import { setUserData, setUserType } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';

const StartScreen = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const fromSignup = route?.params?.fromSignup;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: windowWidth * 0.6,
                height: windowWidth * 0.35,
            }}>
                <CustomImage source={require('../Assets/Images/logo.png')} style={{
                    width: '100%',
                    height: '100%'
                }} />
            </View>
            <CustomText isBold style={styles.welcomeText}>
                Welcome!
            </CustomText>
            <CustomButton
                text={isLoading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Company'}
                textColor={Color.white}
                isBold
                width={windowWidth * 0.35}
                style={{
                    height: moderateScale(50, 0.3),
                    borderRadius: moderateScale(20, 0.3),
                    backgroundColor: Color.themeBlue,
                    marginTop: windowHeight * 0.01,
                    width: windowWidth * 0.6
                }}
                onPress={() => {
                    dispatch(SetUserRole('Company'))
                    navigationService.navigate('LoginScreen')
                }}
            />
            <CustomButton
                text={isLoading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'Employee'}
                textColor={Color.themeBlue}
                isBold
                width={windowWidth * 0.35}
                style={{
                    height: moderateScale(50, 0.3),
                    borderRadius: moderateScale(20, 0.3),
                    // backgroundColor: Color.themeBlue,
                    marginTop: windowHeight * 0.02,
                    width: windowWidth * 0.6,
                    borderWidth: 1.5,
                    borderColor: Color.themeBlue
                }}
                onPress={() => {
                    dispatch(SetUserRole('Employee'))
                    navigationService.navigate('LoginScreen')
                }}
            />
        </SafeAreaView>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(15, 0.3),
        // paddingVertical: moderateScale(20, 0.6),
        alignItems: 'center',
        paddingTop: windowHeight * 0.3,
    },
    welcomeText: {
        fontSize: moderateScale(40, 0.3),
        color: Color.themeBlue,
        marginTop: moderateScale(20, 0.6)
    },
    subtextStyle: {
        fontSize: moderateScale(12, 0.3),
        color: '#333333',
    },
});
