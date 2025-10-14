import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { hideErrorModal } from '../Store/slices/common';
import { useDispatch, useSelector } from 'react-redux';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from './CustomImage';
import LottieView from 'lottie-react-native';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const GlobalErrorModal = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.commonReducer.error);
    console.log(error, 'errrorrr')
    if (!error?.visible) return null;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={error?.visible}
            onRequestClose={() => dispatch(hideErrorModal())}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {error?.title === 'Network Error' ? (
                        <View
                            style={{
                                width: windowWidth * 0.35,
                                height: windowWidth * 0.35,
                            }}
                        >
                            <CustomImage source={require('../Assets/Images/no_internet.png')} style={styles.image} />
                        </View>
                    ) : (
                        <View style={styles.image_view}>
                            <LottieView
                                autoPlay
                                loop
                                style={{
                                    height: '100%',
                                    width: 200,
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}
                                source={require('../Assets/animations/error.json')}
                            />
                        </View>
                    )}

                    <CustomText isBold style={styles.title}>{error?.title}</CustomText>
                    <CustomText style={styles.message}>{error?.message}</CustomText>
                    <CustomButton
                        text={'Try Again'}
                        width={windowWidth * 0.5}
                        height={windowHeight * 0.050}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.red}
                        bgColor={Color.lightGrey}
                        borderWidth={2}
                        borderColor={Color.red}
                        onPress={() => {
                            dispatch(hideErrorModal())
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default GlobalErrorModal;

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: windowWidth,
        height: windowHeight
    },
    container: {
        width: windowWidth * 0.85,
        height: windowHeight * 0.37,
        backgroundColor: Color.white,
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: moderateScale(24, 0.9),
        fontWeight: 'bold',
        color: Color.red,
        fontStyle: 'italic',
    },
    message: {
        fontSize: moderateScale(14, 0.6),
        textAlign: 'center',
        marginBottom: moderateScale(20, 0.6),
        color: Color.grey
    },
    button: {
        backgroundColor: '#2E7D32',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image_view: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        backgroundColor: Color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});
