import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CardComponent from '../Components/CardComponent';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { Get } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import { baseUrl } from '../Config';

const Documents = () => {
    const isFocused = useIsFocused();
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false);
    const [saveresumeData, setSaveResumeData] = useState([]);
    const [emailData, setEmailData] = useState([]);
    const [coverLetter, setCoverLetter] = useState([]);
    const [career_blog, setCareerBlog] = useState([]);
    const [survayForm, setSurvayForm] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('email');

    const category = [
        { id: 1, text: 'email', key: 'email' },
        { id: 2, text: 'cover', key: 'cover-letter' },
        { id: 3, text: 'career', key: 'career-blogs' },
        { id: 4, text: 'survay', key: 'survey-form' },
    ];

    useEffect(() => {
        console.log("useEffect running, isFocused:", isFocused);
        getMailData();
        getCoverLetterData();
        getCareerBlog();
        getSurvayForm();
    }, [isFocused]);


    const getMailData = async () => {
        setLoading(true);
        const response = await Get('auth/mail', token);
        console.log("🚀 ~ getMailData ~ response:", response?.data)
        if (response?.data) setEmailData(response.data.data);
        setLoading(false);
    };

    const getCoverLetterData = async () => {
        setLoading(true);
        const response = await Get('auth/cover-letter', token);
        console.log("🚀 ~ getCoverLetterData ~ response:", response?.data)
        if (response?.data) setCoverLetter(response.data.data);
        setLoading(false);
    };

    const getCareerBlog = async () => {
        setLoading(true);
        const response = await Get('auth/career-blog', token);
        console.log("🚀 ~ getCareerBlog ~ response:", response?.data)
        if (response?.data) setCareerBlog(response.data.data);
        setLoading(false);
    };

    const getSurvayForm = async () => {
        setLoading(true);
        const response = await Get('auth/survey', token);
        if (response?.data) { setSurvayForm(response.data.data) } else {
            setLoading(false);
        }
        setLoading(false);
    };

    const onPressCard = (data) => {
        navigationService.navigate(data?.template?.key, {
            data,
            fromHome: false,
            fromSave: true,
        });
    };

    const getDataByCategory = () => {
        switch (selectedCategory) {
            case 'email': return emailData;
            case 'cover': return coverLetter;
            case 'career': return career_blog;
            case 'survay': return survayForm;
            default: return [];
        }
    };
    console.log("🚀 ~ getDataByCategory ~ getDataByCategory:", getDataByCategory())

    return (
        <SafeAreaView style={styles.container}>
            <Header hideUser={false} showBack={true} title={'Documents'} />
            <View style={styles.main_view}>
                <View style={{
                    height: windowWidth * 0.16
                }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryListContainer}
                        data={category}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedCategory(item.text)}
                                style={[
                                    styles.btn,
                                    selectedCategory === item.text && { backgroundColor: Color.themeBlue }
                                ]}
                            >
                                <CustomText
                                    style={{
                                        color: selectedCategory === item.text ? Color.white : Color.black,
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {item.text}
                                </CustomText>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={Color.themeBlue}
                        style={{ marginTop: moderateScale(20, 0.6) }}
                    />
                ) : (
                    <FlatList
                        data={getDataByCategory()}
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
                                    <View style={[styles.card_image]}>
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
    );
};

export default Documents;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        flex: 1,
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        width: '100%',
    },
    categoryListContainer: {
        paddingVertical: moderateScale(5, 0.6),
        paddingHorizontal: moderateScale(5, 0.6),
    },
    btn: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.1,
        backgroundColor: Color.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(10, 0.6),
        marginRight: moderateScale(10, 0.6),
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
});
