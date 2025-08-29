import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'

const PaymentScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={"Payment Screen"} />
            <View style={styles.main_view}>

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
        justifyContent: "center",
        alignItems: 'center'
    },
})
