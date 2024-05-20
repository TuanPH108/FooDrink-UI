export interface UserResponse {
    id: string;
    username: string;
    password: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    favoritedList: string;
    status: boolean;
}
export class UserAddResponse {
    data: UserResponse[];
}

export class UserDeleteResponse {
    data: UserResponse[];
}

export class UserGetByIdResponse {
    data: UserResponse[];
    errorMessage: string;
    errorDetails: string;
}
export class UserGetListResponse {
    pageSize: number;
    pageIndex: number;
    searchString: string;
    data: UserResponse[];
}

export class UserUpdateResponse {
    data: UserResponse[];
    errorMessage: string;
    errorDetails: string;
}

export class UserAddRequest {
    username: string;
    password: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
}

export class UserDeleteRequest {
    id: string;
}

export class UserGetByIdRequest {
    id: string;
}

export class UserGetListRequest {
    pageSize: number;
    pageIndex: number;
    searchString: string;
}

export class UserUpdateRequest {
    id: string;
    username: string;
    password: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    favoritedList: string;
}

