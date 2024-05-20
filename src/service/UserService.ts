import { User, UserGetByIdResponse, UserResponse, UserGetListResponse, UserAddResponse, UserAddRequest, UserUpdateRequest, UserDeleteRequest } from '../type/User';

export class UserService {
    private url: string = 'https://foo.dangthanhquy.io.vn/api/User/';

    public async GetUserById(Id: string): Promise<UserResponse[]> {
        const endPoint = 'get/' + Id;
        const response = await fetch(this.url + endPoint);
        const responseJson = await response.json() as UserGetByIdResponse;
        return responseJson.data;
    }
    public async GetAllUser() : Promise<UserResponse[]>{
        const endPoint = 'getAll';
        const response = await fetch(this.url + endPoint);
        const responseJson = await response.json() as UserGetListResponse
        return responseJson.data; 

    }
    public async AddUser(request : UserAddRequest) : Promise<UserResponse[]>{
        
    }
    public async UpdateUser(request : UserUpdateRequest) : Promise<UserResponse[]>{
        
        
    }
    public async DeleteUser(request : UserDeleteRequest) :Promise<>{

    }
}
