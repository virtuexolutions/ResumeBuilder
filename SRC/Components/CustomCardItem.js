import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'

const CustomCardItem = (item) => {
    return (
        <View style={styles.card_main_view}>
            <Text>CustomCardItem</Text>
        </View>
    )
}

export default CustomCardItem

const styles = StyleSheet.create({
    card_main_view: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.24,
        backgroundColor: '#deddd9',
        borderRadius: moderateScale(12, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        justifyContent: 'center',
        
    }
})