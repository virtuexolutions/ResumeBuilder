import { StripeProvider } from '@stripe/stripe-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalErrorModal from './SRC/Components/ErrorModal';
import SplashScreen from './SRC/Screens/SplashScreen';
import { persistor, store } from './SRC/Store/index';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import AppNavigator from './SRC/appNavigation';


const App = () => {
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51RoieKFIiQxtLicEZZqk0AwV9gdF7RWYSQsTOVEPgiGQmJQKhN5ZIINW7i5HC7LcX4teSDXXSfnwP8AJl1nUVjFg00ycMYLDEw'
      }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
            <GlobalErrorModal />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission()
    }
    GetPermission();

  }, []);

  console.log("Platform Version:", Platform.Version);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(5000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;

