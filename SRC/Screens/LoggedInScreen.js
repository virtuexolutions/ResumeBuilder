// import React, { useState } from 'react';
// import { Platform, Text, TouchableOpacity, View } from 'react-native';
// import { ScaledSheet, moderateScale } from 'react-native-size-matters';
// import { useDispatch } from 'react-redux';
// import Color from '../Assets/Utilities/Color';
// import CustomImage from '../Components/CustomImage';
// import CustomText from '../Components/CustomText';
// import { windowHeight, windowWidth } from '../Utillity/utils';

// const LoggedInScreen = ({ setFingerPrintModal }) => {
//   //const appState = useSelector(state => state.socketReducer.appstate)
//   const dispatch = useDispatch();
//   const [fingerAuthentication, setFingerAuthentication] = useState(false);
//   const [show, setShow] = useState(false);
//   const [description, setDescription] = useState('');
//   const [state, setState] = useState(null);

//   // const authCurrent = () => {
//   //  console.log('herererere rere rerer')
//   //   FingerprintScanner.authenticate({
//   //     title: 'Log in with Biometrics',
//   //     subTitle: 'Place finger to log in the application',
//   //   })
//   //     .then(data => {
//   //       console.log('here is the data =============>', data);
//   //       // alert('Authentication successfully', data);
//   //       // setFingerPrintModal(false)
//   //       // dispatch(setAppState(false))
//   //       setFingerPrintModal(false)
//   //       navigationService.navigate('DrawerNav');
//   //       // props.onAuthenticate();
//   //     })
//   //     .catch(error => {
//   //       if (error.name === 'UserCanceled') {
//   //           // User tapped the fallback button (Enter Password)
//   //           console.log('Authentication was canceled');
//   //           FingerprintScanner.release();
//   //           // Handle fallback behavior here
//   //         } else if (error.name === 'UserFallback') {
//   //           // User touched outside the scan modal
//   //           console.log('User touched outside the scan modal');
//   //           FingerprintScanner.release();
//   //           // Handle the scenario here
//   //         } else {
//   //           // Other authentication errors
//   //           console.log('Authentication error:', error);
//   //           // Handle other errors here
//   //         }
//   //     });
//   // };
//   // const authLegacy = () => {
//   //   FingerprintScanner.authenticate({
//   //     onAttempt: handleAuthenticationAttemptedLegacy(),
//   //   })
//   //     .then(() => {
//   //       props.handlePopupDismissedLegacy();
//   //       navigationService.navigate('DrawerNav');
//   //       // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
//   //       // setFingerPrintModal(false)
//   //       // dispatch(setAppState(false))
//   //       setFingerPrintModal(false)
//   //     })
//   //     .catch(error => {
//   //       setState({
//   //         errorMessageLegacy: error.message,
//   //         biometricLegacy: error.biometric,
//   //       });
//   //       description.shake();
//   //     });
//   // };
//   const handleAuthenticationAttemptedLegacy = error => {
//     setState({ errorMessageLegacy: error.message });
//     description.shake();
//   };

//   const renderLegacy = () => {
//     // const { errorMessageLegacy, biometricLegacy } = state;
//     // const {handlePopupDismissedLegacy } = this.props;

//     return (
//       <View style={styles.container}>
//         <View style={[styles.contentContainer]}>
//           <Image
//             style={styles.logo}
//             source={require('../Assets/Images/finger_print.png')}
//           />

//           <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
//           {/* <ShakingText
//             ref={(ref)=>{setTextRef(ref)}}
//             >
//               Welcome
//             </ShakingText> */}
//           <ShakingText
//             ref={ref => {
//               setDescription(ref);
//             }}
//             style={styles.description(!!state?.errorMessageLegacy)}>
//             {state?.errorMessageLegacy ||
//               `Scan your ${state?.biometricLegacy} on the\ndevice scanner to continue`}
//           </ShakingText>

//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={props?.handlePopupDismissedLegacy}>
//             <Text style={styles.buttonText}>BACK TO MAIN</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   // useEffect(() => {
//   //   if (requiresLegacyAuthentication()) {
//   //     console.log('auth');
//   //     authLegacy();
//   //   } else {
//   //     authCurrent();
//   //   }
//   //   return () => {
//   //     FingerprintScanner.release();
//   //   };
//   // }, []);

//   const requiresLegacyAuthentication = () => {
//     return Platform.Version < 23;
//   };
//   return (
//     <View style={styles.container}>
//       <CustomImage
//         source={require('../Assets/Images/lock.png')}
//         resizeMode={'stretch'}
//         style={{
//           width: windowWidth * 0.2,
//           height: windowHeight * 0.1,
//         }}
//       />
//       <Text
//         style={{
//           marginTop: moderateScale(10, 0.6),
//           fontSize: moderateScale(14, 0.6),
//           textAlign: 'center',
//           width: '80%',
//           color: Color.veryLightGray,
//         }}>
//         Please Scan your fingerPrint to access your account{' '}
//       </Text>
//       <TouchableOpacity
//         onPress={() => {
//           if (requiresLegacyAuthentication()) {
//             console.log('auth');
//             // authLegacy();
//           } else {
//             console.log('current');

//             // authCurrent();
//           }
//         }}
//         style={{
//           paddingHorizontal: moderateScale(10, 0.6),
//           paddingVertical: moderateScale(5, 0.6),
//           borderWidth: 1,
//           borderColor: '#0000EE',
//           borderRadius: moderateScale(10, 0.6),
//           marginTop: moderateScale(20, 0.6),
//         }}>
//         <CustomText
//           style={{
//             color: '#0000EE',
//           }}>
//           try again
//         </CustomText>
//       </TouchableOpacity>
//       <CustomText>{state?.errorMessageLegacy && state?.errorMessageLegacy}</CustomText>
//     </View>
//   );
// };

// export default LoggedInScreen;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: windowHeight,
//     width: windowWidth,
//   },
//   description: error => ({
//     textAlign: 'center',
//     color: error ? '#ea3d13' : '#a5a5a5',
//   }),
// });
