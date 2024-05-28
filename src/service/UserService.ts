import { AddUserRequest, GetListUserResponse, GetUserByIdResponse, UpdateUserRequest, User } from "src/type/User";

export class UserService{
    private url : string = "https://foo.dangthanhquy.io.vn/api/User/";

    public async AddUser(request : AddUserRequest) : Promise<void>{
        const endPoint = this.url + "add"
        const response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(request),
        });
    }
    public async DeleteUser(id : string) : Promise<void>{
        const endPoint = this.url + "delete/" + id;
        const response = await fetch(endPoint, {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            },
        })
    }
    public async GetUserById(id : string) : Promise<User>{
        const endPoint = this.url + "get/" + id
        const response = await fetch(endPoint)
        let responseValue!: GetUserByIdResponse
        if(response.ok)
            {
                responseValue = await response.json() as GetUserByIdResponse;
            }
        return responseValue.data[0];
    }

    public async UpdateUser(request : UpdateUserRequest) : Promise<void>{
        const endPoint = this.url + "update"
        const response = fetch(endPoint, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(request),
        });
    }

    public async GetListUser() : Promise<User[]>{
        const endPoint = this.url + "getAll"
        const response = await fetch(endPoint);
        let responseData! : GetListUserResponse;
        if(response.ok)
            {
                responseData = await response.json() as GetListUserResponse;
            }
        return responseData.data;
    }

    public async GetUserByJwt(): Promise<User | null> {
        const urlRequest: string = 'https://foo.dangthanhquy.io.vn/api/User/get-user-by-jwt'; 
        
        try {
            const response = await fetch(urlRequest, {
                method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("accessToken")
            }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            const dataJson = await response.json() as GetUserByIdResponse;
    
            return dataJson.data[0];
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
}

