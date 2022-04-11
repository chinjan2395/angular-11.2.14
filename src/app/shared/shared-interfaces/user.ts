import {IModel} from './model';
import {IProfile} from './profile';

export interface IUser extends IModel {
  name: string;
  email: string;
  username: string;
  lastLogin: number | null;
  profile: IProfile;

  setAllAttributes({}): void;
}
