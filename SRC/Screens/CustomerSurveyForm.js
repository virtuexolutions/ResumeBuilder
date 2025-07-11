import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { Icon } from 'native-base'
import MaterialCommunityIcons
    from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomButton'
import { useSelector } from 'react-redux'
import { Post } from '../Axios/AxiosInterceptorFunction'
import navigationService from '../navigationService'


const CustomerSurveyForm = props => {
    const data = props?.route?.params?.data;
    console.log("🚀CustomerSurveyForm ~ data:", data)
    const [answers, setAnswers] = useState({});
    const handleSelect = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };
    const token = useSelector(state => state.authReducer.token);

    const [loading, setLoading] = useState(false)

    const surveyQuestions = [
        'How satisfied were you with the overall experience?',
        'Did you find our product/service easy to use?',
        'Would you recommend our product/service to others?',
        'Was our customer service helpful and responsive?',
        'Do you have any suggestions for improvement?',
        'How likely are you to use our product/service again in the future?'
    ];

    const options = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'];

    const renderQuestion = ({ item, index }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        }}>
            <View style={{ width: '40%' }}>
                <CustomText style={{ color: Color.black, fontSize: 12 }}>{item}</CustomText>
            </View>
            <View style={{
                width: '60%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                {data?.options.map((option, oIndex) => (
                    <TouchableOpacity
                        key={oIndex}
                        onPress={() => handleSelect(index, option)}
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: Color.black,
                            marginHorizontal: moderateScale(10, 0.6),
                            backgroundColor: answers[index] === option ? Color.blue : 'transparent',
                        }}
                    />
                ))}
            </View>
        </View>
    );


    const onPressSave = async () => {
        const url = 'auth/survey'
        const body = {
            question: data?.skills,
            options: data?.options,
            type: data?.templeteType,
            tamplate_title: data?.tamplate_title,
            tamplate_image: data?.tamplate_image,
            tamplate_description: data?.description
        }
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        console.log("🚀 ~ onPressSave ~ response:", response?.data)
        setLoading(false)
        if (response?.data != undefined) {
            navigationService.navigate("Home")
        }
    }

    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header title={''} hideUser={true} showBack={true} />
            <View style={styles.main_view}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        width: windowWidth * 0.96,
                        height: windowHeight * 0.8,
                        backgroundColor: Color.white,
                        alignItems: "center",
                        paddingVertical: moderateScale(25, 0.6),
                        paddingHorizontal: moderateScale(15, 0.6)
                    }}>
                        <CustomText isBold style={styles.title}>CUSTOMER SURVEY</CustomText>
                        <CustomText style={styles.subtitle}>HELP US IMPROVE</CustomText>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <CustomText isBold style={styles.label}>Your Name:</CustomText>
                                <View style={styles.underlineInput} />
                            </View>
                            <View style={styles.inputContainer}>
                                <CustomText isBold style={styles.label}>Date:</CustomText>
                                <View style={styles.underlineInput} />
                            </View>
                        </View>
                        <View style={{
                            width: '100%',
                            alignSelf: 'center',
                            marginTop: 20,
                            paddingVertical: 10
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ width: '40%' }} />
                                <View style={{
                                    width: '60%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}>
                                    {data?.options.map((option, index) => (
                                        <CustomText key={index} style={{ color: Color.black, fontSize: 10, marginHorizontal: moderateScale(15, 0.6) }}>
                                            {option}
                                        </CustomText>
                                    ))}
                                </View>
                            </View>

                            <FlatList
                                data={data?.skills || data?.question}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderQuestion}
                                scrollEnabled={false}
                                contentContainerStyle={{ padding: 10 }}
                            />
                        </View>

                        <CustomText isBold style={styles.feedbackLabel}>How else can we improve?</CustomText>
                        <View style={[styles.textarea, {
                            bottom: 100
                        }]} />
                        <View style={styles.textarea} />

                        <CustomText isBold style={styles.footerText}>Thank you for your feedback</CustomText>
                    </View>
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
                        marginTop={moderateScale(20, 0.6)}
                    />
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default CustomerSurveyForm

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        height: windowHeight,
        justifyContent: 'center',
        // alignItems: 'left',
        // paddingHorizontal: moderateScale(10, 0.6),
    },
    main_view: {
        width: windowWidth,
        height: windowHeight * 0.9,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(15, 0.6),
    },
    text_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        padding: moderateScale(20),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(18, 0.9),
        fontWeight: 'bold',
        marginBottom: moderateScale(5, 0.6),
    },
    subtitle: {
        fontSize: moderateScale(14, 0.6),
        marginBottom: moderateScale(10),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: moderateScale(10),
    },
    inputContainer: {
        width: '48%',
    },
    label: {
        fontSize: moderateScale(12, 0.6),
        // marginBottom: moderateScale(5),
    },
    underlineInput: {
        borderBottomWidth: 1,
        borderColor: '#000',
        height: moderateScale(15, 0.6),
    },
    feedbackLabel: {
        fontSize: moderateScale(14),
        marginBottom: moderateScale(10),
        alignSelf: 'flex-start',
        position: 'absolute',
        bottom: 150,
        left: 50
    },
    textarea: {
        width: '100%',
        height: moderateScale(1, 0.6),
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: moderateScale(20),
        marginTop: moderateScale(10, 0.6),
        position: 'absolute',
        bottom: 60
    },
    footerText: {
        fontSize: moderateScale(14),
        marginTop: moderateScale(20),
        position: 'absolute',
        bottom: 30
    },
})