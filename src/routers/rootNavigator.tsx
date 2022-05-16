import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import ScreenNames from './Routes';
import { AuthenticationScreen, TodoScreen } from '@screens';
import { useAppState } from '@hooks';
import { selectAuthenticated } from '@selectors';
import { resetAuthentication } from '../reducers';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const appState = useAppState();

  /*
    Reset user authenticated state after go to background for security
   */
  useEffect(() => {
    if (appState !== 'active') {
      dispatch(resetAuthentication());
    }
  }, [appState, dispatch]);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name={ScreenNames.Todo}
          component={TodoScreen}
          options={{
            headerTitle: 'Todo List',
          }}
        />
      ) : (
        <Stack.Screen
          name={ScreenNames.Authentication}
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
