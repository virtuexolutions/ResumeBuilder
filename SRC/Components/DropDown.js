import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';

const DropDown = ({
  item,
  setData,
  array,
  data,
  labelKey = null,
  placeHolder,
  width
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const isFocused = useIsFocused();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpened(!isOpened)}
        style={[styles.mainContainer ,{width: width}]}>
        <CustomText style={styles.text}>
          {data ? (labelKey ? data?.[labelKey] : data) : placeHolder}
        </CustomText>
        <AntDesign
          style={{ paddingTop: moderateScale(3, 0.6) }}
          name={isOpened ? 'up' : 'down'}
          size={moderateScale(15, 0.6)}
          color={Color.veryLightGray}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.con,
          {
            borderWidth: isOpened ? 0.4 : 0.0,
            width: width
          },
        ]}>
        {isOpened &&
          array?.map((option, index) => {
            console.log("🚀 ~ array?.map ~ option:", option)
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setData(option);
                  setIsOpened(false);
                }}
                style={styles.map_container}>
                <CustomText
                  style={[
                    styles.map_text,
                    {
                      color:
                        labelKey && data?.id === option?.id
                          ? Color.blue
                          : Color.grey,
                    },
                  ]}>
                  {labelKey ? option?.[labelKey] : option}
                </CustomText>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.9,
    backgroundColor: Color.white,
    borderRadius: moderateScale(12, 0.6),
    borderWidth: 1.5,
    borderColor: Color.themeBlue,
    paddingHorizontal: moderateScale(15, 0.6),
    paddingTop: moderateScale(15, 0.6),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    color: Color.veryLightGray,
  },
  map_container: {
    // alignSelf: 'center',
    width: windowWidth * 0.7,
    backgroundColor: Color.white,
    borderRadius: 10,
    padding: moderateScale(5, 0.6),
    // backgroundColor :'red'
  },
  con: {
    width: windowWidth * 0.9,
    // backgroundColor :'red' ,
    borderWidth: 2,
    borderRadius: 10,
    // paddingHorizontal : moderateScale(10,.6),
    borderColor: Color.themeBlue,
    alignSelf: 'center',
    marginTop: moderateScale(5, 0.3),
  },
  map_text: {
    fontSize: moderateScale(13, 0.6),
    color: Color.mediumGray,
    paddingLeft: moderateScale(10, 0.6)
    // paddingHorizontal : moderateScale(10,.6)
    // borderBottomWidth: 0.2,
    // borderBottomColor: Color.blue,
  },
});
