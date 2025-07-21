import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton'
import CardComponent from '../Components/CardComponent'
import navigationService from '../navigationService'
import { Get } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'
import { date } from 'yup'
import CustomText from '../Components/CustomText'

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
        <SafeAreaView style={styles.container}>
            <Header title={'Categories'} hideUser={false} showBack />
            <View style={styles.main_view}>
                {category.map((item) => {
                    return (
                        <TouchableOpacity onPress={() => navigationService.navigate('SubCategory')} style={styles.card}>
                            <CustomText isBold style={{ color: Color.themeBlue, fontSize: moderateScale(15, 0.6) }}>{item?.text}</CustomText>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
        </SafeAreaView>
    )
}

export default Categories

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