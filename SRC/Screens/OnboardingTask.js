import { FlatList } from 'native-base'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import AssignTaskCard from '../Components/AssignTasksCard'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import MeetingCard from '../Components/MeetingCard'
import WeeklyDateCard from '../Components/WeeklyDateCard'
import { windowWidth } from '../Utillity/utils'
import navigationService from '../navigationService'

const OnboardingTask = () => {
    const [selected_category, setSelectedCategory] = useState('Meetings')
    console.log(selected_category, '============================>')
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
            name: 'CheckList'
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

    const meetingData = [
        {
            id: 1,
            name: 'Meeting with James Brown',
            time: '8 : 00 Am  - 9 : 00 Am',
            agenda: 'New Project Discussions ',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            members: [
                { id: "u1", name: "User 1", avatar: require('../Assets/Images/dummyman5.png') },
                { id: "u2", name: "User 2", avatar: require('../Assets/Images/no_user_image.png') },
                { id: "u3", name: "User 3", avatar: require('../Assets/Images/dummyman5.png') },
            ],
            platform: 'Zoom',
            department: [
                'Designing',
                'Marketing',
            ],
        },
        {
            id: 2,
            name: 'Meeting with Chirs Michel',
            time: '8 : 00 Am  - 9 : 00 Am',
            agenda: 'Present Plan',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            members: [
                { id: "u1", name: "User 1", avatar: require('../Assets/Images/dummyman5.png') },
                { id: "u2", name: "User 2", avatar: require('../Assets/Images/no_user_image.png') },
                { id: "u3", name: "User 3", avatar: require('../Assets/Images/dummyman5.png') },
            ],
            platform: 'Zoom',
            department: [
                'Designing',
                'Marketing',
                'Project Management'
            ],
        },
    ]

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
                                width: windowWidth * 0.29,
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
                    data={selected_category === 'Assign Tasks' ? tasksData : meetingData}
                    renderItem={(({ item }) => {
                        return (
                            <>
                                {selected_category === 'Assign Tasks' ? <AssignTaskCard item={item} onPress={() => navigationService.navigate('TaskDetail', { data: item })} /> : <MeetingCard item={item} />
                                }
                            </>
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