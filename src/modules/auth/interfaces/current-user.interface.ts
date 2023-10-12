import { UserType } from '../dto/jwt-payload.dto';

export interface ICurrentUser {
  mobileNumber: string;
  id: number;
  type: UserType;
  iat: number;
  exp: number;
  iss: string;
}
