import {IModel} from './model';

export interface IProfile extends IModel {
  mobile: string;
  avatar: string;
  zipCode: string;
  jobTitle: string;
  city: string;
  address?: string;
  hourlyRate?: string;
  skype?: string;
  twitter?: string;
  signature?: string;
  emailSignature?: string;

  setAllAttributes({}): void;
}
