import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { windowWidth } from "../Utillity/utils";
import CustomText from "./CustomText";
import { moderateScale } from "react-native-size-matters";
import Color from "../Assets/Utilities/Color";
import { Icon } from "native-base";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const TimelineItem = ({ item, isLast }) => {
    return (
        <View style={styles.row}>
            <View style={styles.timeline}>
                <LinearGradient
                    colors={['#1877F2', '#00C6FF', '#2AF598']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.dot}
                ></LinearGradient>
                {!isLast && <LinearGradient
                    colors={['#1877F2', '#00C6FF', '#2AF598']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.line}
                ></LinearGradient>}
            </View>
            <LinearGradient
                colors={['#1877F2', '#00C6FF', '#2AF598']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.inner_view}>
                    <View style={styles.header}>
                        <CustomText isBold style={styles.title}>{item.title}</CustomText>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-betweeen',
                            alignItems: "center",
                            backgroundColor: Color.lightGrey,
                            borderRadius: moderateScale(2, 0.6),
                            width: windowWidth * 0.22,
                            padding: moderateScale(2, 0.6)
                        }}>
                            <Icon as={EvilIcons} name="calendar" size={moderateScale(16, 0.6)} color={Color.veryLightGray} />
                            <CustomText style={styles.time}>{item.dueDate}</CustomText>
                        </View>
                    </View>
                    <CustomText isBold style={styles.task_name}>{item.taskName}</CustomText>
                    <CustomText style={styles.desc}>{item.description}</CustomText>
                    <View style={[styles.header, {
                        marginTop: moderateScale(6, 0.6)
                    }]}>
                        <View style={styles.header}>
                            <Icon name="team" as={AntDesign} size={moderateScale(14, 0.6)} color={Color.darkBlue} />
                            <CustomText style={[styles.desc, { marginLeft: moderateScale(2, 0.6) }]}>{item?.assignedToName}</CustomText>
                        </View>
                        <CustomText style={{
                            padding: moderateScale(4, 0.6),
                            backgroundColor: Color.darkBlue,
                            fontSize: moderateScale(10, 0.6),
                            borderRadius: moderateScale(5, 0.6),
                            color: Color.white
                        }}>{item?.status}</CustomText>
                    </View>
                    <View style={[styles.header, {
                        justifyContent: 'flex-start'
                    }]}>
                        <Icon as={MaterialIcons} name="create" size={moderateScale(15, 0.6)} color={Color.darkBlue} />
                        <CustomText style={styles.time}>{"Created By " + item.createdByRole}</CustomText>
                    </View>
                </View>
            </LinearGradient>
        </View >
    );
};

export default TimelineItem;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: windowWidth * 0.37,
        marginVertical: moderateScale(10, 0.6)
    },
    timeline: {
        alignItems: "center",
        width: moderateScale(25, 0.6),
    },
    dot: {
        width: moderateScale(14, 0.7),
        height: moderateScale(14, 0.6),
        borderRadius: 7,
    },
    line: {
        width: 3,
        backgroundColor: "#C8E6C9",
        marginTop: 5,
        height: windowWidth * 0.3
    },
    inner_view: {
        height: windowWidth * 0.34,
        backgroundColor: Color.white,
        width: '100%',
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6)
    },
    card: {
        flex: 1,
        backgroundColor: "#E8F5E9",
        borderRadius: 14,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        height: windowWidth * 0.36
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: moderateScale(14, 0.6),
        color: Color.black,
    },
    time: {
        fontSize: moderateScale(10, 0.6),
        color: Color.veryLightGray,
        marginLeft: moderateScale(5, 0.5)
    },
    desc: {
        fontSize: moderateScale(11, 0.6),
        color: Color.veryLightGray,
    },
    task_name: {
        fontSize: moderateScale(12, 0.6),
        color: Color.themeBlue
    }
});
