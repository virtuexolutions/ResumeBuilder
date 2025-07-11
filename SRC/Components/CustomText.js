import React from 'react';
import { Text } from 'react-native';
import Color from '../Assets/Utilities/Color';
import { FONTS } from '../Constant/theme';

const CustomText = props => {
  const { children, numberOfLines, textAlign, disabled, style, isBold, onPress } = props;
  return (
    <Text
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          textTransform: 'capitalize',
          // textTransform: "capitalize",
          color: Color.black,
          textAlign: textAlign,
          fontFamily: 'KdamThmorPro-Regular'
        },
        style,
        { fontFamily: 'KdamThmorPro-Regular' },
        isBold && {
          fontFamily: 'KdamThmorPro-Regular',
          fontWeight: 'bold',
        },
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;
