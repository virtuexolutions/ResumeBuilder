import React from 'react';
import { View, Image, Text } from 'react-native';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';

const AvatarGroup = ({
    avatars = [],
    maxVisible = 3,
    size = 25,
}) => {
    const visibleAvatars = avatars.slice(0, maxVisible);
    const extraCount = avatars.length - maxVisible;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {visibleAvatars.map((item, index) => (
                <View
                    key={item.id}
                    style={{
                        marginLeft: index === 0 ? 0 : -size / 3,
                        borderWidth: moderateScale(2, 0.6),
                        borderColor: '#fff',
                        borderRadius: windowWidth / 2,
                    }}
                >
                    <CustomImage
                        source={item.avatar}
                        style={{
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                        }}
                    />
                </View>
            ))}

            {extraCount > 0 && (
                <View
                    style={{
                        marginLeft: -size / 3,
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: '#6C5CE7',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: moderateScale(2, 0.6),
                        borderColor: '#fff',
                    }}
                >
                    <CustomText style={{ color: '#fff', fontSize: moderateScale(12, 0.6), fontWeight: '600' }}>
                        +{extraCount}
                    </CustomText>
                </View>
            )}
        </View>
    );
};

export default AvatarGroup;
