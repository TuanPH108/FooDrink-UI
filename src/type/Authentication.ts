export class AuthenticationResponse {
    message!: string
    token!: string
    role!: string
}

export class AuthenticationRequest {
    username! : string
    password! : string
}

export class RegisterRequest{
    username!: string
    password!: string
    fullname!: string
    email!: string
    address!: string
}