import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import CustomText from './CustomText'
const AttachmentsCard = ({ item }) => {
    return (
        <View style={styles.card_view}>
            <View style={styles.image_view}>
                <Icon name='file-pdf' as={FontAwesome6} size={moderateScale(25, 0.6)} color={Color.white} />
            </View>
            <View style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.63
            }}>
                <CustomText>{item?.name}</CustomText>
                <CustomText>{'9-02-2026'}</CustomText>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Icon as={FontAwesome5} name='eye' size={moderateScale(15, 0.6)} color={Color.veryLightGray} />
                <Icon as={FontAwesome6} name='download' size={moderateScale(15, 0.6)} color={Color.veryLightGray} style={{ marginLeft: moderateScale(10, 0.6) }} />
            </View>
        </View >
    )
}

export default AttachmentsCard

const styles = StyleSheet.create({
    card_view: {
        height: windowWidth * 0.15,
        backgroundColor: Color.lightGrey,
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: moderateScale(10, 0.6),
        width: windowWidth * 0.95
    },
    image_view: {
        width: windowWidth * 0.12,
        backgroundColor: 'rgba(24, 119, 242,0.7)',
        height: windowWidth * 0.12,
        borderRadius: moderateScale(5, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
    }
})