export interface SiderMenu {
  key: string;
  title: string;
  path?: string;
  show?: boolean;
  icon: any;
  children?: SiderMenu[];
}
