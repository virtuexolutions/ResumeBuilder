import React from 'react';
import { Platform, StatusBar, SafeAreaView, StyleSheet, View } from 'react-native';

const CustomSafeAreaView = ({ children, style }) => {
    if (Platform.OS === 'android') {
        return (
            <View style={[styles.container, { paddingTop: StatusBar.currentHeight }, style]}>
                {children}
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});

export default CustomSafeAreaView;
