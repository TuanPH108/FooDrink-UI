export class User {
    id!: string
    username!: string 
    password!: string 
    email!: string 
    fullName!: string
    phoneNumber!: string 
    address!: string 
    favoritedList!: string
    role!: string
    image!: string
    restaurantId!: string
}
export class UserResponse{
    data! : User[];
    errorMessage! : string
    errorDetails! : string
}