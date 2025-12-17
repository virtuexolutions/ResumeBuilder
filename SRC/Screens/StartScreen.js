import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';

import { useDispatch } from 'react-redux';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const fromSignup = route?.params?.fromSignup;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    return (
        <ImageBackground source={require('../Assets/Images/background_image.png')}
            style={styles.gradient}
        >
            <View style={styles.container}>
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
                    Welcome! We’re excited to have you join us.
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
                        navigationService.navigate('LoginScreen', { type: 'Company' })
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
                        navigationService.navigate('LoginScreen', { type: 'Employee' })
                    }}
                />
                <CustomButton
                    text={isLoading ? <ActivityIndicator color={'white'} size={moderateScale(12, 0.2)} /> : 'private Ewallet'}
                    textColor={Color.black}
                    isBold
                    width={windowWidth * 0.35}
                    style={{
                        height: moderateScale(50, 0.3),
                        borderRadius: moderateScale(20, 0.3),
                        backgroundColor: Color.lightGrey,
                        marginTop: windowHeight * 0.02,
                        width: windowWidth * 0.6,
                        borderColor: Color.darkGray,
                        borderWidth: 2
                    }}
                    onPress={() => {
                        navigationService.navigate('LoginScreen', { type: 'Private' })
                    }}
                />
            </View>
        </ImageBackground>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    gradient: {
        // width: windowWidth,
        // height: windowHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: windowWidth,
        height: windowHeight,
        paddingHorizontal: moderateScale(15, 0.3),
        alignItems: 'center',
        justifyContent: "center"
    },
    welcomeText: {
        fontSize: moderateScale(25, 0.3),
        color: Color.blue,
        marginVertical: moderateScale(20, 0.6),
        textAlign: 'center'
    },
    subtextStyle: {
        fontSize: moderateScale(12, 0.3),
        color: '#333333',
    },
});
