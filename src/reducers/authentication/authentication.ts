import { AnyAction } from 'redux';
import ActionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

interface AuthenticationState {
  error?: any;
  hasBiomectricHardware?: boolean;
  enrolledBiometrics?: boolean;
  isAuthenticated: boolean;
}

export const authenticationInitialState: AuthenticationState = {
  error: undefined,
  isAuthenticated: false,
  enrolledBiometrics: undefined,
  hasBiomectricHardware: undefined,
};

function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AnyAction,
): AuthenticationState {
  switch (action.type) {
    case ActionTypes.BIOMETRIC_AUTHENTICATE_SUCCESS: {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated,
      };
    }
    case ActionTypes.RESET_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_SUCCESS: {
      const { supported } = action.payload;
      return {
        ...state,
        hasBiomectricHardware: action.payload?.supported,
      };
    }
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED_SUCCESS: {
      const { isEnrolled } = action.payload;
      return {
        ...state,
        enrolledBiometrics: isEnrolled,
      };
    }
    case ActionTypes.BIOMETRIC_AUTHENTICATE_FAIL:
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_FAIL:
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case ActionTypes.BIOMETRIC_AUTHENTICATE:
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE:
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED: {
      return state;
    }
    default:
      return state;
  }
}

const authenticationPersistConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['isAuthenticated'],
};

export default persistReducer(
  authenticationPersistConfig,
  authenticationReducer,
);
