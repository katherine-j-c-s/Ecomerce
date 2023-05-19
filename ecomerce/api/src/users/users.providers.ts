import { User } from '../models/User.model';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User
  }
];
