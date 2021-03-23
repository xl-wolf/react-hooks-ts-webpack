import { createHashHistory } from 'history';
export const history = createHashHistory();
export const setSession = (key: string, value: string) => window.sessionStorage.setItem(key, value)
export const getSession = (key: string) => window.sessionStorage.getItem(key)