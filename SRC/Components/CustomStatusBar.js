import React from "react";
import { View, StatusBar, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from "../Assets/Utilities/Color";
import { windowWidth } from "../Utillity/utils";

export default function CustomStatusBar(props) {
  const { backgroundColor, barStyle } = props;

  const isGradient = Array.isArray(backgroundColor);

  return (
    <>
      {isGradient ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={backgroundColor ? backgroundColor : [Color.themeBgColor]}
          style={{
            width: windowWidth,
          }}
        >
          <SafeAreaView edges={["top"]} />
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={barStyle ? barStyle : "dark-content"}
          />
        </LinearGradient>
      ) : (
        <View
          style={{
            width: windowWidth,
            backgroundColor: backgroundColor
              ? backgroundColor
              : Color.themePurpleLevel4,
          }}
        >
          <SafeAreaView edges={["top"]} />
          <StatusBar
            translucent
            showHideTransition="slide"
            animated
            backgroundColor={
              Platform.OS === "android"
                ? backgroundColor
                  ? backgroundColor
                  : Color.gray
                : "transparent"
            }
            barStyle={barStyle ? barStyle : "dark-content"}
          />
        </View>
      )}
    </>
  );
}
