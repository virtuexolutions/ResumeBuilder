import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { moderateScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';

const ListEmphtyComponent = ({ viewstyle, style }) => {
    return (
        <View style={{
            alignItems: "center"
        }}>
            <View
                style={{
                    marginTop: moderateScale(50, 0.6),
                    alignItems: 'center',
                    width: windowWidth * 0.35,
                    height: windowWidth * 0.35,
                    alignSelf: "center"
                }}>
                <LottieView
                    autoPlay
                    loop
                    style={[
                        {
                            height: '100%',
                            width: 200,
                            alignItems: 'center',
                            alignSelf: 'center',
                        },
                        style,
                    ]}
                    source={require('../Assets/animations/emphty_animation.json')}
                />
            </View>
            <CustomText style={{
                fontSize: moderateScale(13, 0.6),
                color: Color.themeBlue
            }}>no data found</CustomText>
        </View>

    )
}

export default ListEmphtyComponent

const styles = StyleSheet.create({})