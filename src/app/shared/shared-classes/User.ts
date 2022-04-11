import {Model} from './Model';
import {Profile} from './Profile';
import {IUser} from '../shared-interfaces/user';

/*const api = new APIService();
api
  .ListUsers()
  .then((response: ListUsersQuery) => {
    const items: Array<UserInterface> | null = response.items;
    console.log('list users', items);
  })
  .catch((e) => console.log('error listing users...', e));*/

export class User extends Model implements IUser {

  name: string;
  email: string;
  username: string;
  lastLogin: number | null;
  profile: any;

  constructor(attributes) {
    super(attributes);
    this.setAllAttributes(attributes);
  }

  private static get keyMapping(): any {
    return {
      name: 'name',
      username: 'username',
      email: 'email',
      lastLogin: 'last_login',
      profile: 'profile'
    };
  }

  setAllAttributes(attributes): void {
    this.setName(attributes[User.keyMapping.name]);
    this.setUsername(attributes[User.keyMapping.username]);
    this.setEmail(attributes[User.keyMapping.email]);
    this.setProfile(attributes[User.keyMapping.profile]);
  }

  getName(): string {
    return this.name;
  }

  protected setName(attribute: string): void {
    this.name = attribute;
  }

  getEmail(): string {
    return this.email;
  }

  protected setEmail(attribute: string): void {
    this.email = attribute;
  }

  getUsername(): string {
    return this.username;
  }

  protected setUsername(attribute: string): void {
    this.username = attribute;
  }

  getProfile(): any {
    return this.profile;
  }

  protected setProfile(attributes): void {
    this.profile = new Profile(attributes);
  }
}
