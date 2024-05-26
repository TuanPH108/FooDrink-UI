import type { AuthenticationResponse, RegisterRequest } from "src/type/Authentication";

export class AuthenticationService {
    private url : string = "https://foo.dangthanhquy.io.vn/api/Authentication/";
    public async Login(username : string, password : string) : Promise<string>{
        const data = {
            "username" : username,
            "password" : password,
        };
        let responseData! : AuthenticationResponse 
        const endPoint = this.url + "Login"
        const response = await fetch(endPoint, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data),
        });
        if(response.ok)
            {
                responseData = await response.json();
            }
        return responseData.token;
    }

    public async Register(request: RegisterRequest) : Promise<void> {
        const endPoint = this.url + "Register";
        const response = await fetch(endPoint, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(request),
        });
        if(response.ok)
            {
                alert("Register Completely");
                //navigate to login page
            }
    }
    
}