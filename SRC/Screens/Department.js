import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
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
import CustomText from '../Components/CustomText'

const Department = () => {
    const isFocused = useIsFocused()
    const [departments, setDepartments] = useState([])
    console.log("🚀 ~ Department ~ departments:", departments)
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ Department ~ token:", token)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDepartments()
    }, [isFocused])

    const getDepartments = async () => {
        const url = 'auth/department_list'
        setLoading(true)
        const response = await Get(url, token)
        console.log("🚀 ~ getDepartments ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setDepartments(response?.data?.data)
        } else {
            setLoading(false)
        }
    }

    const employee_list = [
        {
            id: 1,
            name: 'Designers',
            designation: "supervisor",
        },
        {
            id: 2,
            name: 'Sales',
            designation: "supervisor",
        }, {
            id: 3,
            name: 'Designers',
            designation: "supervisor",
        }, {
            id: 4,
            name: 'Sales',
            designation: "supervisor",
        }, {
            id: 5,
            name: 'Designers',
            designation: "supervisor",
        }, {
            id: 6,
            name: 'Sales',
            designation: "supervisor",
        }, {
            id: 7,
            name: 'Designers',
            designation: "supervisor",
        }, {
            id: 8,
            name: 'Sales',
            designation: "supervisor",
        }, {
            id: 9,
            name: 'Designers',
            designation: "supervisor",
        }, {
            id: 10,
            name: 'Adrian',
            designation: "supervisor",
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <Header hideUser={false} showBack={false} isRight onPressPlus={() => navigationService.navigate('AddDepartment')} rightText={'Add Department'} />
            <View style={styles.main_view}>
                <View style={styles.search_bar_view}>
                    <TextInputWithTitle
                        iconName={'search1'}
                        iconType={AntDesign}
                        color={Color.veryLightGray}
                        // setText={setEmail}
                        // value={email}
                        placeholder={'Search Department'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.7}
                        viewHeight={0.055}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.veryLightGray}
                    />
                    <CustomButton
                        text={'Search'}
                        width={windowWidth * 0.22}
                        height={windowHeight * 0.055}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.white}
                        bgColor={Color.themeBlue}
                        onPress={() => {
                            Login()
                        }}
                    />
                </View>
                {loading ?
                    <ActivityIndicator size="small"
                        color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> :
                    <FlatList
                        data={departments}
                        keyExtractor={(item) => item?.id}
                        ListEmptyComponent={<CustomText style={{ textAlign: 'center', marginTop: moderateScale(20, 0.6), color: Color.red }}>no Data found</CustomText>}
                        renderItem={(({ item }) => {
                            const nameInitial = (item?.department_name || ' ')[0]?.toUpperCase() || '?';
                            return (
                                <CardComponent data={item}
                                    image={nameInitial}
                                    name={item?.department_name}
                                    text={`Number of Employees ${item?.number_of_employees_in_depart}`}
                                />
                            )
                        })}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default Department

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
    }
})