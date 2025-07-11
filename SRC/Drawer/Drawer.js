import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { setUserLogoutAuth } from '../Store/slices/auth';
import { windowHeight, windowWidth } from '../Utillity/utils';

const Drawer = React.memo((props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const user_type = useSelector(state => state.authReducer.role)
  console.log("🚀 ~ Drawer ~ user_type:", user_type)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ Drawer ~ userData user_type:", user_type, userData)
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
        // setIsModalVisible(true);
        // navigation.navigate('CompanyDetails');
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
      name: 'Categories',
      onPress: () => {
      },
      iconName: 'folder',
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
    {
      id: 3,
      name: 'Documents',
      onPress: () => {
        // setIsModalVisible(true);
        // navigation.navigate('Tamplates');
      },
      iconName: 'filetext1',
      iconType: AntDesign
    },
    {
      id: 4,
      name: 'Notifications ',
      onPress: () => {
        // navigation.navigate('Department');
      },
      iconName: 'notifications',
      iconType: MaterialIcons
    },
    {
      id: 5,
      name: 'Settings',
      onPress: () => {
        // navigation.navigate('CompanyDetails');
      },
      iconName: 'settings',
      iconType: MaterialIcons
    },
    {
      id: 6,
      name: 'Wallet',
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
          <CustomImage source={require('../Assets/Images/no_image.jpg')} style={styles.image} />
        </View>
        <CustomText style={styles.heading_text}>{userData?.name}</CustomText>
        <CustomText style={styles.heading_text}>{userData?.email}</CustomText>
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
    fontSize: moderateScale(12, 0.6),
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
