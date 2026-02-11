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
import TimelineItem from '../Components/TimeLineCard'
import { date } from 'yup'

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
                list: [
                    { id: "st1", title: "Define color palette", isDone: true },
                    { id: "st2", title: "Typography styles", isDone: true },
                    { id: "st3", title: "Button components", isDone: true },
                    { id: "st4", title: "Input fields", isDone: true },
                    { id: "st5", title: "Cards & Modals", isDone: true },
                    { id: "st6", title: "Icons integration", isDone: true },
                    { id: "st7", title: "Dark mode support", isDone: false },
                    { id: "st8", title: "Final review", isDone: false },
                ],
            },
            progress: 75,
            dueDate: "28-9-2025",
            tags: ["Design", "Frontend", "UI/UX"],
            assignees: [
                { id: "u1", name: "User 1", avatar: require("../Assets/Images/dummyman5.png") },
                { id: "u2", name: "User 2", avatar: require("../Assets/Images/no_user_image.png") },
                { id: "u3", name: "User 3", avatar: require("../Assets/Images/dummyman5.png") },
            ],
            extraAssigneesCount: 2,
            attachmentsCount: 3,
            commentsCount: 3,
            attachment: [
                {
                    id: 1,
                    name: "Review_Report.docx",
                    type: "docx",
                },
            ],
            comments: [
                {
                    id: "c1",
                    user: "User 1",
                    message: "Color palette looks good, proceed with typography.",
                    time: "2 hours ago",
                },
                {
                    id: "c2",
                    user: "User 2",
                    message: "Buttons need hover and disabled states.",
                    time: "1 hour ago",
                },
                {
                    id: "c3",
                    user: "User 3",
                    message: "Dark mode pending, will start tomorrow.",
                    time: "30 mins ago",
                },
            ],
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
                list: [
                    { id: "st1", title: "Authentication section", isDone: true },
                    { id: "st2", title: "User APIs", isDone: true },
                    { id: "st3", title: "Task APIs", isDone: true },
                    { id: "st4", title: "Error codes", isDone: true },
                    { id: "st5", title: "Request examples", isDone: true },
                    { id: "st6", title: "Response examples", isDone: false },
                    { id: "st7", title: "Pagination docs", isDone: false },
                    { id: "st8", title: "Rate limiting", isDone: false },
                    { id: "st9", title: "Versioning info", isDone: false },
                    { id: "st10", title: "Final review", isDone: false },
                ],
            },
            progress: 50,
            dueDate: "28-9-2025",
            tags: ["Documentation", "API"],
            assignees: [
                { id: "u4", name: "User 4", avatar: require("../Assets/Images/dummyman5.png") },
                { id: "u5", name: "User 5", avatar: require("../Assets/Images/no_user_image.png") },
            ],
            extraAssigneesCount: 2,
            attachmentsCount: 1,
            attachment: [
                {
                    id: 1,
                    name: "Review_Report.pdf",
                    type: "pdf",
                },
            ],
            commentsCount: 2,
            comments: [
                {
                    id: "c1",
                    user: "User 4",
                    message: "Authentication docs completed.",
                    time: "3 hours ago",
                },
                {
                    id: "c2",
                    user: "User 5",
                    message: "Please add response examples for error cases.",
                    time: "1 hour ago",
                },
            ],
        },
    ];

    const meetingData = [
        {
            id: 1,
            name: 'Meeting with James Brown',

            date: '12 Feb 2026',
            time: '8:00 AM - 9:00 AM',
            duration: '1 Hour',

            platform: 'Zoom',
            meetingLink: 'https://zoom.us/xxxx',
            meetingId: '897 2345 1234',

            agenda: 'New Project Discussions',

            summary: 'Discussion about upcoming project scope, timelines, and responsibilities between teams.',

            objectives: [
                'Understand project requirements',
                'Finalize project timeline',
                'Assign roles and responsibilities',
            ],

            topics: [
                'Project overview',
                'Design & development flow',
                'Marketing strategy',
                'Deadlines & milestones',
            ],

            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',

            members: [
                { id: 'u1', name: 'User 1', role: 'Designer', avatar: require('../Assets/Images/dummyman5.png') },
                { id: 'u2', name: 'User 2', role: 'Developer', avatar: require('../Assets/Images/no_user_image.png') },
                { id: 'u3', name: 'User 3', role: 'Marketing Lead', avatar: require('../Assets/Images/dummyman5.png') },
            ],

            department: [
                'Designing',
                'Marketing',
            ],

            host: 'James Brown',

            status: 'Scheduled',

            priority: 'High',

            reminders: [
                '30 minutes before',
                '10 minutes before',
            ],

            attachments: [
                {
                    name: 'Project Brief.pdf',
                    type: 'pdf',
                    size: '2.4 MB',
                },
            ],

            notes: '',

            createdAt: '2026-02-10T08:00:00Z',
        }

    ]

    const checklists = [
        {
            id: 101,
            title: "Website Deployment Checklist",
            taskId: 5001,
            taskName: "Deploy Client Website",
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            assignedTo: 4,
            assignedToName: "Web Development",
            createdBy: 1,
            createdByRole: "Admin",
            dueDate: "2026-02-15",
            status: "In Progress",
            visibleToRoles: ["Admin", "HR", "Manager", "Employee"],
            editableByRoles: ["Admin", "HR", "Manager"],
            items: [
                { id: 1, text: "Design Approved", isDone: true },
                { id: 2, text: "Content Uploaded", isDone: true },
                { id: 3, text: "Testing", isDone: false },
                { id: 4, text: "Final Approval", isDone: false }
            ]
        },
        {
            id: 102,
            title: "New Employee Onboarding",
            taskId: 5002,
            taskName: "HR Onboarding Process",
            assignedTo: 4,
            assignedToName: "Human Resource Manager",
            createdBy: 2,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
            createdByRole: "HR",
            dueDate: "2026-02-10",
            status: "Pending",
            visibleToRoles: ["Admin", "HR", "Employee"],
            editableByRoles: ["Admin", "HR"],
            items: [
                { id: 1, text: "Offer Letter Signed", isDone: true },
                { id: 2, text: "Documents Collected", isDone: false },
                { id: 3, text: "System Access Given", isDone: false }
            ]
        }
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
                    data={
                        selected_category === 'Assign Tasks'
                            ? tasksData
                            : selected_category === 'Meetings'
                                ? meetingData
                                : checklists
                    }
                    renderItem={({ item }) => {
                        if (selected_category === 'Assign Tasks') {
                            return (
                                <AssignTaskCard
                                    item={item}
                                    onPress={() =>
                                        navigationService.navigate('TaskDetail', { data: item })
                                    }
                                />
                            );
                        }

                        if (selected_category === 'Meetings') {
                            return <MeetingCard item={item} onPress={() => navigationService.navigate('MeetingDetails', { data: item })} />;
                        }

                        return <TimelineItem item={item} onPress={() => navigationService.navigate('ChecklistDetail', { data: item })} />;
                    }}
                    keyExtractor={(item, index) => index.toString()}
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