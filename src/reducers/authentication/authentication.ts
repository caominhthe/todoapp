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
    case ActionTypes.BIOMETRIC_AUTHENTICATE: {
      return state;
    }
    case ActionTypes.BIOMETRIC_AUTHENTICATE_SUCCESS: {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated,
      };
    }
    case ActionTypes.BIOMETRIC_AUTHENTICATE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case ActionTypes.RESET_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE:
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED: {
      return state;
    }
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_FAIL:
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case ActionTypes.CHECK_HAS_BIOMETRIC_HARDWARE_SUCCESS: {
      const { compatible } = action.payload;

      return {
        ...state,
        hasBiomectricHardware: compatible,
      };
    }
    case ActionTypes.CHECK_BIOMETRICS_ENROLLED_SUCCESS: {
      const { isSaved } = action.payload;
      return {
        ...state,
        enrolledBiometrics: isSaved,
      };
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
