
export interface User {
  id: number,
  email: string,
  firstName: string,
  lastName: string;
  picture: string;
}

export interface AccessToken {
  accessToken: string;
}

export type UserToken = User & AccessToken;