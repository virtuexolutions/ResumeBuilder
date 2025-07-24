import React from 'react';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLoaction } from '../Store/slices/common';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const requestLocationPermission = async () => {
//   const dispatch = useDispatch();
//   console.log('function me ha requestLocationPermission');
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Access Required',
//         message: 'This App needs to Access your location',
//       },
//     );
//     console.log("🚀 ~ requestLocationPermission ~ granted:", granted)
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('🚀 ~ requestLocationPermission ~ granted:', granted);
//       dispatch(setLoaction(granted));
//       console.log('You can use the Location');
//     } 
//     else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err, '===========> errr');
//   }
// };

// const requestCameraPermission = async () => {
//   console.log('function me ha requestCameraPermission');
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message:
//           'Breakaway App needs access to your camera ' +
//           'so you can take awesome pictures.',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the Camera');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const requestWritePermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'Storage Access Required',
//         message: 'This App needs to Access your Storage',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the Storage');
//     } else {
//       console.log('Storage permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };


const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};


const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      console.log('🔄 Requesting CAMERA permission...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Camera permission granted');
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('❌ Camera permission denied by user');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('🚫 Camera permission permanently denied');
        // You can navigate to settings if needed
      }
    } catch (err) {
      console.warn('❗ Permission error:', err);
    }
  } else {
    console.log('✅ iOS does not require runtime camera permission here');
  }
};

const requestWritePermission = async () => {
  try {
    const sdk = Platform.Version;

    if (sdk >= 33) {
      // Android 13+
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted for READ_MEDIA_IMAGES');
      } else {
        console.log('Permission denied');
      }

    } else {
      // Android < 13
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access Required',
          message: 'App needs access to your storage to save images',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted for WRITE_EXTERNAL_STORAGE');
      } else {
        console.log('Permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};


const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ContainsHTML = str => {
  return /<[a-z][\s\S]*>/i.test(str);
};

export {
  requestLocationPermission,
  requestCameraPermission,
  requestWritePermission,
  apiHeader,
  sleep,
  wait,
  ContainsHTML,
  windowWidth,
  windowHeight,
};
