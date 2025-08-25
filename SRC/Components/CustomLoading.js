import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

const CustomLoading = ({ show, setShow, style }) => {
    return (
        <Modal
            isVisible={show}
            swipeDirection="up"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onBackdropPress={() => {
                setShow(false);
            }}>
            <View style={styles.modal_main_view}>
                <View style={styles.modal_sub_view}>
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
                            style,
                        ]}
                        source={require('../Assets/animations/loading.json')}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomLoading

const styles = StyleSheet.create({
    modal_main_view: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        alignItems: "center",
        justifyContent: "center"
    },
    modal_sub_view: {
        width: windowWidth * 0.8,
        height: windowWidth * 0.7,
        backgroundColor: Color.white,
        borderRadius: moderateScale(15, 0.6)
    }
})