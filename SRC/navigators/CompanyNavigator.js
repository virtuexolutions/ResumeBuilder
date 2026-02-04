// navigation/CompanyNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../Drawer/Drawer';
import Dashboard from '../Screens/Dashboard';
import Department from '../Screens/Department';
import AddEmployees from '../Screens/AddEmployees';
import AddDepartment from '../Screens/AddDepartment';
import ProfileDetails from '../Screens/ProfileDetails';
import CompanyDetails from '../Screens/CompanyDetails';
import Tamplates from '../Screens/Tamplates';
import Ewallet from '../Screens/Ewallet';
import Details from '../Screens/Details';
import Setting from '../Screens/Setting';
import Notification from '../Screens/Notification';
import Documents from '../Screens/Documents';
import EmployeeDetails from '../Screens/EmployeeDetails';
import PricingAndFeature from '../Screens/PricingAndFeature';
import OnboardingScreen from '../Screens/OnboardingScreen';
import OnboardingTask from '../Screens/OnboardingTask';

const DrawerNavigation = createDrawerNavigator();

const CompanyNavigator = () => {
    return (
        <DrawerNavigation.Navigator
            drawerContent={props => <Drawer {...props} />}
            initialRouteName="OnboardingTask"
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: '100%' },
            }}>
            <DrawerNavigation.Screen name="Dashboard" component={Dashboard} />
            <DrawerNavigation.Screen name="Department" component={Department} />
            <DrawerNavigation.Screen name="AddDepartment" component={AddDepartment} />
            <DrawerNavigation.Screen name="Details" component={Details} />
            <DrawerNavigation.Screen name="Tamplates" component={Tamplates} />
            <DrawerNavigation.Screen name="Documents" component={Documents} />
            <DrawerNavigation.Screen name="Ewallet" component={Ewallet} />
            <DrawerNavigation.Screen name="Setting" component={Setting} />
            <DrawerNavigation.Screen name="Notification" component={Notification} />
            <DrawerNavigation.Screen name="AddEmployees" component={AddEmployees} />
            <DrawerNavigation.Screen name="PricingAndFeature" component={PricingAndFeature} />
            <DrawerNavigation.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <DrawerNavigation.Screen name="OnboardingTask" component={OnboardingTask} />
        </DrawerNavigation.Navigator>
    );
};

export default CompanyNavigator;
