import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Linking,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';

import { RootStackScreenProps, ScreenNames } from '@routers';
import { useAppState } from '@root/src/hooks';
import { selectBiometricInfo } from '@selectors';
import {
  authenticate,
  checkBiometricHardwareExist,
  isEnrolledBiometric,
} from '@root/src/reducers';
import { spacing, typography } from '@theme';

type AuthenticationScreenProps =
  RootStackScreenProps<ScreenNames.Authentication>;

export const AuthenticationScreen: React.FC<AuthenticationScreenProps> = () => {
  const dispatch = useDispatch();
  const appState = useAppState();

  const { enrolledBiometrics, hasBiomectricHardware } =
    useSelector(selectBiometricInfo);

  /*
    Check if the device has Biometric login system
  */
  useEffect(() => {
    dispatch(checkBiometricHardwareExist());
    dispatch(isEnrolledBiometric());
  }, []);

  const oncheckBiometricHardwareExisted = useCallback(() => {
    dispatch(checkBiometricHardwareExist());
  }, [dispatch]);

  const checkEnrolledBioAuthen = useCallback(() => {
    dispatch(isEnrolledBiometric());
  }, [dispatch]);

  const onAuthenticate = useCallback(async () => {
    dispatch(authenticate());
  }, [dispatch]);

  const onHandleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:PASSCODE');
    } else {
      startActivityAsync(ActivityAction.SECURITY_SETTINGS);
    }
  };

  /*
    Rerun check after user come back to app 
   */
  React.useEffect(() => {
    if (appState === 'active') {
      if (!hasBiomectricHardware) {
        oncheckBiometricHardwareExisted();
      }
      checkEnrolledBioAuthen();
    }
  }, [
    appState,
    enrolledBiometrics,
    hasBiomectricHardware,
    oncheckBiometricHardwareExisted,
    checkEnrolledBioAuthen,
  ]);
  /*
    if the device does not support => inform user that they can not use app
    if the device supports but user does not Set up yet => show link to Setting page
    if user enrolled at least 1 => show Login button
   */
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Todo List'}</Text>
      </View>
      <View>
        {enrolledBiometrics ? (
          <Button title="Login with Biometrics" onPress={onAuthenticate} />
        ) : hasBiomectricHardware ? (
          <View style={styles.bottomContainer}>
            <Text style={styles.warningText}>
              {
                'Please make sure you set up at least 1 Biometrics authentication to use app'
              }
            </Text>
            <Button title="Open Settings" onPress={onHandleOpenSettings} />
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <Text style={styles.warningText}>
              {
                'This app can not be used on device that not have Biometric authentication'
              }
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
  },
  title: {
    fontSize: typography.fontSize.larger,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warningText: {
    fontSize: typography.fontSize.small,
    textAlign: 'center',
    marginBottom: spacing.large,
    width: '70%',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
