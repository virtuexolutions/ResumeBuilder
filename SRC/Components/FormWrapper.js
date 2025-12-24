import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FormWrapper = ({ children }) => (
    <KeyboardAwareScrollView
        style={{ flex: 1 }}
        enableOnAndroid={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
    >
        {children}
    </KeyboardAwareScrollView>
);

export default FormWrapper;
