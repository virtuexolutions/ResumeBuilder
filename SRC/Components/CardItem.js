import React from 'react'
import { View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { windowWidth } from '../Utillity/utils'
import { Icon } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const CommentItem = ({ item }) => {
    return (
        <View style={styles.container}>

            <CustomImage
                source={require('../Assets/Images/no_user_image.png')}
                style={styles.avatar}
            />

            <View style={styles.content}>

                <CustomText isBold style={styles.username}>
                    {item?.user}
                </CustomText>

                <CustomText style={styles.message}>
                    {item?.message}
                </CustomText>

                <View style={styles.footer}>
                    <Icon name={'reply'} as={Entypo} size={moderateScale(18, 0.7)} color={Color.veryLightGray} />
                    <CustomText style={styles.reply}>Reply</CustomText>
                </View>
            </View>

            <View style={styles.likeContainer}>
                <Icon name={'like'} as={EvilIcons} size={moderateScale(18, 0.7)} color={Color.veryLightGray} />
                <CustomText style={styles.likes}>{item?.likes}</CustomText>
            </View>

        </View>
    );
};


export default CommentItem

const styles = {
    container: {
        flexDirection: 'row',
        width: windowWidth * 0.92,
        alignSelf: 'center',
        marginTop: moderateScale(12, 0.6),
    },

    avatar: {
        width: moderateScale(36, 0.6),
        height: moderateScale(36, 0.6),
        borderRadius: 50,
    },

    content: {
        flex: 1,
        marginLeft: moderateScale(10, 0.6),
    },

    username: {
        fontSize: moderateScale(12, 0.6),
        color: Color.black,
    },

    message: {
        fontSize: moderateScale(12, 0.6),
        color: Color.darkGray,
        marginTop: moderateScale(4, 0.6),
    },

    footer: {
        flexDirection: 'row',
        marginTop: moderateScale(6, 0.6),
        alignItems: 'center',
    },

    time: {
        fontSize: moderateScale(10, 0.6),
        color: Color.veryLightGray,
        marginRight: moderateScale(14, 0.6),
    },

    reply: {
        fontSize: moderateScale(10, 0.6),
        color: Color.veryLightGray,
        marginLeft: moderateScale(2, 0.6)
    },

    likeContainer: {
        alignItems: 'center',
        marginLeft: moderateScale(8, 0.6),
    },

    heart: {
        fontSize: moderateScale(16, 0.6),
        color: Color.darkGray,
    },

    likes: {
        fontSize: moderateScale(10, 0.6),
        color: Color.veryLightGray,
        marginTop: 2,
    },
};
