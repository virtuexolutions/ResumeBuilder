import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from '../Components/ShakingText';
import navigationService from '../navigationService';


const LoggedInScreen = ({ setFingerPrintModal }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [biometricType, setBiometricType] = useState(null);
  const descriptionRef = useRef(null);

  const handleAuthenticationAttemptedLegacy = error => {
    setErrorMessage(error?.message || 'Authentication failed');
    descriptionRef.current?.shake();
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
      subTitle: 'Place finger to log in the application',
    })
      .then(() => {
        setFingerPrintModal(false);
        navigationService.navigate('MyDrawer');
      })
      .catch(error => {
        console.log('Auth error (current):', error);
        if (error?.name === 'UserCanceled') {
          FingerprintScanner.release();
        } else if (error?.name === 'UserFallback') {
          FingerprintScanner.release();
        } else {
          setErrorMessage(error?.message || 'Authentication failed');
          descriptionRef.current?.shake();
        }
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        setFingerPrintModal(false);
        navigationService.navigate('DrawerNav');
      })
      .catch(error => {
        console.log('Auth error (legacy):', error);
        setErrorMessage(error?.message || 'Authentication failed');
        descriptionRef.current?.shake();
      });
  };

  useEffect(() => {
    // Detect available biometric sensor
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        setBiometricType(biometryType);
        if (Platform.OS === 'android' && Platform.Version < 23) {
          authLegacy();
        } else {
          authCurrent();
        }
      })
      .catch(err => {
        console.log('Biometric not available:', err);
        setFingerPrintModal(false);
      });

    return () => {
      FingerprintScanner.release();
    };
  }, []);

  return (
    <View style={styles.container}>
      <CustomImage
        source={require('../Assets/Images/lock.png')}
        resizeMode={'stretch'}
        style={{
          width: windowWidth * 0.2,
          height: windowHeight * 0.1,
        }}
      />
      <Text
        style={{
          marginTop: moderateScale(10, 0.6),
          fontSize: moderateScale(14, 0.6),
          textAlign: 'center',
          width: '80%',
          color: Color.veryLightGray,
        }}>
        Please scan your fingerprint to access your account
      </Text>

      <ShakingText
        ref={descriptionRef}
        style={styles.description(!!errorMessage)}>
        {errorMessage ||
          `Scan your ${biometricType || 'biometric'} on the\ndevice scanner to continue`}
      </ShakingText>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android' && Platform.Version < 23) {
            authLegacy();
          } else {
            authCurrent();
          }
        }}
        style={{
          paddingHorizontal: moderateScale(10, 0.6),
          paddingVertical: moderateScale(5, 0.6),
          borderWidth: 1,
          borderColor: '#0000EE',
          borderRadius: moderateScale(10, 0.6),
          marginTop: moderateScale(20, 0.6),
        }}>
        <CustomText style={{ color: '#0000EE' }}>Try Again</CustomText>
      </TouchableOpacity>

      {!!errorMessage && (
        <CustomText style={{ color: 'red', marginTop: 10 }}>
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
};

export default LoggedInScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  description: error => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5',
  }),
});
