export type SignupData = LoginData & {
  userName: string;
  name: string;
  surname: string;
};

export type SignupResponse = {
  message: string;
  active_token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = RefreshTokenResponse & {
  access_token: string;
  user: AuthUserData;
};

export type RefreshTokenResponse = {
  access_token: string;
  user: AuthUserData;
};

export type AuthUserDataResponse = {
  status: string;
  message: string;
  data: AuthUserData[];
};

export type UpdateUserResponse = AuthUserDataResponse & {
  data: AuthUserData;
};

export type AuthUserData = {
  userId: string;
  userName: string;
  name: string;
  surname: string;
  bio?: string;
  email: string;
  avatar?: string;
  password?: string;
};

export type ChangePasswordData = {
  userId: string;
  oldPassword: string;
  password: string;
};
