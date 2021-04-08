import { ReduxAction } from "@/types/reduxAction";
import { LOGIN, REGISTER } from "../action-types";
export default (state: any = null, action: ReduxAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action };
    case REGISTER:
      return { ...state, ...action };
    default:
      return state;
  }
};
