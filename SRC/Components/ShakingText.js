import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * ShakingText
 * -----------
 * A reusable text component that can shake horizontally + vertically when triggered.
 *
 * Usage:
 *   const textRef = useRef(null);
 *
 *   <ShakingText ref={textRef} style={{ color: 'red' }}>
 *     Wrong password
 *   </ShakingText>
 *
 *   // Trigger shake animation
 *   textRef.current?.shake();
 */
const ShakingText = forwardRef(({ children, style, ...props }, ref) => {
    // Animated value for shake effect
    const shakedValue = useRef(new Animated.Value(0)).current;

    // Expose "shake" method to parent component
    useImperativeHandle(ref, () => ({
        shake: () => {
            shakedValue.setValue(0);
            Animated.spring(shakedValue, {
                toValue: 1,
                friction: 3,
                tension: 10,
                useNativeDriver: true, // better performance
            }).start(() => shakedValue.setValue(0));
        },
    }));

    // Define animated style for shaking effect
    const animatedStyle = {
        transform: [
            {
                translateY: shakedValue.interpolate({
                    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                    outputRange: [0, 10, -15, 12, -9, 18, -7, 10, -11, 5, 0],
                }),
            },
            {
                translateX: shakedValue.interpolate({
                    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                    outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
                }),
            },
        ],
    };

    return (
        <Animated.Text {...props} style={[animatedStyle, style]}>
            {children}
        </Animated.Text>
    );
});

ShakingText.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    style: Text.propTypes?.style || PropTypes.any, // fallback if Text.propTypes deprecated
};

export default ShakingText;
