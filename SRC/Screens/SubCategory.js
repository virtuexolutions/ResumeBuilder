import { useIsFocused } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { baseUrl } from '../Config'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'

const SubCategory = () => {
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const userData = useSelector(state => state.commonReducer.userData);
    const [emailData, setEmailData] = useState([]);

    useEffect(() => {
        console.log("useEffect running, isFocused:", isFocused);
        getMailData();
    }, [isFocused]);


    const getMailData = async () => {
        setLoading(true);
        const response = await Get('auth/mail', token);
        console.log("🚀 ~ getMailData ~ response:", response?.data)
        if (response?.data) setEmailData(response.data.data);
        setLoading(false);
    };

    const onPressCard = (data) => {
        navigationService.navigate(data?.template?.key, {
            data,
            fromHome: false,
            fromSave: true,
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            <Header title={'SubCategory'} hideUser={false} showBack />
            <View style={styles.main_view}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={Color.themeBlue}
                        style={{ marginTop: moderateScale(20, 0.6) }}
                    />
                ) : (
                    <FlatList
                        data={emailData}
                        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                        ListEmptyComponent={
                            <CustomText style={styles.noDataText}>No Data Found</CustomText>
                        }
                        renderItem={({ item }) => {
                            console.log("🚀 ~ Documents ~ item:", item)
                            const nameInitial = (item?.Documents_name || ' ')[0]?.toUpperCase() || '?';
                            return (
                                <TouchableOpacity onPress={() =>
                                    onPressCard(item)
                                } style={styles.card}>
                                    <View style={[styles.card_image,]}>
                                        <CustomImage
                                            source={{ uri: `${baseUrl}${item?.template?.image}` }}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: moderateScale(4, 0.6),
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                                        <CustomText style={styles.heading}>
                                            {item?.tamplate_title}
                                        </CustomText>
                                        <CustomText numberOfLines={1} style={styles.description}>
                                            {item?.tamplate_description}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default SubCategory

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
        // paddingHorizontal: moderateScale(10, 0.6)
    },
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    noDataText: {
        textAlign: 'center',
        marginTop: moderateScale(20, 0.6),
        color: Color.red,
    },
    card: {
        width: windowWidth * 0.95,
        backgroundColor: Color.lightGrey,
        height: windowWidth * 0.18,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'flex-start',
        alignItems: 'center', paddingHorizontal: moderateScale(5, 0.6),
        flexDirection: 'row',
        marginBottom: moderateScale(10, 0.6)
    },
    card_image: {
        height: windowHeight * 0.07,
        width: windowWidth * 0.2,
        borderRadius: moderateScale(10, 0.6),
    },
    description: {
        width: windowWidth * 0.8,
        fontSize: moderateScale(10, 0.6),
        color: Color.darkGray
    },
    heading: {
        fontSize: moderateScale(12, 0.6),
        color: Color.black
    }
})