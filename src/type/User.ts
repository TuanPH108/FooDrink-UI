export class User {
  id!: string;
  username!: string;
  password!: string;
  email!: string;
  fullName!: string;
  phoneNumber!: string;
  address!: string;
  favoritedList!: string;
  status!: boolean;
}

export class AddUserRequest {
  username!: string;
  password!: string;
  email!: string;
  fullName!: string;
  phoneNumber!: string;
  address!: string;
}

export class GetUserByIdResponse{
    data!: User[]
    errorMessage!: string
    errorDetails!: string
}

export class GetListUserResponse {
  pageSize!: number;
  pageIndex!: number;
  searchString!: string;
  data!: User[];
}

export class UpdateUserRequest {
    id!: string
    username!: string
    password!: string
    email!: string
    fullName!: string
    phoneNumber!: string
    address!: string
    favoritedList!: string
  }
  