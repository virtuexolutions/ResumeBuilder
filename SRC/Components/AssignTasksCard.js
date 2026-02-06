import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const AssignTaskCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
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
        </TouchableOpacity>
    )
}

export default AssignTaskCard

const styles = StyleSheet.create({})