export type SignupData = LoginData & {
    userName: string;
    name: string;
    surname: string;
}

export type SignupResponse = {
    message: string;
    active_token: string;
}

export type LoginData = {
    email: string;
    password: string;
}

export type LoginResponse  = RefreshTokenResponse & {
    access_token: string;
    user: UserData;
}

export type RefreshTokenResponse = {
    access_token: string;
    user: UserData;
}

export type UserDataResponse = {
    status: string;
    message: string;
    data: UserData[];
};

export type UpdateUserResponse = UserDataResponse & {
    data: UserData;
};

export type UserData = {
    userId: string;
    userName: string;
    name: string;
    surname: string;
    bio?: string;
    email: string;
    password: string;
    avatar?: string;
}

export type ChangePasswordData = {
    userId: string;
    oldPassword: string;
    password: string;
}