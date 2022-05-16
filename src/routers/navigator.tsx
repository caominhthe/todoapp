import RootNavigator from './rootNavigator';
import { NavigationContainer } from '@react-navigation/native';

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
