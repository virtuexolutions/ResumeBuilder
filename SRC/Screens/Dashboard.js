import { useIsFocused } from '@react-navigation/core';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { AddToCart } from '../Store/slices/common';

const Dashboard = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fromSignup = route?.params?.fromSignup;
  const [numberOfEmployees, setnumberOfEmployees] = useState(0);
  const [numberOfDepartment, setnumberOfDepartment] = useState(0);
  const [numberOfDocuments, setnumberOfDocuments] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Dashboard');
  const userData = useSelector(state => state.commonReducer.userData);
  const CartData = useSelector(state => state.commonReducer.cart);
  console.log('CartData', CartData)
  const token = useSelector(state => state.authReducer.token);

  const pieData = [
    { value: numberOfEmployees, color: '#6366F1', text: numberOfEmployees },
    { value: numberOfDepartment, color: '#2DD4BF', text: numberOfDepartment },
  ];

  const setupSteps = [
    { title: 'Company Details', completed: true },
    { title: 'Departments Added', completed: true },
    { title: 'Employees Uploaded', completed: false },
    { title: 'Notifications Set', completed: true },
    { title: 'Workflows Created', completed: true },
    { title: 'Document Categories Set', completed: true },
    { title: 'Permissions & Roles', completed: true },
  ];

  const progress_data = [
    {
      title: 'Employees', value: `${numberOfEmployees} added yet`, color: '#31C3BB', iconName: 'people', as: Ionicons,
      onPress: () => navigationService.navigate('AddEmployees')
    },
    {
      title: 'Departments', value: `${numberOfDepartment} added yet`, color: '#557AFF', iconName: 'building-o', as: FontAwesome,
      onPress: () => navigationService.navigate('Department')
    },
    {
      title: 'Documents', value: `${numberOfDocuments} added yet`, color: '#C131C3', iconName: 'documents', as: Ionicons,
      onPress: () => navigationService.navigate('Documents')
    },
    {
      title: 'Categories', value: `${1} added yet`, color: '#F59E0B', iconName: 'category', as: MaterialIcons,
      onPress: () => navigationService.navigate('MyDrawer', {
        screen: 'Tamplates',
      })
    },
  ]

  const quickActions = [
    { id: 1, title: "Add Employee", icon: "user-plus", as: FontAwesome, onPress: null },
    { id: 2, title: "Add Department", icon: "building", as: FontAwesome, onPress: null },
    { id: 3, title: "Initiate Onboarding", icon: "flag", as: Entypo, onPress: () => navigationService.navigate('OnboardingTask') },
    { id: 4, title: "Upload Document", icon: "upload", as: Entypo, onPress: null }
  ];

  const onboardingStats = [
    { id: 1, label: "New Hires Onboarding Today", value: 2 },
    { id: 2, label: "Overdue Item", value: 1 },
    { id: 3, label: "Pending Tasks", value: 4 },
    { id: 4, label: "Forms Awaiting Signature", value: 6 }
  ];

  const organizationSummary = [
    { id: 1, label: "Employees", value: 125, icon: "users", as: Entypo },
    { id: 2, label: "Departments", value: 8, icon: "grid", as: Entypo },
    { id: 3, label: "Document Categories", value: null, icon: "folder", as: Entypo },
    { id: 4, label: "Company Documents", value: null, icon: "file-text", as: FontAwesome }
  ];

  useEffect(() => {
    getDetails();
  }, [isFocused]);

  const getDetails = async () => {
    const url = 'auth/company_detail';
    const response = await Get(url, token);
    if (response != undefined) {
      setnumberOfDepartment(response?.data?.company_detail?.departments.length);
      setnumberOfEmployees(response?.data?.company_detail?.employee.length);
      setnumberOfDocuments(
        response?.data?.company_detail?.save_template?.mail?.length,
      );
    }
  };

  const CompanySetup = () => {
    return (
      <View style={styles.progress_bar_view}>
        <CustomText isBold style={styles.progress_heading_text}> Company Setup Progress</CustomText>
        <View style={styles.progress_bar_subview}>
          <PieChart data={pieData}
            donut
            radius={45}
            innerRadius={35}
            centerLabelComponent={() => {
              return <Text style={{ fontSize: 30 }}>70%</Text>;
            }}
          />
          <View style={{
            width: windowWidth * 0.53,
          }}>
            <FlatList data={setupSteps} renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}
                >
                  <Icon name={item?.completed ? 'check' : 'cross'} as={Entypo} size={moderateScale(16, 0.6)} color={item?.completed ? Color.themeBlue : Color.red} />
                  <CustomText style={{ fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(10, 0.6) }}>{item.title}</CustomText>
                </TouchableOpacity>
              )
            }}
            />
          </View>
        </View>
      </View>
    )
  }

  const ProgressTrackerView = () => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(30, 0.6)
      }}>
        <FlatList
          data={progress_data}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: moderateScale(10, 0.6) }}
          renderItem={(({ item, index }) => {
            return (
              <TouchableOpacity style={[styles.progress_bar, {
                backgroundColor: item.color
              }]} onPress={item?.onPress}>
                <View>
                  <Icon name={item?.iconName} as={item?.as} size={moderateScale(30, 0.6)} color={Color.white} />
                  <CustomText isBold style={styles.progress_text}>{item?.title}</CustomText>
                  <CustomText isBold style={styles.progress_value}>{item?.value}</CustomText>
                </View>
              </TouchableOpacity>
            )
          })}
        />
      </View>
    )
  }


  const QuickActiosView = () => {
    return (
      <View style={{
        height: windowHeight * 0.2,
      }}>
        <CustomText isBold style={styles.quick_actions_text}>Quick Actions : </CustomText>
        <FlatList
          data={quickActions}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(({ item }) => {
            return (
              <TouchableOpacity style={styles.quick_actions_view} onPress={item?.onPress}>
                <Icon name={item?.icon} as={item?.as} size={moderateScale(20, 0.6)} color={Color.veryLightGray} />
                <CustomText isBold style={styles.actione_text}>{item?.title}</CustomText>
              </TouchableOpacity>
            )
          })}
        />
      </View>
    )
  }

  const OnboardingStatsView = () => {
    return (
      <View style={styles.onboarding_view}>
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={onboardingStats}
          columnWrapperStyle={{ justifyContent: 'space-between', }}
          renderItem={(({ item }) => {
            return (
              <View style={{ height: moderateScale(30, 0.6), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <CustomText isBold style={{ fontSize: moderateScale(13, 0.6) }}>{item?.value + " : "}</CustomText>
                <CustomText style={{ fontSize: moderateScale(13, 0.6) }}>{item?.label}</CustomText>
              </View>
            )
          })}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={Color.themeBgColor}
        style={{
          width: windowWidth,
          height: windowHeight * 0.2,
        }}
      >
        <Header hideUser={false} showBack={false} menu_color />
        <CustomText isBold style={styles.heading_text}>{'Hello, ' + userData?.name}</CustomText>
        <CustomText style={styles.company_type_text}>{userData?.company_detail?.business_type}</CustomText>
        <View style={styles.tab_view}>
          <TouchableOpacity
            onPress={() => setStatus('Dashboard')}
            style={[
              styles.tab_sub_view,
              {
                backgroundColor: status === 'Dashboard' ? Color.darkBlue : Color.white,
                width: status === 'Dashboard' ? windowWidth * 0.5 : windowWidth * 0.45,
              },
            ]}>
            <Icon
              name="document-text"
              as={Ionicons}
              size={moderateScale(20, 0.6)}
              color={status === 'Dashboard' ? Color.white : Color.themeBlue}
            />
            <CustomText style={[styles.subtextStyle, { color: status === 'Dashboard' ? Color.white : Color.themeBlue }]}>Dashboard</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus('Status')}
            style={[
              styles.tab_sub_view,
              {
                backgroundColor: status === 'Status' ? Color.darkBlue : Color.white,
                width: status === 'Status' ? windowWidth * 0.5 : windowWidth * 0.45,
              },
            ]}>
            <Icon
              name="circular-graph"
              as={Entypo}
              size={moderateScale(20, 0.6)}
              color={status === 'Status' ? Color.white : Color.themeBlue}
            />
            <CustomText style={[styles.subtextStyle, { color: status === 'Status' ? Color.white : Color.themeBlue }]}>Status</CustomText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.main_view}>
        {status === "Dashboard" ?
          <View style={{ flex: 1 }}>
            <CompanySetup />
            <ProgressTrackerView />
          </View> :
          <>
            <CompanySetup />
            <QuickActiosView />
            <CustomText isBold style={[styles.quick_actions_text, {
              marginTop: moderateScale(0, 0.6)
            }]}>Onboarding At a Glance</CustomText>
            <OnboardingStatsView />
            <FlatList
              data={organizationSummary}
              scrollEnabled={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={(({ item }) => {
                return (
                  <TouchableOpacity style={[styles.quick_actions_view,]}>
                    <Icon name={item?.icon} as={item?.as} size={moderateScale(22, 0.6)} color={Color.veryLightGray} style={{ marginTop: moderateScale(10, 0.6), }} />
                    {item?.value &&
                      <CustomText isBold style={styles.actione_tittle}>{item?.value}</CustomText>
                    }
                    <CustomText style={[styles.actione_text, {
                      fontSize: moderateScale(10, 0.6),
                    }]}>{item?.label}</CustomText>
                  </TouchableOpacity>
                )
              })}
            />
          </>
        }
      </View>
    </View >
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  main_view: {
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    height: windowHeight,
    top: 10
  },
  welcomeText: {
    fontSize: moderateScale(40, 0.3),
    color: Color.darkbrown,
  },
  subtextStyle: {
    fontSize: moderateScale(16, 0.3),
    color: Color.themeBlue,
    marginLeft: moderateScale(10, 0.6)
  },
  header_view: {
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(12, 0.3),
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: moderateScale(10, 0.6)
  },
  heading_text: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    marginLeft: moderateScale(15, 0.6)
  },
  progress_bar_view: {
    width: windowWidth * 0.9,
    // height: windowHeight * 0.2,
    paddingVertical: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(15, 0.6),
    top: 10,
    borderRadius: moderateScale(15, 0.6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderBottomColor: Color.darkBlue,
    borderBottomWidth: 5
  },
  progress_heading_text: {
    fontSize: moderateScale(14, 0.6),
    color: Color.black
  },
  progress_bar_subview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.6),
  },
  tab_view: {
    width: windowWidth * 0.94,
    height: windowWidth * 0.15,
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    top: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: windowWidth * 0.2,
  },
  tab_sub_view: {
    width: windowWidth * 0.45,
    height: '100%',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(60, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
  },
  btn_view: {
    width: windowWidth * 0.42,
    height: windowWidth * 0.36,
    backgroundColor: '#C4C4C4',
    borderRadius: moderateScale(15, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
  },
  text: {
    fontSize: moderateScale(15, 0.6),
    color: Color.white,
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  graph_text: {
    fontSize: moderateScale(15, 0.6)
  },
  company_type_text: {
    fontSize: moderateScale(14, 0.6),
    marginLeft: moderateScale(15, 0.6),
    color: Color.lightGrey
  },
  progress_text: {
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
    marginTop: moderateScale(10, 0.6)
  },
  progress_value: {
    fontSize: moderateScale(12, 0.6),
    color: Color.lightGrey,
  },
  progress_bar: {
    width: windowWidth * 0.43,
    height: windowHeight * 0.15,
    borderRadius: moderateScale(10, 0.6),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15, 0.6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  quick_actions_view: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    backgroundColor: Color.lightGrey,
    marginRight: moderateScale(4, 0.6),
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.8),
    borderTopWidth: 3,
    borderTopColor: Color.darkBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quick_actions_text: {
    fontSize: moderateScale(15, 0.7),
    marginTop: moderateScale(20, 0.6),
    color: Color.black
  },
  actione_text: {
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    // marginTop: moderateScale(5, 0.6),
    color: Color.darkGray
  },
  onboarding_view: {
    height: windowHeight * 0.09,
    backgroundColor: Color.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    marginTop: moderateScale(10, 0.6),
    borderTopColor: Color.darkBlue,
    borderTopWidth: 3
  },
  actione_tittle: {
    fontSize: moderateScale(15, 0.6),
  }
});
