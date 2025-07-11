import { ActivityIndicator, Alert, FlatList, ImageBackground, Platform, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Header from '../Components/Header'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import { moderateScale } from 'react-native-size-matters'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import CustomButton from '../Components/CustomButton'
import navigationService from '../navigationService'
import { useSelector } from 'react-redux'

const EditResume = props => {
    const token = useSelector(state => state.authReducer.token);
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ userData:", userData)

    console.log("🚀 ~ EditResume ~ token:", token)
    const detailData = props?.route?.params?.data;
    console.log("🚀 ~ EditResume data:", detailData)
    const [personalDataTab, setPersonalDataTab] = useState(true)
    const [summary, setSummary] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [year, setYear] = useState(new Date())
    const [details, setDetails] = useState("")
    const [skillVisible, setSkillVisible] = useState(true)
    const [skills, setSkill] = useState([])
    console.log("🚀 ~ EditResume ~ skills:", skills)
    const [skillsVal, setSkillVal] = useState([])
    const [phone, setphone] = useState('')
    const [education, seteducation] = useState(true)
    const [experience, setexperience] = useState(true)
    const [Certificate, setCertificate] = useState(true)
    const [degreeName, setDegreeName] = useState('')
    const [degreePlaceName, setdegreePlaceName] = useState('')
    const [degreeYear, setdegreeYear] = useState('')
    const [CertificateName, setCertificateName] = useState('')
    const [CertificatePlaceName, setCertificatPlaceName] = useState('')
    const [CertificatYear, setCertificatYear] = useState('')
    const [positonName, setpositonName] = useState('')
    const [experiencePlaceName, setexperiencePlaceName] = useState('')
    const [DateofJoining, setDateofJoining] = useState('')
    const [DateofEnding, setDateofEnding] = useState('')
    const [summaryDetails, setsummaryDetails] = useState("")
    const [loading, setLoading] = useState(false)

    const onPressConfirm = async () => {
        const data = {
            name: name,
            email: email,
            date: date,
            month: month,
            summary: summary,
            address: address,
            details: details,
            skills: skills,
            phone: phone,
            education: education,
            degreeName: degreeName,
            degreePlaceName: degreePlaceName,
            degreeYear: degreeYear,
            CertificateName: CertificateName,
            CertificatePlaceName: CertificatePlaceName,
            CertificatYear: CertificatYear,
            positonName: positonName,
            experiencePlaceName: experiencePlaceName,
            DateofJoining: DateofJoining,
            DateofEnding: DateofEnding,
            summaryDetails: summaryDetails,
            type: detailData?.type,
            tamplate_title: detailData?.heading,
            tamplate_image: null,
            tamplate_description: detailData?.description,
        }
        navigationService.navigate('ResumeFinalScreen', { data: data, fromHome: false })
        // console.log("🚀 ~ onPressConfirm ~ data:", data)
        // const url = `auth/resumes`
        // setLoading(true)
        // const response = await Post(url, data, apiHeader(token))
        // setLoading(false)
        // console.log("🚀 ~ onPressConfirm ~ response:", response?.data)
        // if (response?.data != undefined) {
        //     setLoading(false)
        //     navigationService.navigate('ResumeFinalScreen', { data: data })
        //     Platform.OS == 'android'
        //         ? ToastAndroid.show('Saved', ToastAndroid.SHORT)
        //         : Alert.alert('Saved');
        // }
    }

    return (
        <ImageBackground
            style={styles.bg_container}
            source={require('../Assets/Images/bg.png')}>
            <Header title={'Edit '} hideUser={true} showBack={true} />
            <View style={styles.main_view}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.btn_view, {
                        height: personalDataTab === true ? windowHeight * 0.11 : windowHeight * 0.7,
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Personal Data</CustomText>
                                <CustomText style={styles.btn_sub_txt}>Complete your personal Data make your Tamplates even better</CustomText>
                            </View>
                            <Icon name='down' onPress={() => setPersonalDataTab(!personalDataTab)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {personalDataTab === false &&
                            <>
                                <CustomText isBold style={styles.text}>Namess :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your full name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setName}
                                    value={name}
                                />
                                <CustomText isBold style={styles.text}>Email :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your email '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setEmail}
                                    value={email}
                                />
                                <CustomText isBold style={styles.text}>Address :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your Address '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setAddress}
                                    value={address}
                                />
                                <CustomText isBold style={styles.text}>Date of Birth :</CustomText>
                                <View style={styles.row_view}>
                                    <View>
                                        <CustomText isBold style={styles.sub_text}>Date</CustomText>
                                        <TextInputWithTitle
                                            iconSize={moderateScale(20, 0.3)}
                                            color={Color.blue}
                                            placeholder={'00'}
                                            placeholderColor={Color.grey}
                                            viewWidth={0.25}
                                            marginTop={moderateScale(10, 0.3)}
                                            style={styles.text_input}
                                            backgroundColor={Color.lightGrey}
                                            setText={setDate}
                                            value={date}
                                        />
                                    </View>
                                    <View>
                                        <CustomText isBold style={styles.sub_text}>Month</CustomText>
                                        <TextInputWithTitle
                                            iconSize={moderateScale(20, 0.3)}
                                            color={Color.blue}
                                            placeholder={'01'}
                                            placeholderColor={Color.grey}
                                            viewWidth={0.25}
                                            marginTop={moderateScale(10, 0.3)}
                                            style={styles.text_input}
                                            backgroundColor={Color.lightGrey}
                                            setText={setMonth}
                                            value={month}
                                        />
                                    </View>
                                    <View>
                                        <CustomText isBold style={styles.sub_text}>Year</CustomText>
                                        <TextInputWithTitle
                                            iconSize={moderateScale(20, 0.3)}
                                            color={Color.blue}
                                            placeholder={'1999'}
                                            placeholderColor={Color.grey}
                                            viewWidth={0.25}
                                            marginTop={moderateScale(10, 0.3)}
                                            style={styles.text_input}
                                            backgroundColor={Color.lightGrey}
                                            setText={setYear}
                                            value={year}
                                        />
                                    </View>
                                </View>
                                <CustomText isBold style={styles.text}>Phone Number :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your Phone Number'}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setphone}
                                    value={phone}
                                />
                            </>
                        }
                    </View>
                    <View style={[styles.btn_view, {
                        height: summary === true ? windowHeight * 0.11 : windowHeight * 0.36,
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Summary</CustomText>
                                <CustomText style={[styles.btn_sub_txt, {
                                    color: Color.veryLightGray,
                                    width: windowWidth * 0.8
                                }]}>Enter a brief description of your professional background of your choosen specific skill.</CustomText>
                            </View>
                            <Icon name='down' onPress={() => setSummary(!summary)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {summary === false &&
                            <>
                                <CustomText isBold style={styles.text}>Summary :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Details'}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    viewHeight={0.2}
                                    inputHeight={windowHeight * 0.195}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setDetails}
                                    value={details}
                                    multiline
                                />
                            </>
                        }
                    </View>
                    <View style={[styles.btn_view, {
                        height: skillVisible === true ? windowHeight * 0.11 : skills.length > 1 ? windowWidth * 0.78 : windowHeight * 0.3,
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Skills</CustomText>
                                <CustomText style={[styles.btn_sub_txt, {
                                    color: Color.veryLightGray,
                                    width: windowWidth * 0.8
                                }]}>Enter a skill with is match from  professional background.</CustomText>
                            </View>
                            <Icon name='down' onPress={() => setSkillVisible(!skillVisible)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {skillVisible === false &&
                            <>
                                <FlatList numColumns={3} data={skills} renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            backgroundColor: Color.lightGrey,
                                            width: windowWidth * 0.26,
                                            marginRight: moderateScale(10, 0.6),
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            height: moderateScale(30, 0.6),
                                            borderRadius: moderateScale(30, 0.6),
                                            marginTop: moderateScale(6, 0.6),
                                            flexDirection: 'row',
                                            paddingHorizontal: moderateScale(8, 0.6)
                                        }}>
                                            <CustomText style={{
                                                color: Color.blue,
                                                fontSize: moderateScale(10, 0.6)
                                            }}>{item}</CustomText>
                                            <Icon name='cross' as={Entypo} color={Color.red} size={moderateScale(18, 0.6)} />
                                        </View>
                                    )
                                }} />
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'skills'}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setSkillVal}
                                    value={skillsVal}
                                />
                                <CustomButton
                                    text={'Add'}
                                    textColor={Color.white}
                                    onPress={() => {
                                        console.log("first", skills);
                                        setSkill([...skills, skillsVal])
                                    }} width={windowWidth * 0.4}
                                    height={windowHeight * 0.060}
                                    borderRadius={moderateScale(20, 0.3)}
                                    bgColor={Color.darkBlue}
                                    marginTop={moderateScale(10, 0.6)}
                                />
                            </>
                        }
                    </View>
                    <View style={[styles.btn_view, {
                        height: education === true ? windowHeight * 0.11 : windowHeight * 0.5,
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Education</CustomText>
                                <CustomText style={[styles.btn_sub_txt, {
                                    color: Color.veryLightGray,
                                    width: windowWidth * 0.8
                                }]}>Enter description of your degress</CustomText>
                            </View>
                            <Icon name='down' onPress={() => seteducation(!education)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {education === false &&
                            <>
                                <CustomText isBold style={styles.text}>Degree Name :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your degree name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setDegreeName}
                                    value={degreeName}
                                />
                                <CustomText isBold style={styles.text}>Place Name</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Place name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setdegreePlaceName}
                                    value={degreePlaceName}
                                />
                                <CustomText isBold style={styles.text}>Year</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Year '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setdegreeYear}
                                    value={degreeYear}
                                />
                                <CustomButton
                                    text={'Add Education'}
                                    textColor={Color.white}
                                    onPress={() => {
                                        console.log("first", skills);
                                        setSkill([...skills, skillsVal])
                                    }} width={windowWidth * 0.7}
                                    height={windowHeight * 0.060}
                                    borderRadius={moderateScale(20, 0.3)}
                                    bgColor={Color.darkBlue}
                                    marginTop={moderateScale(20, 0.6)}
                                />
                            </>
                        }
                    </View>
                    <View style={[styles.btn_view, {
                        height: experience === true ? windowHeight * 0.11 : windowHeight * 0.75,
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Experience</CustomText>
                                <CustomText style={[styles.btn_sub_txt, {
                                    color: Color.veryLightGray,
                                    width: windowWidth * 0.8
                                }]}>Enter description of your Experience</CustomText>
                            </View>
                            <Icon name='down' onPress={() => setexperience(!experience)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {experience === false &&
                            <>
                                <CustomText isBold style={styles.text}>Positon Name</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your Positon name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setpositonName}
                                    value={positonName}
                                />
                                <CustomText isBold style={styles.text}>Place Name</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Place name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setexperiencePlaceName}
                                    value={experiencePlaceName}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <CustomText isBold style={styles.text}>Date of Joining</CustomText>
                                        <TextInputWithTitle
                                            iconSize={moderateScale(20, 0.3)}
                                            color={Color.blue}
                                            placeholder={'Enter Joining '}
                                            placeholderColor={Color.grey}
                                            viewWidth={0.42}
                                            marginTop={moderateScale(10, 0.3)}
                                            style={styles.text_input}
                                            backgroundColor={Color.lightGrey}
                                            setText={setDateofJoining}
                                            value={DateofJoining}
                                        />
                                    </View>
                                    <View style={{ marginLeft: moderateScale(10, 0.6) }}>
                                        <CustomText isBold style={styles.text}>Date of Ending</CustomText>
                                        <TextInputWithTitle
                                            iconSize={moderateScale(20, 0.3)}
                                            color={Color.blue}
                                            placeholder={'Enter ending '}
                                            placeholderColor={Color.grey}
                                            viewWidth={0.42}
                                            marginTop={moderateScale(10, 0.3)}
                                            style={styles.text_input}
                                            backgroundColor={Color.lightGrey}
                                            setText={setDateofEnding}
                                            value={DateofEnding}
                                        />
                                    </View>
                                </View>
                                <CustomText isBold style={styles.text}>Summary :</CustomText>
                                {/* <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Details'}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    viewHeight={0.2}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setsummaryDetails}
                                    value={summaryDetails}
                                    multiline
                                /> */}
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Details'}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    viewHeight={0.2}
                                    inputHeight={windowHeight * 0.195}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setsummaryDetails}
                                    value={summaryDetails}
                                    multiline
                                />
                                <CustomButton
                                    text={'Add Experience'}
                                    textColor={Color.white}
                                    onPress={() => {
                                        console.log("first", skills);
                                        setSkill([...skills, skillsVal])
                                    }} width={windowWidth * 0.7}
                                    height={windowHeight * 0.060}
                                    borderRadius={moderateScale(20, 0.3)}
                                    bgColor={Color.darkBlue}
                                    marginTop={moderateScale(20, 0.6)}
                                />
                            </>
                        }
                    </View>
                    <View style={[styles.btn_view, {
                        height: Certificate === true ? windowHeight * 0.11 : windowHeight * 0.45,
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <View>
                                <CustomText isBold style={styles.btn_txt}>Certification</CustomText>
                                <CustomText style={[styles.btn_sub_txt, {
                                    color: Color.veryLightGray,
                                    width: windowWidth * 0.8
                                }]}>Enter description of your Certification</CustomText>
                            </View>
                            <Icon name='down' onPress={() => setCertificate(!Certificate)} as={AntDesign} color={Color.black} size={moderateScale(18, 0.6)} />
                        </View>
                        {Certificate === false &&
                            <>
                                <CustomText isBold style={styles.text}>Certificate Name :</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter your degree name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setCertificateName}
                                    value={CertificateName}
                                />
                                <CustomText isBold style={styles.text}>Certificate Place Name</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Place name '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setCertificatPlaceName}
                                    value={CertificatePlaceName}
                                />
                                <CustomText isBold style={styles.text}>Year</CustomText>
                                <TextInputWithTitle
                                    iconSize={moderateScale(20, 0.3)}
                                    color={Color.blue}
                                    placeholder={'Enter Year '}
                                    placeholderColor={Color.grey}
                                    viewWidth={0.84}
                                    marginTop={moderateScale(10, 0.3)}
                                    style={styles.text_input}
                                    backgroundColor={Color.lightGrey}
                                    setText={setCertificatYear}
                                    value={CertificatYear}
                                />
                            </>
                        }
                    </View>
                    <CustomButton
                        text={loading ?
                            <ActivityIndicator
                                size="small"
                                style={styles.indicatorStyle}
                                color={Color.darkBlue}
                            />
                            : 'confirm'}
                        textColor={Color.darkBlue}
                        onPress={() => {
                            console.log("first", skills);
                            onPressConfirm()
                        }} width={windowWidth * 0.8}
                        height={windowHeight * 0.060}
                        borderRadius={moderateScale(20, 0.3)}
                        bgColor={Color.white}
                        marginTop={moderateScale(20, 0.6)}
                    />
                </ScrollView>
            </View>
        </ImageBackground >
    )
}

export default EditResume

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        alignItems: 'center',
        height: windowHeight, justifyContent: 'center'
        // alignItems: 'left',
        // paddingHorizontal: moderateScale(10, 0.6),
    },
    main_view: {
        width: windowWidth,
        height: windowHeight * 0.9,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(15, 0.6)
    },
    btn_view: {

        width: windowWidth * 0.93,
        backgroundColor: Color.white,
        paddingVertical: moderateScale(12, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        borderRadius: moderateScale(10, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    btn_txt: {
        fontSize: moderateScale(18, 0.6)
    },
    btn_sub_txt: {
        fontSize: moderateScale(12, 0.6),
        width: windowWidth * 0.8
    },
    text_input: {
        borderWidth: 1,
    },
    text: {
        fontSize: moderateScale(14, 0.6),
        marginTop: moderateScale(10, 0.6),
        color: Color.blue
    },
    row_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    sub_text: {
        fontSize: moderateScale(11, 0.6),
        marginTop: moderateScale(9, 0.6),
        marginLeft: moderateScale(5, 0.6)
    }
})