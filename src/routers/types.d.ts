import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenNames from './Routes';

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  [ScreenNames.Authentication]: undefined;
  [ScreenNames.Todo]: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
