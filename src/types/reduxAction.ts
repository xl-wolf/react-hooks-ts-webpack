export interface ReduxAction {
  type: string;
  payload?: { msg: string; status: number; data?: any };
}
