import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
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
import LinearGradient from 'react-native-linear-gradient';

const CompanyWelcome = ({ navigation, route }) => {
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
                <CustomText style={styles.welcomeText}>
                    Welcome to your company workspace
                </CustomText>
                <CustomText style={styles.subtextStyle}>
                    What would you like to do?
                </CustomText>
                <LinearGradient style={{
                    width: windowWidth * 0.72,
                    height: windowWidth * 0.16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: moderateScale(10, 0.3),
                    marginTop: moderateScale(10, 0.6)
                }}
                    start={{ x: 1, y: 0.2 }}
                    end={{ x: 1, y: 1 }}
                    colors={Color.themeBgColor}>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <CustomText style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>Onboarding Center</CustomText>
                        <CustomText style={{ fontSize: moderateScale(11, 0.6), color: Color.white }}>start new onboarding or track progress</CustomText>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={{
                    width: windowWidth * 0.72,
                    height: windowWidth * 0.18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: moderateScale(10, 0.3),
                    marginTop: moderateScale(10, 0.6),
                    backgroundColor: Color.white,
                    paddingHorizontal: moderateScale(14, 0.6),
                    borderWidth: 2,
                    borderColor: Color.darkBlue
                }}
                >
                    <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.darkBlue }}>Admin Dashboard</CustomText>
                    <CustomText style={{ fontSize: moderateScale(11, 0.6), color: Color.black, textAlign: 'center' }}>Manage employees, permissions, and company settings</CustomText>
                </TouchableOpacity>
                <View style={{}}>

                </View>
            </View>
        </ImageBackground>
    );
};

export default CompanyWelcome;

const styles = StyleSheet.create({
    gradient: {
        width: windowWidth,
        height: windowHeight,
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
        color: Color.black,
        marginVertical: moderateScale(10, 0.6),
        textAlign: 'center',
        width: windowWidth * 0.8,
        fontWeight: '600'
    },
    subtextStyle: {
        fontSize: moderateScale(16, 0.3),
        color: Color.darkGray,
    },
});
