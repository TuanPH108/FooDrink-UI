export class AuthenticationResponse {
    message!: string
    token!: string
}

export class RegisterRequest{
    username!: string
    password!: string
    fullname!: string
    email!: string
    address!: string
}