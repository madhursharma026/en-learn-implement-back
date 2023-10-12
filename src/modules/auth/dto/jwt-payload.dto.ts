export enum UserType {
  USER = 'USER',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export class JWTPayload {
  mobileNumber: string;
  id: number;
  type: UserType;
}
