import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from "react-native-vector-icons/Foundation";
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';
import CustomStatusBar from './CustomStatusBar';
import CustomText from './CustomText';
const { height, width } = Dimensions.get('window');

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const cartData = useSelector(state => state.commonReducer.cart);
  const navigationN = useNavigation();
  console.log("🚀 ~ navigationN:", navigationN?.dispatch)
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    backBtnStyle,
    color,
    showList,
    headerColor,
    titleColor,
    close,
    onPress,
    navigateTO,
    headerType,
    cart,
    Notify,
    hideUser,
    height,
    style,
    onPressPlus,
    isRight,
    isShadow = true,
    rightText
    // fromDrawer
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    { label: 'Change Password', value: 'ChangePassword' },
    { label: 'Terms & Conditions', value: 'TermsAndConditions' },
    { label: 'Financial Breakdown', value: 'FinancialBreakDown' },
    { label: 'Logout', value: 'Logout' },
  ];

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  return (
    <>
      <CustomStatusBar />
      <View
        style={[
          styles.header2,
          {
            backgroundColor: headerColor ? headerColor : 'transparent',
          }.style && style,
          height && {
            height: height,
          }, isShadow && {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 22,
          }
        ]}
      >
        <View
          style={{
            height: moderateScale(20, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {showBack ? (
            <Icon
              name={'left'}
              as={AntDesign}
              size={moderateScale(25, 0.3)}
              color={backBtnStyle ? backBtnStyle : Color.themeBlue}
              onPress={() => {
                navigationN.goBack();
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => {
              navigationN.toggleDrawer();
            }} style={{
              width: windowWidth * 0.1,
              height: windowWidth * 0.1,
            }}>
              <Icon
                style={{
                  textAlign: 'center',
                  height: windowHeight * 0.05,
                  width: windowHeight * 0.05,
                  borderRadius: (windowHeight * 0.05) / 2,
                  paddingTop: moderateScale(6.6),
                }}
                name={'menu'}
                as={Feather}
                size={moderateScale(25, 0.3)}
                color={headerColor ? Color.white : Color.themeBlue}
                onPress={() => {
                  navigationN.toggleDrawer();
                  // navigationN.dispatch(DrawerActions.toggleDrawer())
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        {title ? (
          <CustomText
            style={{
              fontSize: moderateScale(18, 0.6),
              color: color ? color : Color.themeBlue,
              textAlign: 'center',
              width: isRight ? '70%' : '90%',
            }}
            isBold>
            {title}
          </CustomText>
        ) : (
          <></>
        )}
        {isRight &&
          <TouchableOpacity onPress={props.onPressPlus} style={{
            // width: moderateScale(0, 0.6),
            // height: moderateScale(30, 0.6),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <CustomText style={{
              fontSize: moderateScale(12, 0.6),
              marginRight: moderateScale(12, 0.6),
              color: Color.darkGray
            }}>{rightText}</CustomText>
            <Icon
              name={"plus"}
              as={Foundation}
              size={moderateScale(24, 0.2)}
              color={Color.themeBlue}
              // style={{ right: -135, top: 2 }}
              onPress={props.onPressPlus}
            />
          </TouchableOpacity>
        }
      </View>
    </>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    // height: windowHeight * 0.13,
    // backgroundColor: '',
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(22, 0.3),
    alignItems: 'center',
    // backgroundColor: 'red',

  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
