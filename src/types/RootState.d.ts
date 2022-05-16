import { TodoState, AuthenticationState } from '@root/src/features_old';

interface RootState {
  authentication: AuthenticationState;
  todo: TodoState;
}
