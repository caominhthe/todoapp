import { authenticationReducer, todoReducer } from '../reducers';

const rootReducer = {
  authentication: authenticationReducer,
  todo: todoReducer,
};

export default rootReducer;
