
import { Restaurant, RestaurantLocation, RestaurantPaginationResponse } from '../type/Restaurant';
export class RestaurantService {
    url: string = 'https://foo.dangthanhquy.io.vn/api/Restaurant/';
    public async GetListSearchPagination(pageIndex: number, searchContent: string): Promise<Restaurant[]> {
        const endPoint: string = 'GetListRestaurant'
        const pageSize: number = 10;
        const restaurants: Restaurant[] = []
        const urlRequest: string = this.url + endPoint + '?PageSize=' + pageSize + '&PageIndex=' + String(pageIndex) + '&SearchingString=' + searchContent;
        const response = await fetch(urlRequest);
        if (response.ok) {
            const dataJson = await response.json() as RestaurantPaginationResponse;
            for (const item of dataJson.data) {
                restaurants.push(item);
            }
        }
        return restaurants;
    }

    public async GetListPagination(pageIndex: number): Promise<Restaurant[]> {
        const endPoint: string = 'GetListRestaurant'
        const pageSize: number = 10;
        const restaurants: Restaurant[] = [];
        const urlRequest: string = this.url + endPoint + '?PageSize=' + pageSize + '&PageIndex=' + String(pageIndex);
        const response = await fetch(urlRequest);
        if (response.ok) {
            const dataJson = await response.json() as RestaurantPaginationResponse;
            for (const item of dataJson.data) {
                restaurants.push(item);
            }
        }
        return restaurants;
    }

    public async GetListRestaurant(): Promise<Restaurant[]> {
        const endPoint = 'https://foo.dangthanhquy.io.vn/api/Restaurant/GetListRestaurant';
        const urlRequest = this.url + endPoint;
        let listRestaurant: Restaurant[] = [];
        const response = await fetch(endPoint);
        
        if (response.ok) {
            const dataJson = await response.json() as RestaurantPaginationResponse;
            console.log(dataJson)
            const listRestaurantResponse : Restaurant[] = dataJson.data;
            console.log(listRestaurantResponse)
            for (const item of listRestaurantResponse) {
                listRestaurant.push(item);
            }
        }
        return listRestaurant;
    }

    public async GetRestaurantByLocation(lat: number, long: number): Promise<string> {
        const endPoint = 'search-by-location';
        const urlRequest = this.url + endPoint + '?Latitude=' + String(lat) + "&Longitude=" + String(long);
        const response = await fetch(urlRequest);
        const restaurantResponse = await response.json() as RestaurantLocation;
        const locationResponse = restaurantResponse.location;
        return locationResponse;
    }

    public async GetRestaurantById(id: string): Promise<Restaurant> {
        const urlRequest = this.url + id;
        const response = await fetch(urlRequest);
        const restaurantResponse = await response.json() as Restaurant;
        return restaurantResponse;
    }
}