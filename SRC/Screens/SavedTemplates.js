import { useIsFocused } from '@react-navigation/core';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    I18nManager,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';

const SavedTemplates = () => {
    const isFocused = useIsFocused()
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [saveresumeData, setSaveResumeData] = useState([])
    const [emailData, setEmailData] = useState([])
    const [coverLetter, setCoverLetter] = useState([])
    const [career_blog, setCareerBlog] = useState([])
    const [survayForm, setSurvayForm] = useState([])
    console.log("🚀 ~ SavedTemplates ~ emailData:", emailData)
    const [selectedCategoty, setSelectedCategory] = useState('resume')
    console.log("🚀 ~ SavedTemplates ~ selectedCategoty:", selectedCategoty)
    const category = [
        // {
        //     id: 1,
        //     text: 'resume',
        //     subtext: 'tempaletes',
        // },
        {
            id: 2,
            text: 'email',
            subtext: 'tempaletes',
        },
        {
            id: 3,
            text: 'cover',
            subtext: 'letter',
        },
        {
            id: 4,
            text: 'career',
            subtext: 'blog',
        },
        {
            id: 5,
            text: 'Survay',
            subtext: 'Form',
        },
    ];

    useEffect(() => {
        getMailData()
        getCoverLetterData()
        getCareerBlog()
        getSurvayForm()
    }, [isFocused])

    const getMailData = async () => {
        const url = 'auth/mail'
        setLoading(true)
        const response = await Get(url, token)
        console.log("🚀 ~ getMailData ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setEmailData(response?.data?.data)
        }
    }
    const getResumeData = async () => {
        const url = 'auth/resumes'
        setLoading(true)
        const response = await Get(url, token)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setSaveResumeData(response?.data?.data)
        }
    }

    const getCoverLetterData = async () => {
        const url = 'auth/cover-letter'
        setLoading(true)
        const response = await Get(url, token)
        console.log("🚀 ~ getCoverLetterData ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setCoverLetter(response?.data?.data)
        }
    }

    const getCareerBlog = async () => {
        const url = 'auth/career-blog'
        setLoading(true)
        const response = await Get(url, token)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setCareerBlog(response?.data?.data)
        }
    }

    const getSurvayForm = async () => {
        const url = 'auth/survey'
        setLoading(true)
        const response = await Get(url, token)
        console.log("🚀 ~ getSurvayForm ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            setLoading(false)
            setSurvayForm(response?.data?.data)
        }
    }

    const onPressCard = (data) => {
        console.log("🚀 ~ onPressCard ~ data:", data)
        navigationService.navigate(data?.template?.key, { data: data, fromHome: false, fromSave: true, })
    }
    
    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header title={'Saved Templates'} hideUser={true} showBack={true} />
            <View style={styles.main_view}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        width: windowWidth * 0.9,
                    }}>
                        <CustomText isBold style={[styles.title, {
                            marginRight: moderateScale(3, 0.6),
                            color: Color.white
                        }]}>Select category</CustomText>
                        <Icon
                            onPress={() => setDropDown(!dropDown)}
                            name={dropDown ? 'up' : 'down'}
                            as={AntDesign}
                            size={moderateScale(13, 0.6)}
                            color={Color.white}
                        />
                    </View>
                    {dropDown &&
                        <View style={styles.con}>
                            {category?.map((item) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: moderateScale(10, 0.6),
                                            paddingVertical: moderateScale(1, 0.6)
                                        }}>
                                        <CustomText
                                            onPress={() => {
                                                setSelectedCategory(item?.text)
                                                setDropDown(false)
                                            }}
                                            style={{
                                                fontSize: moderateScale(14, 0.6),
                                                color: Color.darkBlue,
                                                paddingHorizontal: moderateScale(5, 0.6),
                                                textTransform: 'capitalize'
                                            }}>
                                            {item?.text}
                                        </CustomText>
                                        {selectedCategoty === item?.text &&
                                            <Icon
                                                style={{
                                                    paddingTop: moderateScale(2, 0.6),
                                                }}
                                                name="check"
                                                as={AntDesign}
                                                size={moderateScale(14, 0.6)}
                                                color={Color.darkBlue}
                                            />
                                        }
                                    </View>
                                )
                            })

                            }
                        </View>
                    }
                    {loading ?
                        <ActivityIndicator size="small"
                            style={{
                                marginTop: moderateScale(20, 0.6)
                            }}
                            color={Color.darkBlue} /> :
                        <FlatList
                            style={{
                                height: '100%',
                            }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            data={selectedCategoty === 'email' ? emailData : selectedCategoty === 'resume' ? saveresumeData : selectedCategoty === 'cover' ? coverLetter : selectedCategoty === 'Survay' ? survayForm : career_blog}
                            ListFooterComponent={() => {
                                return <View style={{ height: windowHeight * 0.2 }} />;
                            }}
                            ListEmptyComponent={<CustomText style={{
                                fontSize: moderateScale(13, 0.6),
                                color: Color.red,
                                textAlign: "center",
                                marginTop: moderateScale(20, 0.6)
                            }}>no data Found</CustomText>}
                            renderItem={({ item, index }) => {
                                console.log(item, 'itemmmmmmmmmmmmmm')
                                return (
                                    <TouchableOpacity onPress={() =>
                                        onPressCard(item)
                                    } style={styles.card}>
                                        <View style={[styles.card_image, {
                                            height: windowHeight * 0.07,
                                            width: windowWidth * 0.2,
                                        }]}>
                                            <CustomImage
                                                source={selectedCategoty === 'resume' ? require('../Assets/Images/resume.jpeg') : require('../Assets/Images/email.jpeg')}
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                            />
                                        </View>
                                        <View style={styles.content}>
                                            <View>
                                                <CustomText style={styles.heading}>
                                                    {item?.tamplate_title}
                                                </CustomText>
                                                <CustomText numberOfLines={3} style={styles.description}>
                                                    {item?.tamplate_description}
                                                </CustomText>
                                                {/* {selectedCategoty === 'email' &&
                                                    <CustomText numberOfLines={3} style={styles.description}>
                                                        {item?.summary}
                                                    </CustomText>
                                                } */}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                );
                            }}
                        />
                    }
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default SavedTemplates;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        alignItems: 'center',
        height: windowHeight,
        justifyContent: 'center',
    },
    main_view: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.9,
        paddingVertical: moderateScale(15, 0.6),
        alignItems: 'center',
    },
    letter_bg: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.6,
        paddingHorizontal: moderateScale(20, 0.6),
        backgroundColor: Color.white,
        marginVertical: moderateScale(30, 0.6),
    },
    indicatorStyle: {
        paddingRight: 5,
        paddingLeft: I18nManager.isRTL ? 5 : 0,
    },
    titlecontainer: {
        alignItems: 'center',
        paddingVertical: moderateScale(15, 0.6),
    },
    title: {
        fontSize: moderateScale(14, 0.6),
        // textTransform: 'uppercase',
        textAlign: 'center',
    },
    txt: {
        fontSize: moderateScale(13, 0.6),
        color: Color.white,
    },
    title2: {
        fontSize: moderateScale(12, 0.6),
        textTransform: 'capitalize',
        width: '100%',
        textAlign: 'center',
        // color: Color.darkGray,
        // paddingVertical: moderateScale(30, 0.6),
        paddingTop: moderateScale(30, 0.6),
    },
    per_data: {
        alignItems: 'flex-start',
        // backgroundColor :'red'
    },

    per_text: {
        textTransform: 'capitalize',
        fontSize: moderateScale(11, 0.6),
        // color: Color.darkGray,
    },
    con: {
        backgroundColor: Color.lightGrey,
        height: windowHeight * 0.15,
        borderWidth: 1,
        borderColor: Color.lightGrey,
        width: windowWidth * 0.4,
        borderRadius: moderateScale(10, 0.6),
        zIndex: 1,
        position: 'absolute',
        right: 10,
        top: 30,
    },
    LogoText: {
        fontSize: moderateScale(35, 0.3),
        fontWeight: 'bold',
    },
    card: {
        width: windowWidth * 0.9,
        backgroundColor: Color.white,
        // height: windowHeight * 0.11,
        borderRadius: moderateScale(12, 0.6),
        flexDirection: 'row',
        gap: moderateScale(12, 0.3),
        marginTop: moderateScale(11, 0.2),
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(12, 0.2),
    },
    card_image: {
        height: windowHeight * 0.11,
        width: windowWidth * 0.2,
        // backgroundColor: 'red',
    },
    content: {
        width: '75%',
        //  backgroundColor: Color.red,
        // flexDirection:"column",
        // overflow:'hidden'
    },
    heading: {
        fontSize: moderateScale(16, 0.3),
    },
    description: {
        // width:"100%",
        fontSize: moderateScale(10, 0.2),
        color: Color.grey,
    },
    ratingView: {
        // width:'100%',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(4, 0.2),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(5, 0.4),
    },
});
