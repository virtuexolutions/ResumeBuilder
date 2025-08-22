import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ewallet from '../Screens/Ewallet';
import Setting from '../Screens/Setting';
import Notification from '../Screens/Notification';
import Drawer from '../Drawer/Drawer';

const DrawerNavigation = createDrawerNavigator();

const privateNavigator = () => {
    return (
        <DrawerNavigation.Navigator
            drawerContent={props => <Drawer {...props} />}
            initialRouteName="Ewallet"
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: '70%' },
            }}>
            <DrawerNavigation.Screen name="Ewallet" component={Ewallet} />
            <DrawerNavigation.Screen name="Setting" component={Setting} />
            <DrawerNavigation.Screen name="Notification" component={Notification} />
        </DrawerNavigation.Navigator>
    )
}

export default privateNavigator

const styles = StyleSheet.create({})