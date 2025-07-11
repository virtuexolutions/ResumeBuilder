import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import { ZStack } from 'native-base'
import { Rating } from 'react-native-ratings'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import CustomButton from '../Components/CustomButton'
import navigationService from '../navigationService'

const SurvaryForm = props => {
    const data = props?.route?.params?.data;
    console.log("🚀 ~ data:", data)
    const [answers, setAnswers] = useState({});
    console.log("🚀 ~ SurvaryForm ~ answers:", answers)
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false)

    const questions = [
        {
            id: 1,
            type: 'rating',
            text: 'How would you rate your overall onboarding experience?',
        },
        {
            id: 2,
            type: 'yesno',
            text: 'Were you provided with the resources and information needed to feel prepared for your role?',
        },
        {
            id: 3,
            type: 'rating',
            text: 'How would you rate the communication and support from your onboarding coordinator or HR team?',
        },
        {
            id: 4,
            type: 'yesno',
            text: 'Did you find the pre-onboarding process (e.g., offer letter, document submission) straightforward?',
        },
        {
            id: 5,
            type: 'yesno',
            text: 'Were all tasks assigned during your onboarding clear and manageable?',
        },
        {
            id: 6,
            type: 'rating',
            text: 'How would you rate your introduction to the company culture and values?',
        },
        {
            id: 7,
            type: 'yesno',
            text: 'Do you feel confident in your understanding of your job responsibilities?',
        },
        {
            id: 8,
            type: 'yesno',
            text: 'How effective was the training you received during your first 30 days?',
        },
        {
            id: 9,
            type: 'yesno',
            text: 'Were there tools, equipment, or resources you needed that were not provided?',
        },
        {
            id: 10,
            type: 'yesno',
            text: 'Did your 30-60-90 day plan help you transition into your role effectively?',
        },
        {
            id: 11,
            type: 'yesno',
            text: 'What did you enjoy most about the onboarding process?',
        },
        {
            id: 12,
            type: 'yesno',
            text: 'What suggestions do you have to improve our onboarding process?',
        },
    ];


    const onPressSave = async () => {
        const url = 'auth/survey'
        const body = {
            question: data?.skills,
            options: data?.skills,
            type: data?.templeteType,
            tamplate_title: data?.tamplate_title,
            tamplate_image: data?.tamplate_image,
            tamplate_description: data?.tamplate_description,
            company_name: data?.companyName,
            company_logo: null,
            website_url: null,
        }
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        console.log("🚀 ~ onPressSave ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            navigationService.navigate("Home")
        }
    }

    const handleAnswer = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };


    const renderQuestion = ({ item }) => (
        <View style={styles.rowContainer}>
            <View style={styles.leftColumn}>
                <CustomText style={styles.questionText}>{item}</CustomText>
            </View>
            <View style={styles.rightColumn}>
                {item.type === 'yesno' ? (
                    <View style={styles.yesNoContainer}>
                        {['Yes', 'No'].map(option => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => handleAnswer(item.id, option)}
                                style={[
                                    styles.optionButton,
                                    answers[item.id] === option && styles.selectedOption,
                                ]}
                            >
                                <CustomText style={styles.optionText}>{option}</CustomText>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Rating
                        type="custom"
                        ratingCount={5}
                        startingValue={answers[item.id] || 0}
                        imageSize={20}
                        onFinishRating={(value) => handleAnswer(item.id, value)}
                        style={{ alignSelf: 'flex-start' }}
                        ratingBackgroundColor="#e0e0e0"
                    />
                )}
            </View>
        </View>
    );

    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header title="Survey Form" hideUser={true} showBack={true} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={require('../Assets/Images/form_background.png')}
                    imageStyle={{ width: '107%', height: '107%', resizeMode: 'stretch' }}
                    style={styles.main_view}
                >
                    <CustomText style={styles.heading_text}>Your Name</CustomText>
                    {/* <TextInputWithTitle
                    color={Color.blue}
                    placeholder={'Your Name'}
                    placeholderColor={Color.grey}
                    viewWidth={0.5}
                    borderBottomWidth={1}
                    borderColor={Color.blue}
                    marginTop={moderateScale(30, 0.3)}
                    style={{
                        alignSelf: 'center',
                    }}
                /> */}
                    <CustomText isBold style={styles.heading}>FEEDBACK</CustomText>
                    <View style={styles.row_view}>
                        <View style={styles.line} />
                        <CustomText isBold style={styles.head_text}>Survey Template</CustomText>
                        <View style={styles.line} />
                    </View>
                    <CustomText style={styles.text}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                    </CustomText>
                    <FlatList
                        data={data?.skills}
                        // keyExtractor={item => item.()} 
                        renderItem={renderQuestion}
                        showsVerticalScrollIndicator={false}
                    />
                </ImageBackground>
                <CustomButton
                    text={loading ? <ActivityIndicator
                        style={styles.indicatorStyle}
                        size="small"
                        color={Color.blue}
                    /> : 'Save'}
                    textColor={Color.darkBlue}
                    onPress={() => {
                        onPressSave()
                    }}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.065}
                    borderRadius={moderateScale(20, 0.3)}
                    bgColor={Color.white}
                    marginTop={moderateScale(60, 0.6)}
                    marginBottom={moderateScale(20, 0.6)}
                />
            </ScrollView>
        </ImageBackground>
    )
}

export default SurvaryForm

const styles = StyleSheet.create({
    bg_container: {
        flex: 1,
    },
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
        width: windowWidth * 0.96,
        height: windowHeight * 0.82,
        alignSelf: 'center',
    },
    heading_text: {
        fontSize: moderateScale(14),
        color: Color.black,
        marginBottom: moderateScale(5),
        textAlign: "center",
        marginTop: moderateScale(20, 0.6)
    },
    heading: {
        fontSize: moderateScale(20),
        marginBottom: moderateScale(10),
        textAlign: "center"
    },
    row_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#aaa',
        marginHorizontal: moderateScale(5),
    },
    head_text: {
        fontSize: moderateScale(14),
        color: '#333',
    },
    text: {
        fontSize: moderateScale(12),
        marginVertical: moderateScale(10),
        color: Color.grey,
        textAlign: 'center'
    },
    questionContainer: {
        marginTop: moderateScale(10),
        paddingVertical: moderateScale(8),
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    questionText: {
        fontSize: moderateScale(13),
        color: '#333',
        marginBottom: moderateScale(5),
    },
    yesNoContainer: {
        flexDirection: 'row',
        gap: moderateScale(10),
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(12),
        borderRadius: 5,
        marginRight: moderateScale(10),
    },
    selectedOption: {
        backgroundColor: '#a0d1ff',
        borderColor: '#3399ff',
    },
    optionText: {
        fontSize: moderateScale(12),
        color: '#333',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateScale(8),
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: moderateScale(8),
    },

    leftColumn: {
        // flex: 2,
        width: windowWidth * 0.56,
        paddingRight: moderateScale(10),
    },

    rightColumn: {
        width: windowWidth * 0.3,
        alignItems: 'flex-end',
    },

    questionText: {
        fontSize: moderateScale(12),
        color: '#333',
    },

    yesNoContainer: {
        flexDirection: 'row',
        gap: moderateScale(2),
        marginRight: moderateScale(10, 0.6)
    },

    optionButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(10),
        borderRadius: 5,
        marginHorizontal: moderateScale(2),
    },

    selectedOption: {
        backgroundColor: '#a0d1ff',
        borderColor: '#3399ff',
    },

    optionText: {
        fontSize: moderateScale(12),
        color: '#333',
    },

})