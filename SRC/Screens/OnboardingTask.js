import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import moment from 'moment'
import WeeklyDateCard from '../Components/WeeklyDateCard'
import { FlatList, Icon } from 'native-base'
import CustomText from '../Components/CustomText'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AvatarGroup from '../Components/AvaterGroup'

const OnboardingTask = () => {
    const [selected_category, setSelectedCategory] = useState('Meetings')
    const category = [
        {
            id: 1,
            name: "Meetings",
        },
        {
            id: 2,
            name: 'Assign Tasks'
        },
        {
            id: 3,
            name: 'Upcommings'
        }
    ]

    const tasksData = [
        {
            id: "1",
            status: "IN_PROGRESS",
            priority: "High",
            title: "Design System Implementation",
            description:
                "Create and implement a comprehensive design system for the product to unify colors, typography, and reusable components.",
            subtasks: {
                completed: 6,
                total: 8,
            },
            progress: 75,
            dueDate: "28-9-2025",
            tags: ["Design", "Frontend", "UI/UX"],
            assignees: [
                { id: "u1", name: "User 1", avatar: require('../Assets/Images/dummyman5.png') },
                { id: "u2", name: "User 2", avatar: require('../Assets/Images/no_user_image.png') },
                { id: "u3", name: "User 3", avatar: require('../Assets/Images/dummyman5.png') },
            ],
            extraAssigneesCount: 2,
            attachmentsCount: 3,
            commentsCount: 8,
        },
        {
            id: "2",
            status: "IN_PROGRESS",
            priority: "Medium",
            title: "API Documentation",
            description:
                "Write detailed documentation for REST API endpoints, covering authentication, request/response formats, and error handling.",
            subtasks: {
                completed: 5,
                total: 10,
            },
            progress: 50,
            dueDate: "28-9-2025",
            tags: ["Documentation", "API"],
            assignees: [
                { id: "u4", name: "User 4", avatar: require('../Assets/Images/dummyman5.png') },
                { id: "u5", name: "User 5", avatar: require('../Assets/Images/no_user_image.png') },
            ],
            extraAssigneesCount: 2,
            attachmentsCount: 8,
            commentsCount: 15,
        },
    ];

    return (
        <ImageBackground source={require('../Assets/Images/drawer_image2.png')} style={{ flex: 1 }} resizeMethod='cover'>
            <Header title={'Onboarding Task'} color={Color.white} hideUser={false} showBack={true} backBtnStyle={Color.white} />
            <View style={styles.main_view}>
                <WeeklyDateCard />
                <FlatList
                    data={category}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingBottom: moderateScale(10, 0.6) }}
                    renderItem={(({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedCategory(item?.name)} style={{
                                width: windowWidth * 0.3,
                                backgroundColor: selected_category === item?.name ? Color.darkBlue : Color.lightGrey,
                                paddingVertical: moderateVerticalScale(10, 0.6),
                                marginRight: moderateScale(10, 0.6),
                                marginTop: moderateScale(10, 0.6),
                                borderRadius: moderateScale(10, 0.6),
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>
                                <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: selected_category === item?.name ? Color.white : Color.darkGray }}>{item?.name}</CustomText>
                            </TouchableOpacity>
                        )
                    })}
                />
                <FlatList
                    data={tasksData}
                    renderItem={(({ item }) => {
                        return (
                            <View style={{
                                height: windowWidth * 0.5,
                                backgroundColor: 'rgba(24, 119, 242, 0.2)',
                                flex: 1,
                                borderRadius: moderateScale(10, 0.6),
                                marginBottom: moderateScale(10, 0.6),
                                padding: moderateScale(10, 0.6)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        paddingHorizontal: moderateScale(10, 0.6),
                                        borderTopLeftRadius: moderateScale(8, 0.6),
                                        borderBottomRightRadius: moderateScale(8, 0.6),
                                        backgroundColor: item?.priority === 'High' ? Color.red : item?.priority === 'Medium' ? Color.yellow : Color.green,
                                        paddingVertical: moderateScale(6, 0.6),
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,

                                    }}>
                                        <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.white }}>{item?.priority}</CustomText>
                                    </View>
                                    <Icon name='dots-three-vertical' as={Entypo} size={moderateScale(15, 0.6)} color={Color.darkGray} />
                                </View>
                                <CustomText isBold style={{ fontSize: moderateScale(14, 0.6), marginTop: moderateScale(10, 0.6) }}>{item?.title}</CustomText>
                                <CustomText numberOfLines={2} style={{ fontSize: moderateScale(11, 0.6), color: Color.darkGray }}>{item?.description}</CustomText>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: moderateScale(6, 0.6)
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Icon name='date' as={Fontisto} size={moderateScale(15, 0.6)} color={Color.darkGray} />
                                        <CustomText style={{ fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(6, .6), color: Color.darkGray }}>{'Due : ' + item?.dueDate}</CustomText>
                                    </View>
                                    <View style={{
                                        paddingVertical: moderateScale(6, 0.6),
                                        paddingHorizontal: moderateScale(10, 0.6), backgroundColor: Color.black,
                                        borderRadius: moderateScale(20, 0.6)
                                    }}>
                                        <CustomText style={{ fontSize: moderateScale(10, 0.6), color: Color.white }}>{item?.status}</CustomText>
                                    </View>
                                </View>

                                <View style={{ width: windowWidth * 0.9, borderWidth: 0.5, borderColor: Color.veryLightGray, marginTop: moderateScale(10, 0.6) }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: moderateScale(10, 0.6),
                                }}>
                                    <AvatarGroup avatars={item?.assignees} />
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Icon name='attachment' as={Entypo} size={moderateScale(15, 0.6)} color={Color.darkGray} />
                                            <CustomText style={{ fontSize: moderateScale(14, 0.6), color: Color.darkGray, marginHorizontal: moderateScale(5, 0.6) }}>{item?.attachmentsCount}</CustomText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name='comment-o' as={FontAwesome} size={moderateScale(15, 0.6)} color={Color.darkGray} />
                                            <CustomText style={{ fontSize: moderateScale(14, 0.6), color: Color.darkGray, marginLeft: moderateScale(5, 0.6) }}>{item?.commentsCount}</CustomText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                />
            </View>
        </ImageBackground>
    )
}

export default OnboardingTask

const styles = StyleSheet.create({
    main_view: {
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6)
    },
    date_management_view: {
        height: windowWidth * 0.35,
        backgroundColor: Color.white,
        borderRadius: moderateScale(10, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})