import { ReduxAction } from "@/types/reduxAction";
import { MENUAUTH } from "../action-types";

export default (state: any[] = [], action: any) => {
  switch (action.type) {
    case MENUAUTH:
      return { ...state, ...action };
    default:
      return state;
  }
};
