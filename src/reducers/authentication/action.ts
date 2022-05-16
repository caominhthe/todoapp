import * as LocalAuthentication from 'expo-local-authentication';
import ActionTypes from './actionTypes';

export const authenticate = () => async (dispatch: Function) => {
  try {
    const result: LocalAuthentication.LocalAuthenticationResult =
      await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: false,
      });

    if (result.success) {
      return dispatch({
        type: ActionTypes.BIOMETRIC_AUTHENTICATE_SUCCESS,
        payload: { isAuthenticated: result },
      });
    } else {
      return dispatch({ type: ActionTypes.BIOMETRIC_AUTHENTICATE_FAIL });
    }
  } catch (error) {}
};

export const resetAuthentication = () => async (dispatch: Function) =>
  dispatch({ type: ActionTypes.RESET_AUTHENTICATION });

export const checkBiometricHardwareExist = () => async (dispatch: Function) => {
  try {
    const result = await LocalAuthentication.hasHardwareAsync();
    dispatch({
      type: ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_SUCCESS,
      payload: { supported: result },
    });
  } catch (err) {
    return dispatch({
      type: ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_FAIL,
      payload: err,
    });
  }
};

export const isEnrolledBiometric = () => async (dispatch: Function) => {
  try {
    const result = await LocalAuthentication.isEnrolledAsync();
    return dispatch({
      type: ActionTypes.CHECK_BIOMETRICS_ENROLLED_SUCCESS,
      payload: { isEnrolled: result },
    });
  } catch {
    return dispatch({
      type: ActionTypes.CHECK_BIOMETRICS_ENROLLED_FAIL,
    });
  }
};
