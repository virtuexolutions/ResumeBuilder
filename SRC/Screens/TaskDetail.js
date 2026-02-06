import { Avatar, FlatList, Icon } from 'native-base'
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
import AvatarGroup from '../Components/AvaterGroup'
import { mode } from 'native-base/lib/typescript/theme/tools'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

const TaskDetail = ({ route }) => {
    console.log(route, 'propspropspropspropsprops')

    const data = route?.params?.data;
    console.log(data, 'dattttttttttttttttttttttaaaaaaaaaaaa')
    return (
        <ImageBackground source={require('../Assets/Images/drawer_image2.png')} style={{ flex: 1 }} resizeMethod='cover'>
            <Header title={'Onboarding Task'} color={Color.white} hideUser={false} showBack={true} backBtnStyle={Color.white} />
            <View style={styles.main_view}>
                <View style={{
                    height: windowWidth * 0.45,
                    backgroundColor: Color.white,
                    borderRadius: moderateScale(10, 0.7),
                    borderBottomColor: Color.darkBlue,
                    borderBottomWidth: 3.5,
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(10, 0.6),
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                }}>
                    <CustomText isBold style={{
                        fontSize: moderateScale(20, 0.6)
                    }}>{data?.title}</CustomText>
                    <View style={{ width: windowWidth * 0.9, borderWidth: 0.5, borderColor: Color.veryLightGray, marginTop: moderateScale(10, 0.6) }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: moderateScale(7, 0.6),
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>
                                <Icon name='checkmark-circle' as={Ionicons} size={moderateScale(15, 0.6)} color={Color.veryLightGray} />
                                <CustomText isBold style={{
                                    fontSize: moderateScale(15, 0.6),
                                    color: Color.darkGray
                                }}>status : </CustomText>
                            </View>
                            <View style={{
                                paddingVertical: moderateScale(3, 0.6),
                                paddingHorizontal: moderateScale(5, 0.6), backgroundColor: Color.black,
                                borderRadius: moderateScale(20, 0.6),
                                marginLeft: moderateScale(5, 0.6)
                            }}>
                                <CustomText style={{ fontSize: moderateScale(8, 0.6), color: Color.white }}>{data?.status}</CustomText>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: moderateScale(7, 0.6),
                        }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(15, 0.6),
                                color: Color.darkGray
                            }}>priority : </CustomText>
                            <View style={{
                                paddingHorizontal: moderateScale(10, 0.6),
                                borderTopLeftRadius: moderateScale(8, 0.6),
                                borderBottomRightRadius: moderateScale(8, 0.6),
                                backgroundColor: data?.priority === 'High' ? Color.red : data?.priority === 'Medium' ? Color.yellow : Color.green,
                                paddingVertical: moderateScale(3, 0.6),
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}>
                                <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.white }}>{data?.priority}</CustomText>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: moderateScale(7, 0.6),
                        width: windowWidth * 0.45
                    }}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(15, 0.6),
                            color: Color.darkGray
                        }}>Due Date : </CustomText>
                        <View style={{
                            paddingVertical: moderateScale(6, 0.6),
                            paddingHorizontal: moderateScale(10, 0.6),
                            backgroundColor: Color.lightGrey,
                            borderRadius: moderateScale(5, 0.6),
                        }}>
                            <CustomText style={{ fontSize: moderateScale(10, 0.5), color: Color.veryLightGray }}>{data?.dueDate}</CustomText>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: moderateScale(7, 0.6),
                        width: windowWidth * 0.45
                    }}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(15, 0.6),
                            color: Color.darkGray,
                            marginRight: moderateScale(10, 0.6)
                        }}>assignees :</CustomText>
                        <AvatarGroup avatars={data?.assignees} />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: moderateScale(10, 0.6)
                }}>
                    <Icon name='document' as={Ionicons} size={moderateScale(18, 0.6)} color={Color.veryLightGray} />
                    <CustomText isBold style={{ fontSize: moderateScale(15, 0.6), color: Color.veryLightGray, marginLeft: moderateScale(6, 0.6) }}>Description :</CustomText>
                </View>
                <View style={{
                    backgroundColor: Color.white,
                    borderRadius: moderateScale(10, 0.7),
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(10, 0.6),
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                    paddingVertical: moderateScale(15, 0.6),
                    marginTop: moderateScale(10, 0.6)
                }}>
                    <CustomText isBold style={{
                        fontSize: moderateScale(12, 0.6),
                        color: Color.black
                    }}>{data?.description}</CustomText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: moderateScale(10, 0.6)
                    }}>
                        <Icon name='attachment' as={Entypo} size={moderateScale(18, 0.6)} color={Color.veryLightGray} />
                        <CustomText isBold style={{ fontSize: moderateScale(15, 0.6), color: Color.veryLightGray, marginLeft: moderateScale(6, 0.6) }}>attachment (2) : </CustomText>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: moderateScale(10, 0.6)
                    }}>
                        <Icon name='download' as={AntDesign} size={moderateScale(15, 0.6)} color={Color.darkBlue} />
                        <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.darkBlue, marginLeft: moderateScale(6, 0.6) }}>Download All</CustomText>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: moderateScale(10, 0.6)
                }}>
                    <Icon name='document' as={Ionicons} size={moderateScale(18, 0.6)} color={Color.veryLightGray} />
                    <CustomText isBold style={{ fontSize: moderateScale(15, 0.6), color: Color.veryLightGray, marginLeft: moderateScale(6, 0.6) }}>Description :</CustomText>
                </View>
            </View>
        </ImageBackground>
    )
}

export default TaskDetail

const styles = StyleSheet.create({
    main_view: {
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
    },
})
