import type { AuthenticationResponse, RegisterRequest } from "src/type/Authentication";

export class AuthenticationService {
    private url : string = "https://foo.dangthanhquy.io.vn/api/Authentication/";
    public async Login(username : string, password : string) : Promise<void>{
        const data = {
            "username" : username,
            "password" : password,
        };
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
                const responseData : AuthenticationResponse = await response.json();
                localStorage.setItem("accessToken", responseData.token);
                //Navigation sang trang khac
            }
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