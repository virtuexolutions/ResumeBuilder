import { FlatList, Icon } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Color from '../Assets/Utilities/Color'
import AvatarGroup from '../Components/AvaterGroup'
import CustomText from '../Components/CustomText'
import { windowWidth } from '../Utillity/utils'

const MeetingCard = ({ item }) => {
    return (
        <View style={{
            backgroundColor: 'rgba(24, 119, 242, 0.1)',
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
                <View>
                    <CustomText isBold style={{
                        fontSize: moderateScale(18, 0.6),
                        color: Color.black
                    }}>{item?.name}</CustomText>
                    <CustomText numberOfLines={2} style={{ fontSize: moderateScale(11, 0.6), color: Color.darkGray, width: windowWidth * 0.7 }}>{item?.description}</CustomText>
                </View>
                <Icon name='dots-three-vertical' as={Entypo} size={moderateScale(15, 0.6)} color={Color.darkGray} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: moderateScale(8, 0.6)
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Icon name='date' as={Fontisto} size={moderateScale(15, 0.6)} color={Color.darkGray} />
                    <CustomText style={{ fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(6, .6), color: Color.darkGray }}>{item?.time}</CustomText>
                </View>
                <CustomText isBold style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.darkGray,
                    marginTop: moderateScale(10, 0.6),
                }}>{"On " + item?.platform}</CustomText>
            </View>

            <View style={{ width: windowWidth * 0.9, borderWidth: 0.5, borderColor: Color.veryLightGray, marginTop: moderateScale(10, 0.6) }} />


            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: moderateScale(10, 0.6),
            }}>
                <AvatarGroup avatars={item?.members} />
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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: moderateScale(12, 0.6)
            }}>
                <FlatList
                    data={item?.department}
                    numColumns={3}
                    renderItem={(({ item }) => {
                        return (
                            <View style={{
                                paddingHorizontal: moderateScale(10, 0.6),
                                paddingVertical: moderateScale(6, 0.6),
                                backgroundColor: 'rgba(24, 119, 242, 0.2)',
                                borderRadius: moderateScale(10, 0.6),
                                marginRight: moderateScale(10, 0.6),
                                marginTop: moderateScale(5, 0.6)
                            }}>
                                <CustomText style={{
                                    fontSize: moderateScale(10, 0.6),
                                    color: Color.darkGray
                                }}>{item}</CustomText>
                            </View>
                        )
                    })}

                />

            </View>
        </View>
    )
}

export default MeetingCard

const styles = StyleSheet.create({})