import { useIsFocused } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'


const Categories = () => {
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.commonReducer.userData);

    const category = [
        { id: 1, text: 'email', key: 'email' },
        // { id: 2, text: 'cover', key: 'cover-letter' },
        // { id: 3, text: 'career', key: 'career-blogs' },
        // { id: 4, text: 'survay', key: 'survey-form' },
    ];


    return (
        <View style={styles.container}>
            <Header title={'Categories'} hideUser={false} showBack />
            <View style={styles.main_view}>
                {category.map((item) => {
                    return (
                        <TouchableOpacity onPress={() => navigationService.navigate('SubCategory')} style={styles.card}>
                            <CustomText isBold style={{ color: Color.themeBlue, fontSize: moderateScale(15, 0.6) }}>{item?.text}</CustomText>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: moderateScale(15, 0.3),
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6)
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    card: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.15,
        backgroundColor: Color.lightGrey,
        marginTop: moderateScale(15, 0.6),
        borderRadius: moderateScale(15, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        justifyContent: 'center',
    }
})