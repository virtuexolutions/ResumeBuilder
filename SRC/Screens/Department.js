import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton'
import CardComponent from '../Components/CardComponent'
import navigationService from '../navigationService'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'
import CustomText from '../Components/CustomText'
import ListEmphtyComponent from '../Components/ListEmphtyComponent'
import { SafeAreaView } from 'react-native-safe-area-context';

const Department = () => {
    const isFocused = useIsFocused()
    const [departments, setDepartments] = useState([])
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    useEffect(() => {
        getDepartments()
    }, [isFocused])

    useEffect(() => {
        handleSearch();
    }, [search]);


    const getDepartments = async () => {
        const url = 'auth/department_list';
        setLoading(true);
        const response = await Get(url, token);
        setLoading(false);
        if (response?.data != undefined) {
            setDepartments(response?.data?.data);
            setFilteredDepartments(response?.data?.data);
        }
    };


    const handleSearch = () => {
        if (search.trim() === '') {
            setFilteredDepartments(departments);
        } else {
            const filtered = departments.filter(item =>
                item?.department_name?.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredDepartments(filtered);
        }
    };


    return (
        <View style={styles.container}>
            <Header hideUser={false} showBack={false} isRight onPressPlus={() => navigationService.navigate('AddDepartment', { data: {} })} rightText={'Add Department'} />
            <View style={styles.main_view}>
                <View style={styles.search_bar_view}>
                    <TextInputWithTitle
                        iconName={'search1'}
                        iconType={AntDesign}
                        color={Color.veryLightGray}
                        setText={setSearch}
                        value={search}
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
                        onPress={handleSearch}
                    />
                </View>
                {loading ?
                    <ActivityIndicator size="small"
                        color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> :
                    <FlatList
                        data={filteredDepartments}
                        keyExtractor={(item) => item?.id}
                        ListEmptyComponent={<ListEmphtyComponent />}
                        renderItem={(({ item }) => {
                            const nameInitial = (item?.department_name || ' ')[0]?.toUpperCase() || '?';
                            return (
                                <CardComponent data={item}
                                    image={nameInitial}
                                    name={item?.department_name}
                                    text={`Number of Employees ${item?.number_of_employees_in_depart}`}
                                    onPress={() => navigationService.navigate('DepartmentDetails', { data: item })}
                                />
                            )
                        })}
                    />
                }
            </View>
        </View>
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
        // justifyContent : 'center'
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    }
})