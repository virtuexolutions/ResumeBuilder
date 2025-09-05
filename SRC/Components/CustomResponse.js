import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from 'native-base'
import CustomText from './CustomText'

const CustomResponse = ({ selectedOption, setShow }) => {
    return (
        <View style={styles.main_view}>
            <TouchableOpacity onPress={() => {
                selectedOption('text')
                setShow(true)
            }} style={styles.sub_view}>
                <Icon name='text' as={Ionicons} size={moderateScale(20, 0.6)} color={Color.boxgrey} />
                <CustomText style={styles.text}>Add Text</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                selectedOption('image')
                setShow(true)
            }} style={styles.sub_view}>
                <Icon name='image' as={AntDesign} size={moderateScale(20, 0.6)} color={Color.boxgrey} />
                <CustomText style={styles.text}>Add Image</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                selectedOption('document')
                setShow(true)
            }} style={styles.sub_view}>
                <Icon name='document' as={Ionicons} size={moderateScale(20, 0.6)} color={Color.boxgrey} />
                <CustomText style={styles.text}>Add document</CustomText>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                selectedOption('signature')
                setShow(true)
            }} style={styles.sub_view}>
                <Icon name='signature' as={FontAwesome5} size={moderateScale(20, 0.6)} color={Color.boxgrey} />
                <CustomText style={styles.text}>Add signature</CustomText>
            </TouchableOpacity>
        </View>
    )
}

export default CustomResponse

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth * 0.93,
        height: windowWidth * 0.17,
        backgroundColor: Color.white,
        position: 'absolute',
        bottom: 20,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: moderateScale(20, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    sub_view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: moderateScale(10, 0.6),
        color: Color.boxgrey
    }
})