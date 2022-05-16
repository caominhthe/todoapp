import { AuthenticationType } from 'expo-local-authentication';

export type BiometricType = AuthenticationType;

export interface AuthenticationState {
  error?: any;

  hasBiomectricHardware?: boolean;

  enrolledBiometrics?: boolean;

  isAuthenticated: boolean;
}
