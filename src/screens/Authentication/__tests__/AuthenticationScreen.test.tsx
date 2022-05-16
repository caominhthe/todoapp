import { render } from '@testing-library/react-native';
import * as ReactRedux from 'react-redux';
import { AuthenticationScreen } from '../AuthenticationScreen';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
const baseProps = {
  route: {},
  navigation: {
    navigate: mockNavigate,
  },
} as any;
const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(
  () =>
    (...args: any) =>
      dispatch(...args),
);

describe('Given Authentication', () => {
  let store: any;

  beforeEach(() => {});

  it('should render correctly with biometric', () => {
    store = mockStore({
      authentication: {
        enrolledBiometrics: true,
        hasBiomectricHardware: true,
      },
    });
    const { toJSON } = render(
      <ReactRedux.Provider store={store as any}>
        <AuthenticationScreen {...baseProps} />
      </ReactRedux.Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
