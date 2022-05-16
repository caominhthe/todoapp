import { RootState } from '@types';
import { createSelector } from 'reselect';
import { authenticationInitialState } from '../reducers/authentication/authentication';

const authenticationSelector = (state: RootState) => {
  return state.authentication ?? authenticationInitialState;
};

export const selectAuthenticated = createSelector(
  authenticationSelector,
  (state) => state.isAuthenticated,
);

export const selectBiometricInfo = createSelector(
  authenticationSelector,
  (state) => ({
    enrolledBiometrics: state.enrolledBiometrics,
    hasBiomectricHardware: state.hasBiomectricHardware,
  }),
);
