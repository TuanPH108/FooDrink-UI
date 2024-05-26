import {
  AddRestaurantRequest,
  ApproveRestaurantRequest,
  Restaurant,
  RestaurantByIdResponse,
  RestaurantLocation,
  RestaurantPaginationResponse,
  RestaurantUpdateRequest,
} from "../type/Restaurant";

export class RestaurantService {
  url: string = "https://foo.dangthanhquy.io.vn/api/Restaurant/";
  public async GetListSearchPagination(
    pageIndex: number,
    searchContent: string
  ): Promise<Restaurant[]> {
    const endPoint: string = "GetListRestaurant";
    const pageSize: number = 10;
    const restaurants: Restaurant[] = [];
    const urlRequest: string =
      this.url +
      endPoint +
      "?PageSize=" +
      pageSize +
      "&PageIndex=" +
      String(pageIndex) +
      "&SearchingString=" +
      searchContent;
    const response = await fetch(urlRequest);
    if (response.ok) {
      const dataJson = (await response.json()) as RestaurantPaginationResponse;
      for (const item of dataJson.data) {
        restaurants.push(item);
      }
    }
    return restaurants;
  }

  public async GetListPagination(pageIndex: number): Promise<Restaurant[]> {
    const endPoint: string = "GetListRestaurant";
    const pageSize: number = 10;
    const restaurants: Restaurant[] = [];
    const urlRequest: string =
      this.url +
      endPoint +
      "?PageSize=" +
      pageSize +
      "&PageIndex=" +
      String(pageIndex);
    const response = await fetch(urlRequest);
    if (response.ok) {
      const dataJson = (await response.json()) as RestaurantPaginationResponse;
      for (const item of dataJson.data) {
        restaurants.push(item);
      }
    }
    return restaurants;
  }

  public async RestaurantSearchString(
    searchString: string
  ): Promise<Restaurant[]> {
    const endPoint: string =
      "https://foo.dangthanhquy.io.vn/api/Restaurant/GetListRestaurant";
    const restaurants: Restaurant[] = [];

    try {
      const urlRequest: string =
        this.url +
        endPoint +
        "&SearchingString=" +
        encodeURIComponent(searchString);
      const response = await fetch(urlRequest);

      if (response.ok) {
        const dataJson =
          (await response.json()) as RestaurantPaginationResponse;
        for (const item of dataJson.data) {
          restaurants.push(item);
        }
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }

    return restaurants;
  }

  public async GetListRestaurant(): Promise<Restaurant[]> {
    const endPoint =
      "https://foo.dangthanhquy.io.vn/api/Restaurant/GetListRestaurant";
    const urlRequest = this.url + endPoint;
    let listRestaurant: Restaurant[] = [];
    const response = await fetch(endPoint);

    if (response.ok) {
      const dataJson = (await response.json()) as RestaurantPaginationResponse;
      const listRestaurantResponse: Restaurant[] = dataJson.data;
      for (const item of listRestaurantResponse) {
        listRestaurant.push(item);
      }
    }
    return listRestaurant;
  }

  public async GetRestaurantByLocation(
    lat: number,
    long: number
  ): Promise<string> {
    const endPoint = "search-by-location";
    const urlRequest =
      this.url +
      endPoint +
      "?Latitude=" +
      String(lat) +
      "&Longitude=" +
      String(long);
    const response = await fetch(urlRequest);
    const restaurantResponse = (await response.json()) as RestaurantLocation;
    const locationResponse = restaurantResponse.location;
    return locationResponse;
  }

  public async GetRestaurantById(id: string): Promise<Restaurant | null> {
    const urlRequest: string =
      "https://foo.dangthanhquy.io.vn/api/Restaurant/" + id;

    try {
      const response = await fetch(urlRequest);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const dataJson = (await response.json()) as RestaurantByIdResponse;

      return dataJson.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  public async DeleteRestaurantById(id: string): Promise<void> {
    const endPoint = this.url + id;
    const response = await fetch(endPoint, {
      method: "DELETE",
    });
    if (response.status === 204) {
      alert("Delete Restaurant completely");
      //Reload page here
    }
  }

  public async AddRestaurant(request: AddRestaurantRequest): Promise<void> {
    const endPoint = this.url + "AddRestaurant";
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  }

  public async UpdateRestaurant(
    request: RestaurantUpdateRequest
  ): Promise<void> {
    // const endPoint = this.url + "UpdateRestaurant?id=" + request.id as string;
    const endPoint = this.url + "UpdateRestaurant?id=" + request.id;
    const response = await fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  }

  public async ApproveRestaurant(
    request: ApproveRestaurantRequest
  ): Promise<void> {
    const endPoint = this.url + "approve";
    const response = await fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      alert("Approve completely");
    }
  }
}
