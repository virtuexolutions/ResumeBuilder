import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from './CustomText'

const CardComponent = ({ data, image, name, text }) => {
    return (
        <View style={styles.main_view}>
            <View style={styles.row_view}>
                <View style={styles.circle}>
                    <CustomText style={styles.initialText}>{image}</CustomText>
                </View>
                <View>
                    <CustomText style={styles.heading}>{name}</CustomText>
                    <CustomText style={styles.text}>{text}</CustomText>
                </View>
            </View>
        </View>
    )
}

export default CardComponent

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.17,
        backgroundColor: '#ECECEC',
        marginTop: moderateScale(10, 0.6),
        borderRadius: moderateScale(10, 0.6),
        padding: moderateScale(10, 0.6),
        // alignItems:'center',
        justifyContent: 'center'
    },
    row_view: {
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    circle: {
        backgroundColor: Color.themeBlue,
        width: moderateScale(40, 0.6),
        height: moderateScale(40, 0.6),
        borderRadius: moderateScale(20, 0.6),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10, 0.6),
    },
    initialText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(18, 0.6),
    },
    heading: {
        fontSize: moderateScale(14, 0.6),
        textDecorationLine: 'underline',
        textDecorationColor: Color.veryLightGray,
        letterSpacing: 0.8
    },
    text: {
        fontSize: moderateScale(12, 0.6),
        color: Color.veryLightGray
    }
})