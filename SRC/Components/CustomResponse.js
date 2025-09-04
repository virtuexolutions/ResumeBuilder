import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/Entypo'
import { Icon } from 'native-base'

const CustomResponse = () => {
    return (
        <View style={styles.main_view}>

            {/* <View>
                <Icon name='image' as={AntDesign} size={moderateScale(20, 0.6)} color={Color.darkGray} />
            </View>
            <View>
                <Icon name='image' as={AntDesign} size={moderateScale(20, 0.6)} color={Color.darkGray} />
            </View><View>
                <Icon name='image' as={AntDesign} size={moderateScale(20, 0.6)} color={Color.darkGray} />
            </View> */}
        </View>
    )
}

export default CustomResponse

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.93,
        height: windowWidth * 0.15,
        backgroundColor: Color.white,
        position: 'absolute',
        bottom: 20,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: moderateScale(10, 0.6)
    }
})