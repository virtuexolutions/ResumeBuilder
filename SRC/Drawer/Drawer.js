import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { setUserLogoutAuth } from '../Store/slices/auth';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { baseUrl } from '../Config';

const Drawer = React.memo((props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const user_type = useSelector(state => state.authReducer.role)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ userData:", user_type, userData)
  console.log(`${baseUrl}/${userData?.employee_detail?.photo}`, '==========================')
  const adminData = [
    {
      id: 1,
      name: 'Dashboard',
      onPress: () => {
        navigation.navigate('Dashboard');
      },
      iconName: 'table-cells-large',
      iconType: FontAwesome6
    },
    {
      id: 2,
      name: 'Company Details',
      onPress: () => {
        navigation.navigate('Details');
      },
      iconName: 'building',
      iconType: FontAwesome6
    },
    {
      id: 2,
      name: 'Tamplates',
      onPress: () => {
        navigation.navigate('Tamplates');
      },
      iconName: 'filetext1',
      iconType: AntDesign
    },
    {
      id: 3,
      name: 'Department',
      onPress: () => {
        navigation.navigate('Department');
      },
      iconName: 'graph-horizontal',
      iconType: Foundation
    },
    {
      id: 4,
      name: 'Document',
      onPress: () => {
        navigation.navigate('Documents');
      },
      iconName: 'document',
      iconType: Ionicons
    },
    {
      id: 6,
      name: 'E-Wallet',
      onPress: () => {
        navigation.navigate('Ewallet');
      },
      iconName: 'wallet',
      iconType: AntDesign
    },

    {
      id: 7,
      name: 'Notifications ',
      onPress: () => {
        navigation.navigate('Notification');
      },
      iconName: 'notifications',
      iconType: MaterialIcons
    },
    {
      id: 8,
      name: 'Settings',
      onPress: () => {
        navigation.navigate('Setting');
      },
      iconName: 'settings',
      iconType: MaterialIcons
    },
  ];

  const employeeDrawerData = [
    {
      id: 1,
      name: 'Home',
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
      iconName: 'home',
      iconType: Entypo
    },
    {
      id: 2,
      name: 'Profile Details',
      onPress: () => {
        // setIsModalVisible(true);
        navigation.navigate('ProfileDetails');
      },
      iconName: 'person',
      iconType: MaterialIcons
    },
    // {
    //   id: 3,
    //   name: 'Documents',
    //   onPress: () => {
    //     navigation.navigate('Documents');
    //   },
    //   iconName: 'filetext1',
    //   iconType: AntDesign
    // },
    {
      id: 4,
      name: 'Notifications ',
      onPress: () => {
        navigation.navigate('Notification');
      },
      iconName: 'notifications',
      iconType: MaterialIcons
    },
    {
      id: 5,
      name: 'Settings',
      onPress: () => {
        navigation.navigate('Setting');
      },
      iconName: 'settings',
      iconType: MaterialIcons
    },
    {
      id: 6,
      name: 'E-Wallet',
      onPress: () => {
        navigation.navigate('Ewallet');
      },
      iconName: 'folder',
      iconType: Foundation
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeBlue}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.Profile}>
        <View style={{
          width: windowWidth * 0.3,
          height: windowWidth * 0.3,
          backgroundColor: 'red',
          borderRadius: windowWidth,
          marginTop: moderateScale(16, 0.6)
        }}>
          <CustomImage
            source={
              user_type === 'Company'
                ? userData?.company_detail?.company_logo != null
                  ? { uri: `${baseUrl}${userData.company_detail.company_logo}` }
                  : require('../Assets/Images/no_image.jpg')
                : userData?.employee_detail?.photo != null
                  ? { uri: `${baseUrl}/${userData.employee_detail.photo}` }
                  : require('../Assets/Images/no_image.jpg')
            }
            style={styles.image}
          />
        </View>
        <CustomText isBold style={styles.heading_text}>{userData?.name || userData?.employee_detail?.full_name}</CustomText>
        <CustomText style={styles.heading_text}>{userData?.email || userData?.employee_detail?.employee_email}</CustomText>
      </View>

      <View
        style={{
          height: '60%',
          marginTop: moderateScale(30, 0.6)
        }}>
        {(user_type === 'Company' ? adminData : employeeDrawerData).map((item, index) => (
          <>
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={{
                width: windowWidth * 0.7,
                borderColor: Color.black,
                margin: moderateScale(16, 0.3),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon name={item?.iconName} as={item?.iconType} size={moderateScale(20, 0.6)} color={Color.themeBlue} />
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.grey,
                  marginLeft: moderateScale(10, 0.6)
                }}>
                {item.name}
              </CustomText>
            </TouchableOpacity>
          </>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => dispatch(setUserLogoutAuth())
        }
        style={{
          width: windowWidth * 0.7,
          borderColor: Color.black,
          margin: moderateScale(16, 0.3),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Icon name={"logout"}
          as={MaterialCommunityIcons}
          size={moderateScale(20, 0.6)}
          color={Color.themeBlue}
        />
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
            color: Color.grey,
            marginLeft: moderateScale(10, 0.6)
          }}>
          {'Logout'}
        </CustomText>
      </TouchableOpacity>
    </ScreenBoiler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: '100%',
    height: windowWidth * 0.6,
    // borderRadius: (windowWidth * 0.2) / 1,
    backgroundColor: Color.themeBlue,
    justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: moderateScale(10, 0.6)
  },
  menu_text: {
    color: Color.darkGray,
  },
  profile_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    height: '20%',
    paddingVertical: moderateScale(20, 0.6),
  },
  image_view: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: windowHeight,
  },
  heading_text: {
    fontSize: moderateScale(15, 0.6),
    // textTransform: 'uppercase',
    color: Color.white
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
  end_view: {
    height: '20%',
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.6),
  },
});
