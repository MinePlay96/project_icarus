import { User } from './user.entity';
export type UserType = Omit<User, 'password'> & Partial<User>;
