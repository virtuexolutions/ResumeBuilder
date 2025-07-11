import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import CustomImage from '../Components/CustomImage'
import Color from '../Assets/Utilities/Color'

const EmailTamplate2 = props => {
    const data = props?.route?.params?.data;
    console.log("🚀 ~ data:", data)

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
                        backgroundColor: '#fbf6f0',
                        alignItems: "flex-start",
                        paddingVertical: moderateScale(25, 0.6),
                        paddingHorizontal: moderateScale(15, 0.6)
                    }}>
                        <View style={{
                            marginBottom: moderateScale(20, 0.6),
                            alignItems: "center",
                            width: '100%'
                        }}>
                            <CustomText>Company Name</CustomText>
                        </View>

                        <View style={styles.text_view}>
                            <CustomText isBold style={styles.subject_text}>Subject :</CustomText>
                            <View style={
                                {
                                    width: windowWidth * 0.8,
                                    // marginTop:moderateScale(10,0.6)
                                }
                            }>
                                <CustomText numberOfLines={2} style={styles.subject_text}>{`Welcome to${' '} ${data?.companyName} - Your Journey Start Here!`}</CustomText>
                            </View>
                        </View>
                        <CustomText isBold style={styles.subject_text}>{"Dear Olivia"}</CustomText>
                        <CustomText numberOfLines={2} style={styles.paragraph}>{`Welcome to ${''} ${data?.companyName}! We're thrilled to have you join us as our new ${data?.positonName} starting on ${data?.startDate}`}.</CustomText>
                        <CustomText style={styles.paragraph}>To help you get started, we've created a personalized pre-onboarding portal for you.
                            Please take a moment to complete the following tasks before your first day:</CustomText>
                        <View style={styles.list}>
                            <CustomText style={styles.listItem}>1. Review and sign your offer letter.</CustomText>
                            <CustomText style={styles.listItem}>2. Upload the necessary documents (e.g., ID, tax forms).</CustomText>
                            <CustomText style={styles.listItem}>3. Explore resources about our company, culture, and benefits.</CustomText>
                        </View>
                        <CustomText style={styles.paragraph}>
                            Access your portal here: <CustomText style={styles.link}>{data?.companyAddress}</CustomText>
                        </CustomText>

                        <CustomText style={styles.paragraph}>
                            {`If you have any questions, don't hesitate to reach out to ${data?.managerName} at ${data?.managerEmail}.`}
                        </CustomText>

                        <CustomText style={styles.paragraph}>
                            We're excited to welcome you to the team!
                        </CustomText>

                        <CustomText style={styles.closing}>Best regards,</CustomText>

                        <CustomText style={styles.signature}>{`${data?.managerName}`}</CustomText>
                        <CustomText style={styles.signature}>{`${data?.managerEmail}`}</CustomText>
                        <View style={{
                            width: windowWidth * 0.3,
                            height: windowWidth * 0.3,
                            backgroundColor: Color.lightGrey,
                            position: "absolute",
                            right: 20,
                            bottom: 40
                        }}>
                            <CustomImage style={{
                                width: '100%',
                                height: "100%"
                            }} source={{ uri: data?.image }} />
                        </View>
                    </View>
                </ScrollView>
            </View></ImageBackground>
    )
}

export default EmailTamplate2

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
    subject_text: {
        fontSize: moderateScale(11, 0.6),
        marginTop: moderateScale(10, 0.6),
    },
    bold: {
        fontWeight: 'bold',
    },
    paragraph: {
        fontSize: moderateScale(11, 0.6),
        color: '#444',
        marginBottom: moderateScale(12, 0.6),
        lineHeight: 18,
    },
    list: {
        marginLeft: moderateScale(12, 0.6),
        marginBottom: moderateScale(20, 0.6),
    },
    listItem: {
        fontSize: moderateScale(11, 0.6),
        color: '#444',
        // marginBottom: moderateScale(10, 0.6),
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    closing: {
        marginTop: moderateScale(20, 0.6),
        fontSize: moderateScale(11, 0.6),
        color: '#444',
    },
    signature: {
        fontSize: moderateScale(11, 0.6),
        color: '#444',
    },
})