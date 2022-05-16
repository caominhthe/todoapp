import * as actions from '../action';
import * as LocalAuthentication from 'expo-local-authentication';

const dispatch = jest.fn();

const spyAuthenticateAsync = jest
  .spyOn(LocalAuthentication, 'authenticateAsync')
  .mockImplementation(jest.fn());

const spyHasHardwareAsync = jest
  .spyOn(LocalAuthentication, 'hasHardwareAsync')
  .mockImplementation(jest.fn());

const spyIsEnrollAsync = jest
  .spyOn(LocalAuthentication, 'isEnrolledAsync')
  .mockImplementation(jest.fn());

describe('Given Authentication actions', () => {
  it('should call authenticateAsync on authenticate', async () => {
    await actions.authenticate()(dispatch);
    expect(spyAuthenticateAsync).toBeCalled();
  });

  it('should call hasHardwareAsync on checkBiometricHardwareExist', async () => {
    await actions.checkBiometricHardwareExist()(dispatch);
    expect(spyHasHardwareAsync).toBeCalled();
  });

  it('should call isEnrolledAsync on isEnrolledBiometric', async () => {
    await actions.isEnrolledBiometric()(dispatch);
    expect(spyIsEnrollAsync).toBeCalled();
  });
});
