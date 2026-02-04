import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo'

const WeeklyDateCard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [weekStart, setWeekStart] = useState(dayjs().startOf('week').add(1, 'day'));

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) =>
      weekStart.add(index, 'day')
    );
  }, [weekStart]);

  const changeWeek = (direction) => {
    setWeekStart(prev =>
      direction === 'next'
        ? prev.add(7, 'day')
        : prev.subtract(7, 'day')
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingVertical: moderateScale(20, 0.6),
        borderRadius: moderateScale(14, 0.6),
        paddingHorizontal: moderateScale(10, 0.5),
        elevation: 7,
        borderBottomColor: Color.darkBlue,
        borderBottomWidth: 5
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: moderateScale(10, 0.7),
        }}
      >
        <CustomText isBold style={{ fontSize: moderateScale(18, 0.6) }}>
          {selectedDate.format('DD MMMM')}
        </CustomText>

        <View style={{ flexDirection: 'row', width: windowWidth * 0.18, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => changeWeek('prev')} style={{
            height: moderateScale(30, 0.6),
            width: moderateScale(30, 0.6),
            backgroundColor: Color.darkBlue,
            borderRadius: windowWidth / 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon name='chevron-left' as={Entypo} size={moderateScale(15, 0.6)} color={Color.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeWeek('next')} style={{
            height: moderateScale(30, 0.6),
            width: moderateScale(30, 0.6),
            backgroundColor: Color.darkBlue,
            borderRadius: windowWidth / 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon name='chevron-right' as={Entypo} size={moderateScale(15, 0.6)} color={Color.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {weekDates.map(date => {
          const isSelected = date.isSame(selectedDate, 'day');

          return (
            <TouchableOpacity
              key={date.format('YYYY-MM-DD')}
              onPress={() => setSelectedDate(date)}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: '#777' }}>
                {date.format('ddd')}
              </CustomText>

              <View
                style={{
                  marginTop: moderateScale(6, 0.6),
                  width: moderateScale(36, 0.6),
                  height: moderateScale(36, 0.6),
                  borderRadius: moderateScale(18, 0.6),
                  backgroundColor: isSelected ? Color.themeBlue : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CustomText isBold
                  style={{
                    color: isSelected ? '#fff' : '#000',
                  }}
                >
                  {date.format('DD')}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default WeeklyDateCard;
