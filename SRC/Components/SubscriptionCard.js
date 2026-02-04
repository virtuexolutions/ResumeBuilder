import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomText from './CustomText'
import { Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const SubscriptionCard = ({ data }) => {
    return (
        <View style={styles.main_view}>
            <View style={styles.header_view}>
                <CustomText isBold style={styles.heading}>{data?.planName}</CustomText>
                <View style={styles.row}>
                    <CustomText isBold style={styles.price}>{'$' + data?.price}</CustomText>
                    <CustomText style={styles.text}>{data?.priceUnit}</CustomText>
                </View>
                <View style={styles.row}>
                    <CustomText isBold style={styles.text}>{'$' + data?.pepm}</CustomText>
                    <CustomText style={styles.text}>{data?.pepmUnit}</CustomText>
                </View>
                <View style={styles.row}>
                    <CustomText isBold style={styles.text}>{'$' + data?.setupFee}</CustomText>
                    <CustomText style={styles.text}>{'setup fee'}</CustomText>
                </View>
            </View>
            <View style={styles.bottom_view}>
                <CustomText isBold style={styles.included}>{data?.included}</CustomText>
                {data?.features.map((item) => {
                    return (
                        <View key={item.id} style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-start', marginTop: moderateScale(10, 0.6) }]}>
                            <Icon name='check-circle' as={FontAwesome} size={moderateScale(16, 0.6)} style={{ marginLeft: moderateScale(10, 0.6) }} color={item?.isAdded ? Color.green : Color.yellow} />
                            <CustomText style={styles.feature}>{item.name}</CustomText>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default SubscriptionCard

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.7,
        backgroundColor: '#E6F4FF',
        marginRight: moderateScale(6, 0.6),
        borderRadius: moderateScale(10, 0.6)
    },
    header_view: {
        height: windowHeight * 0.15,
        width: windowWidth * 0.3,
        backgroundColor: Color.white,
        borderTopLeftRadius: moderateScale(10, 0.6),
        borderTopRightRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        paddingVertical: moderateScale(10, 0.6)
    },
    heading: {
        fontSize: moderateScale(14, 0.6),
        color: Color.darkBlue
    },
    price: {
        fontSize: moderateScale(22, 0.6)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: moderateScale(12, 0.6),
        marginLeft: moderateScale(3, 0.6)
    },
    bottom_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
    },
    included: {
        fontSize: moderateScale(12, 0.6),
        width: windowWidth * 0.2,
        textAlign: 'center'
    },
    feature: {
        fontSize: moderateScale(11, 0.6),
        textAlign: 'left',
        width: windowWidth * 0.22,
        marginLeft: moderateScale(5, 0.6)
    }

})