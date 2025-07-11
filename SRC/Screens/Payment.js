import { useIsFocused } from '@react-navigation/core'
import React, { useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import Header from '../Components/Header'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'

const Payment = () => {
    const isFocused = useIsFocused()
    const [CheckOutScreens, setCheckOutScreens] = useState([])
    const token = useSelector(state => state.authReducer.token);
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={styles.bg_container}
                source={require('../Assets/Images/bg.png')}>
                <Header title={'Payment'} hideUser={false} showBack={true} onPressPlus={() => navigationService.navigate('AddCheckOutScreen')} />
                <View style={styles.main_view}>

                </View>
            </ImageBackground>
        </SafeAreaView >
    )
}

export default Payment

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