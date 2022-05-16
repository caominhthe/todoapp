import { TodoState } from '../../types';
import ActionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { AnyAction } from 'redux';
import update from 'immutability-helper';

export const todoInitialState: TodoState = {
  todoList: {},
  isLoading: false,
  error: undefined,
  mode: 'add',
};

function todoReducer(
  state: TodoState = todoInitialState,
  action: AnyAction,
): TodoState {
  switch (action.type) {
    case ActionTypes.UPDATE_TODO_SUCCESS:
    case ActionTypes.CREATE_TODO_SUCCESS: {
      const { todo } = action.payload;
      const newTodo = { [todo.id]: todo };
      return {
        ...state,
        todoList:
          state.todoList &&
          update(state.todoList, {
            $merge: newTodo,
          }),
        isLoading: false,
      };
    }
    case ActionTypes.UPDATE_TODO_FAIL:
    case ActionTypes.CREATE_TODO_FAIL:
    case ActionTypes.DELETE_TODO_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case ActionTypes.SET_EDIT_MODE: {
      const { mode } = action.payload;
      return {
        ...state,
        mode,
      };
    }
    case ActionTypes.DELETE_TODO_SUCCESS: {
      const { todoID } = action.payload;
      return {
        ...state,
        todoList: state.todoList
          ? update(state.todoList, {
              $unset: [todoID],
            })
          : {},
      };
    }
    case ActionTypes.UPDATE_TODO:
    case ActionTypes.CREATE_TODO:
    case ActionTypes.DELETE_TODO: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    default:
      return state;
  }
}

const todoPersistConfig = {
  key: 'todo',
  storage: AsyncStorage,
  whitelist: ['todoList'],
};

export default persistReducer(todoPersistConfig, todoReducer);
