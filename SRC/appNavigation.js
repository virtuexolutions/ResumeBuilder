import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
import navigationService from './navigationService';
import AddDepartment from './Screens/AddDepartment';
import AddEmployeeDetails from './Screens/AddEmployeeDetails';
import AddEmployees from './Screens/AddEmployees';
import ChangePassword from './Screens/ChangePassword';
import ChecklistForm from './Screens/ChecklistForm';
import ChecklistScreen from './Screens/ChecklistScreen';
import CheckOutScreen from './Screens/CheckOutScreen';
import CompanyDetails from './Screens/CompanyDetails';
import CustomerSurveyForm from './Screens/CustomerSurveyForm';
import Dashboard from './Screens/Dashboard';
import Department from './Screens/Department';
import EditBlogPost from './Screens/EditBlogPost';
import EditCoverLetter from './Screens/EditCoverLetter';
import EditEmailTamplate2 from './Screens/EditEmailTamplate2';
import EditResume from './Screens/EditResume';
import EditSurveyForm from './Screens/EditSurveyForm';
import EmailTamplate2 from './Screens/EmailTamplate2';
import FeedBackForm from './Screens/FeedBackForm';
import FinalBlogPost from './Screens/FinalBlogPost';
import FinalCoverLetter from './Screens/FinalCoverLetter';
import FinalEmail from './Screens/FinalEmail';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import ProgressFeedback from './Screens/ProgressFeedback';
import ResetPassword from './Screens/ResetPassword';
import ResumeFinalScreen from './Screens/ResumeFinalScreen';
import ResumeScreen from './Screens/ResumeScreen';
import SavedTemplates from './Screens/SavedTemplates';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';
import StartScreen from './Screens/StartScreen';
import SurvaryForm from './Screens/SurvaryForm';
import VerifyEmail from './Screens/VerifyEmail';
import VerifyNumber from './Screens/VerifyNumber';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import Categories from './Screens/Categories';
import Documents from './Screens/Documents';
import CompanyNavigator from './navigators/CompanyNavigator';
import EmployeeNavigator from './navigators/EmployeeNavigator';
import LoggedInScreen from './Screens/LoggedInScreen';
import SubCategory from './Screens/SubCategory';
import EditProfile from './Screens/EditProfile';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import Help from './Screens/Help';
import TermsAndConditions from './Screens/TermsAndConditions';
import EmployeeDetails from './Screens/EmployeeDetails';
import DepartmentDetails from './Screens/DepartmentDetails';
import privateNavigator from './navigators/privateNavigator';
import PaymentScreen from './Screens/PaymentScreen';
import AddToFavourite from './Screens/AddToFavourite';
import ConfirmPaymentScreen from './Screens/ConfirmPaymentScreen';


enableScreens();

const AppNavigator = () => {
  const token = useSelector(state => state.authReducer.token);
  console.log(token, '=============================')
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const user_type = useSelector(state => state.authReducer.role)
  console.log(user_type, '--------------------->')
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(userData, '=============================')

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough === false
        ? 'WalkthroughScreen'
        : !token
          ? 'StartScreen'
          : user_type === 'Company' && (!userData?.company_detail || Object.keys(userData?.company_detail || {}).length < 1)
            ? 'CompanyDetails'
            : 'MyDrawer';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{ headerShown: false }}>
          <RootNav.Screen name="MyDrawer" component={user_type === 'Company' ? CompanyNavigator : user_type === "Private" ? privateNavigator : EmployeeNavigator} />
          <RootNav.Screen
            name="WalkthroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="SplashScreen" component={SplashScreen} />
          <RootNav.Screen name="StartScreen" component={StartScreen} />
          <RootNav.Screen name="SavedTemplates" component={SavedTemplates} />
          <RootNav.Screen name="Dashboard" component={Dashboard} />
          <RootNav.Screen name="SignupScreen" component={SignupScreen} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Home" component={Home} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen name="FinalBlogPost" component={FinalBlogPost} />
          <RootNav.Screen name="ChecklistForm" component={ChecklistForm} />
          <RootNav.Screen name="SurveyForm" component={SurvaryForm} />
          <RootNav.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          <RootNav.Screen name="EditEmailTamplate2" component={EditEmailTamplate2} />

          <RootNav.Screen name="EditBlogPost" component={EditBlogPost} />
          <RootNav.Screen name="FinalEmail" component={FinalEmail} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResumeScreen" component={ResumeScreen} />
          <RootNav.Screen name="EditResume" component={EditResume} />
          <RootNav.Screen name="EditCoverLetter" component={EditCoverLetter} />
          <RootNav.Screen name="EditSurveyForm" component={EditSurveyForm} />
          <RootNav.Screen name="EmailTamplate2" component={EmailTamplate2} />
          <RootNav.Screen name="AddEmployees" component={AddEmployees} />
          <RootNav.Screen name="Department" component={Department} />
          <RootNav.Screen name="Documents" component={Documents} />
          <RootNav.Screen name="CompanyDetails" component={CompanyDetails} />
          <RootNav.Screen name="AddEmployeeDetails" component={AddEmployeeDetails} />
          <RootNav.Screen name="Categories" component={Categories} />
          <RootNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <RootNav.Screen name="Help" component={Help} />
          <RootNav.Screen name="TermsAndConditions" component={TermsAndConditions} />
          <RootNav.Screen
            name="CustomerSurveyForm"
            component={CustomerSurveyForm}
          />
          <RootNav.Screen name="feedbackForm" component={FeedBackForm} />
          <RootNav.Screen
            name="ProgressFeedback"
            component={ProgressFeedback}
          />
          <RootNav.Screen name="ChecklistScreen" component={ChecklistScreen} />
          <RootNav.Screen name="AddDepartment" component={AddDepartment} />
          <RootNav.Screen name="CheckOutScreen" component={CheckOutScreen} />
          <RootNav.Screen name="SubCategory" component={SubCategory} />
          <RootNav.Screen name="EditProfile" component={EditProfile} />
          <RootNav.Screen name="LoggedInScreen" component={LoggedInScreen} />
          <RootNav.Screen name="EmployeeDetails" component={EmployeeDetails} />
          <RootNav.Screen name="DepartmentDetails" component={DepartmentDetails} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />
          <RootNav.Screen name="AddToFavourite" component={AddToFavourite} />
          <RootNav.Screen name="ConfirmPaymentScreen" component={ConfirmPaymentScreen} />
          <RootNav.Screen
            name="FinalCoverLetter"
            component={FinalCoverLetter}
          />

          <RootNav.Screen
            name="ResumeFinalScreen"
            component={ResumeFinalScreen}
          />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};
export default AppNavigator;
