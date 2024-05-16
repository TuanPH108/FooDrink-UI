import { User, UserResponse } from '../type/User';

export class UserService {
    private url: string = 'https://foo.dangthanhquy.io.vn/api/User/';

    public async GetUserById(Id: string): Promise<User[] | null> {
        const urlRequest: string = `${this.url}get/${Id}`;
        
        try {
            const response = await fetch(urlRequest);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const dataJson = await response.json() as UserResponse;

            return dataJson.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
}
