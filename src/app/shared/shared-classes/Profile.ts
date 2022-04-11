import {Model} from './Model';
import {IProfile} from '../shared-interfaces/profile';

export class Profile extends Model implements IProfile {

  address: string;
  avatar: string;
  city: string;
  emailSignature: string;
  hourlyRate: string;
  jobTitle: string;
  mobile: string;
  signature: string;
  skype: string;
  twitter: string;
  zipCode: string;

  constructor(attributes) {
    super(attributes);
    this.setAllAttributes(attributes);
  }

  private static get keyMapping(): any {
    return {
      mobile: 'mobile',
      avatar: 'avatar',
      zipCode: 'zipcode',
      jobTitle: 'job_title',
      city: 'city',
      address: 'address',
      hourlyRate: 'hourly_rate',
      skype: 'skype',
      twitter: 'twitter',
      signature: 'signature',
      emailSignature: 'email_signature',
    };
  }

  setAllAttributes(attributes): void {
    this.setMobile(attributes[Profile.keyMapping.mobile]);
    this.setCity(attributes[Profile.keyMapping.city]);
    this.setZipCode(attributes[Profile.keyMapping.zipCode]);
  }

  getMobile(): string {
    return this.mobile;
  }

  protected setMobile(attribute: string): void {
    this.mobile = attribute;
  }

  getCity(): string {
    return this.city;
  }

  protected setCity(attribute: string): void {
    this.city = attribute;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  protected setZipCode(attribute: string): void {
    this.zipCode = attribute;
  }
}
