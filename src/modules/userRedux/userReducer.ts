import { userActionTypes } from "./actionTypes";

interface IUserModel {
  id: number;
  login: string;
}

interface IReduxStore {
  user: IUserModel;
}

const getInitialState = () => {
  return {
    user: { id: 1, login: "durov" },
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
          login: action.payload.login,
        },
      };

    }
    default:
      return { ...state };
  }
};
