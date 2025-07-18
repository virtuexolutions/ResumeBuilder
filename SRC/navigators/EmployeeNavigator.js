// navigation/EmployeeNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../Drawer/Drawer';
import HomeScreen from '../Screens/HomeScreen';
import ProfileDetails from '../Screens/ProfileDetails';
import Ewallet from '../Screens/Ewallet';

const DrawerNavigation = createDrawerNavigator();

const EmployeeNavigator = () => {
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '70%' },
      }}>
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerNavigation.Screen name="ProfileDetails" component={ProfileDetails} />
      <DrawerNavigation.Screen name="Ewallet" component={Ewallet} />
    </DrawerNavigation.Navigator>
  );
};

export default EmployeeNavigator;
