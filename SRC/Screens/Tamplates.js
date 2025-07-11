import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import SearchContainer from '../Components/SearchContainer';
import { FlatList, Icon } from 'native-base';
import CustomImage from '../Components/CustomImage';
import { Rating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';
import { useIsFocused } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { baseUrl } from '../Config';

const Tamplates = () => {
    const userData = useSelector(state => state.commonReducer.userData);
    const isFocused = useIsFocused();
    const token = useSelector(state => state.authReducer.token);
    console.log("🚀 ~ Tamplates ~ token:", token)
    const [loading, setLoading] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [showCategory, setshowCategory] = useState('resume');
    const [selectedCategoty, setSelectedCategory] = useState({
        id: 2,
        text: 'email',
        subtext: 'tempaletes',
    });
    console.log("🚀 ~ Tamplates ~ selectedCategoty:", selectedCategoty)
    const [tamplates, setTamplates] = useState([]);
    console.log("🚀 ~ Tamplates ~ tamplates:", tamplates)
    useEffect(() => {
        getTamplates()
    }, [selectedCategoty])

    const getTamplates = async () => {
        const url = 'auth/category-list';
        setLoading(true);

        try {
            const response = await Get(url, token);
            const categories = response?.data?.data;
            setLoading(false);

            let matchedCategory = null;

            switch (selectedCategoty) {
                case 'cover-letter':
                    matchedCategory = categories.find(cat => cat.slug === 'cover-letter');
                    break;
                case 'email':
                    matchedCategory = categories.find(cat => cat.slug === 'email');
                    break;
                case 'survey-form':
                    matchedCategory = categories.find(cat => cat.slug === 'survey-form');
                    break;
                case 'career-blogs':
                    matchedCategory = categories.find(cat => cat.slug === 'career-blogs');
                    break;
                default:
                    matchedCategory = null;
            }

            if (matchedCategory) {
                let templates = matchedCategory.templates || [];

                if (selectedCategoty === 'survey-form') {
                    templates = templates.filter(
                        template =>
                            template.key !== 'ProgressFeedback' &&
                            template.key !== 'ChecklistScreen'
                    );
                }

                templates = templates.filter(
                    template => template.id !== 2 && template.id !== 3
                );

                setTamplates(templates);
            } else {
                setTamplates([]);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching templates:', error);
        }
    };

    const category = [
        {
            id: 2,
            text: 'email',
            subtext: 'tempaletes',
            key: 'email'
        },
        {
            id: 3,
            text: 'cover',
            subtext: 'letter',
            key: 'cover-letter'
        },
        {
            id: 4,
            text: 'career',
            subtext: 'blog',
            key: 'career-blogs'
        },
        {
            id: 5,
            text: 'survay',
            subtext: 'forms',
            key: 'survey-form'
        },
    ];
    const resumeData = [
        {
            id: 1,
            heading: 'Creative',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/resume.jpeg'),
            type: 'creative',
        },
    ];
    const coverletterData = [
        {
            id: 1,
            heading: 'Creative',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/coverletter.png'),
            type: 'coverLetter'
        },
    ];
    const careerBlogdata = [
        {
            id: 1,
            heading: 'Creative',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/blogbg.png'),
            type: 'blog',
        },
        {
            id: 2,
            heading: 'welcome OnBoarding',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/onboard.jpeg'),
            type: 'OnBoarding',
            templeteType: 1,
        },
        {
            id: 3,
            heading: 'welcome OnBoarding',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/onboard3.jpeg'),
            type: 'OnBoarding',
            templeteType: 2,
        },
    ];
    const cvdata = [
        // {
        //   id: 2,
        //   heading: 'WelCome Email',
        //   description:
        //     'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
        //   image: require('../Assets/Images/email_tamplate2.jpeg'),
        //   type: 'email',
        //   tamplateType: 'companyEmail'
        // },
        {
            id: 1,
            heading: 'late attendence policy',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/email-temp.jpeg'),
            tamplateType: 'attendencepolicy',
            type: 'attendencepolicy',
            price: 0
        },
    ];
    const survayForm = [
        {
            id: 1,
            heading: 'Survey Form',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/form_image.png'),
            templeteType: 'SurveyForm'
        },
        {
            id: 2,
            heading: 'Customer Survey Form',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/customer_survey.jpeg'),
            templeteType: 'customerForm'
        },
        {
            id: 3,
            heading: 'Feedback form',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/feedback_form.jpeg'),
            templeteType: 'feedbackForm'
        },
        {
            id: 4,
            heading: 'Progress FeedBack Form',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/feedback_form2.jpeg'),
            templeteType: 'progressForm'
        },
        {
            id: 5,
            heading: ' compliance checklist',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/checklist.jpeg'),
            templeteType: 'checklist',
            type: 'checklist',
        }
    ]

    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header hideUser={false} showBack={false} />

            <View style={styles.text_con}>
                <CustomText isBold style={styles.h1}>
                    hello, {userData?.name}
                </CustomText>
            </View>
            <View
                style={{
                    height: windowHeight * 0.07,
                    paddingHorizontal: moderateScale(10, 0.6),
                    marginVertical: moderateScale(10, 0.6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <SearchContainer
                    width={windowWidth * 0.95}
                    height={moderateScale(50, 0.6)}
                    placeHolder={'search ..'}
                    input={true}
                />
                {/* <TouchableOpacity
                    onPress={() => navigationService.navigate('SavedTemplates')}
                    style={{
                        width: windowWidth * 0.12,
                        height: windowWidth * 0.12,
                        borderRadius: moderateScale(12, 0.6),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Color.white,
                    }}>
                    <Icon
                        name={'save-alt'}
                        as={MaterialIcons}
                        size={moderateScale(22, 0.6)}
                        color={Color.darkBlue}
                        style={{ alignSelf: 'center' }}
                    />
                </TouchableOpacity> */}
            </View>

            <CustomText style={styles.h3}>What do you need</CustomText>
            <View                     
                style={{
                    width: '100%',
                    height: windowHeight * 0.1,
                    paddingHorizontal: moderateScale(10, 0.6),
                }}>
                <FlatList
                    data={category}
                    contentContainerStyle={{
                        flexDirection: 'row',
                    }}
                    style={{
                        width: '100%',
                        height: windowHeight * 0.05,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedCategory(item?.key);
                                }}
                                style={[styles.category_con, { backgroundColor: selectedCategoty === item?.key ? Color.darkBlue : Color.white }]}>
                                <CustomText style={{ color: selectedCategoty === item?.key ? Color.white : Color.darkBlue }}>{item?.text}</CustomText>
                                <CustomText style={{ color: selectedCategoty === item?.key ? Color.white : Color.darkBlue }}>{item?.subtext}</CustomText>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                <CustomText
                    isBold
                    style={[
                        styles.txt,
                        {
                            fontSize: moderateScale(15, 0.6),
                        },
                    ]}>
                    {/* {selectedCategoty?.text} {selectedCategoty?.subtext} */}
                    {selectedCategoty === ' survey-form' ? 'Survey Forms' : selectedCategoty === 'cover-letter' ? 'Cover Letter' : selectedCategoty === 'career-blogs' ? 'Career Blogs' : selectedCategoty === 'email' ? 'emails' : ''}
                </CustomText>
                {selectedCategoty?.text === 'Saved' ? (
                    <TouchableOpacity
                        onPress={() => setDropDown(!dropDown)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <CustomText
                            style={[
                                styles.txt,
                                {
                                    marginRight: moderateScale(3, 0.6),
                                },
                            ]}>
                            Select category
                        </CustomText>
                        <Icon
                            name={dropDown ? 'up' : 'down'}
                            as={AntDesign}
                            size={moderateScale(13, 0.6)}
                            color={Color.white}
                        />
                    </TouchableOpacity>
                ) : (
                    <CustomText style={styles.txt}>See more</CustomText>
                )}
                {dropDown && (
                    <View style={styles.con}>
                        {category.map(item => {
                            return ( 
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: moderateScale(10, 0.6),
                                        paddingVertical: moderateScale(1, 0.6),
                                    }}>
                                    <CustomText
                                        onPress={() => {
                                            setshowCategory(item?.text);
                                            setDropDown(false);
                                        }}
                                        style={{
                                            fontSize: moderateScale(14, 0.6),
                                            color: Color.darkBlue,
                                            paddingHorizontal: moderateScale(5, 0.6),
                                            textTransform: 'capitalize',
                                        }}>
                                        {item?.text === 'Saved' ? '' : item?.text}
                                    </CustomText>
                                    {showCategory === item?.text && (
                                        <Icon
                                            style={{
                                                paddingTop: moderateScale(2, 0.6),
                                            }}
                                            name="check"
                                            as={AntDesign}
                                            size={moderateScale(14, 0.6)}
                                            color={Color.darkBlue}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
            <View
                style={{
                    width: '100%',
                    height: windowHeight * 0.8,
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingBottom: moderateScale(12, 0.2),
                }}>
                {
                    loading ? <ActivityIndicator size="small"
                        style={{
                            marginTop: moderateScale(20, 0.6)
                        }}
                        color={Color.darkBlue} />
                        : (
                            <FlatList
                                style={{
                                    height: '100%',
                                }}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                data={tamplates}
                                ListFooterComponent={() => {
                                    return <View style={{ height: windowHeight * 0.2 }} />;
                                }}
                                renderItem={({ item, index }) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigationService.navigate('ResumeScreen', {
                                                    detailData: item,
                                                    data: `${baseUrl}${item?.image}`,
                                                    type: selectedCategoty,
                                                    tamplateType: item?.type
                                                })
                                            }
                                            style={styles.card}>
                                            <View style={styles.card_image}>
                                                <CustomImage
                                                    onPress={() =>
                                                        navigationService.navigate('ResumeScreen', {
                                                            detailData: item,
                                                            data: `${baseUrl}${item?.image}`,
                                                            type: selectedCategoty,
                                                            tamplateType: item?.type
                                                        })
                                                    }
                                                    source={{ uri: `${baseUrl}${item?.image}` }}
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                    }}
                                                />
                                            </View>
                                            <View style={styles.content}>
                                                <View>
                                                    <CustomText style={styles.heading}>
                                                        {item?.heading}
                                                    </CustomText>
                                                    <CustomText style={styles.description}>
                                                        {item?.description}
                                                    </CustomText>
                                                </View>
                                                <View style={styles.ratingView}>
                                                    <Rating
                                                        type="custom"
                                                        startingValue={4}
                                                        ratingCount={5}
                                                        imageSize={moderateScale(12, 0.3)}
                                                        style={
                                                            {
                                                                // width: windowWidth * 0.04,
                                                            }
                                                        }
                                                        ratingBackgroundColor={'white'}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        )}
                <View style={{ height: windowHeight * 0.14 }} />
            </View>
        </ImageBackground >
    );
};

export default Tamplates;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    h1: {
        fontSize: moderateScale(25, 0.6),
        color: Color.white,
        textAlign: 'left',
        marginVertical: moderateScale(2, 0.6),
    },
    h2: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white,
        textAlign: 'left',
    },
    text_con: {
        width: '95%',
        paddingHorizontal: moderateScale(10, 0.6),
    },
    h3: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white,
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
    },
    category_con: {
        width: windowWidth * 0.22,
        backgroundColor: Color.white,
        marginHorizontal: moderateScale(3, 0.3),
        marginVertical: moderateScale(5, 0.3),
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        paddingVertical: moderateScale(15, 0.6),
    },
    item_txt: {
        fontSize: moderateScale(12, 0.6),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10, 0.6),
    },
    txt: {
        fontSize: moderateScale(13, 0.6),
        color: Color.white,
    },
    card: {
        width: windowWidth * 0.95,
        backgroundColor: Color.white,
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
    },
    content: {
        width: '75%',
    },
    heading: {
        fontSize: moderateScale(16, 0.3),
    },
    description: {
        fontSize: moderateScale(10, 0.2),
        color: Color.grey,
    },
    ratingView: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(4, 0.2),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(5, 0.4),
    },
    con: {
        backgroundColor: Color.lightGrey,
        height: windowHeight * 0.12,
        borderWidth: 1,
        borderColor: Color.lightGrey,
        width: windowWidth * 0.4,
        borderRadius: moderateScale(10, 0.6),
        zIndex: 1,
        position: 'absolute',
        right: 20,
        top: 35,
    },
    LogoText: {
        fontSize: moderateScale(35, 0.3),
        fontWeight: 'bold',
    },
});
