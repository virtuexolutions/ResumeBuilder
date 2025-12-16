import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Header from '../Components/Header'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import SubscriptionCard from '../Components/SubscriptionCard'

const PricingAndFeature = () => {
    const pricingPlans = [
        {
            id: 1,
            planName: "Starter Plan",
            price: 39,
            priceUnit: "/mo",
            pepm: 6,
            pepmUnit: "/pep/mo",
            setupFee: 149,
            currency: "$",
            included: "what's included",
            features: [
                { id: 1, name: "Company Onboarding Center", isAdded: true },
                { id: 2, name: "Unlimited document uploads", isAdded: true },
                { id: 3, name: "Interactive workflow builder", isAdded: true },
                { id: 4, name: "Email reminders to new hires", isAdded: true },
                { id: 5, name: "Basic analytics", isAdded: true },
                { id: 6, name: "Standard templates", isAdded: false },
                { id: 7, name: "Employee self-service", isAdded: false },
                { id: 8, name: "Detailed reports and analytics", isAdded: false },
            ],
        },
        {
            id: 2,
            planName: "Growth Plan",
            price: 79,
            priceUnit: "/mo",
            pepm: 10,
            pepmUnit: "/PEPM",
            setupFee: 249,
            currency: "$",
            included: "Everything in Starter",
            features: [
                { id: 1, name: "Everything in Starter", isAdded: true },
                { id: 2, name: "Multi-step workflows", isAdded: true },
                { id: 3, name: "Onboarding checklists", isAdded: true },
                { id: 4, name: "Automated e-signatures", isAdded: true },
                { id: 5, name: "Manager assignment", isAdded: true },
                { id: 6, name: "Department-specific tasks", isAdded: true },
                { id: 7, name: "SMS onboarding", isAdded: true },
                { id: 8, name: "Priority support", isAdded: false },
                { id: 9, name: "Advanced security", isAdded: false }
            ],
        },
        {
            id: 3,
            planName: "Enterprise Plan",
            price: 199,
            priceUnit: "/mo",
            pepm: 15,
            pepmUnit: "/PEPM",
            setupFee: 499,
            currency: "$",
            included: "Everything in Growth",
            features: [
                { id: 1, name: "Everything in Growth", isAdded: true },
                { id: 2, name: "Custom onboarding", isAdded: true },
                { id: 3, name: "Bulk onboarding", isAdded: true },
                { id: 4, name: "API & HRIS integrations", isAdded: true },
                { id: 5, name: "Offer letter automation", isAdded: true },
                { id: 6, name: "Multi-brand support", isAdded: true },
                { id: 8, name: "Dedicated account manager", isAdded: true },
                { id: 7, name: "24/7 priority support", isAdded: false },
            ],
        }
    ];

    return (
        <ImageBackground source={require('../Assets/Images/background_image.png')}
            style={styles.gradient}
        >
            <CustomStatusBar
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <Header showBack={false} />
            <View style={styles.main_view}>
                <CustomText isBold style={styles.heading}>Pricing & Feature</CustomText>
                <FlatList
                    data={pricingPlans}
                    horizontal
                    renderItem={({ item }) => {
                        return (
                            <SubscriptionCard data={item} />
                        )
                    }}
                />
            </View>
        </ImageBackground>
    )
}

export default PricingAndFeature

const styles = StyleSheet.create({
    gradient: {
        width: windowWidth,
        height: windowHeight,
    },
    main_view: {
        paddingHorizontal: moderateScale(10, 0.6),
        width: windowWidth,
        height: windowHeight,
    },
    heading: {
        fontSize: moderateScale(28, 0.6),
        textAlign: 'left',
        marginTop: moderateScale(10, 0.6)
    },
})