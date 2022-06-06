import { userActionTypes } from "./actionTypes";

interface IUserModel {
  id: number;
  username: string;
  token:string;
}

interface IReduxStore {
  user: IUserModel;
}

const getInitialState = () => {
  return {
    user: { id: 1, username: "durov" ,token:""},
  };
};
export const userReducer = (
  state: IReduxStore = getInitialState(),
  action: any
) => {
  switch (action.type) {

    case userActionTypes.USER_REGISTRATION: {

      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          token:''
        },
      };

    }
    case userActionTypes.USER_AUTH: {

      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          token:action.payload.token
        },
      };

    }
    default:
      return { ...state };
  }
};
