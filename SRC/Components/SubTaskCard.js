import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from './CustomText'

const SubTaskCard = ({ item }) => {
    return (
        <View style={styles.card_view}>
            <CustomText isBold style={styles.title}>{item?.title}</CustomText>
            <View style={[styles.status_card, { backgroundColor: item?.isDone === true ? Color.green : Color.red, }]}>
                <CustomText style={styles.status_text}>{item?.isDone === true ? 'Complete' : 'In Progress'}</CustomText>
            </View>
        </View>
    )
}

export default SubTaskCard

const styles = StyleSheet.create({
    card_view: {
        width: windowWidth * 0.95,
        backgroundColor: 'rgba(24, 119, 242, 0.1)',
        height: windowWidth * 0.14,
        marginTop: moderateScale(10, 0.7),
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: moderateScale(12, 0.6),
    },
    status_card: {
        borderRadius: moderateScale(10, 0.6),
        height: moderateScale(28, 0.6),
        width: windowWidth * 0.16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    status_text: {
        fontSize: moderateScale(10, 0.6),
        color: Color.white
    }
})