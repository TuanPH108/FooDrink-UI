export class Restaurant {
    id!: string
    restaurantName!: string
    latitude!: string
    longitude!: string
    address!: string
    city!: string
    country!: string
    hotline!: string
    averageRating!: number
    imageList!: string []
    totalRevenue!: string
    dailyRevenue!: string
    monthlyRevenue!: string
    isRegistration!: boolean
    status!: boolean
  }
export class RestaurantByIdResponse{
  data!: Restaurant
}
export class RestaurantResponse{
  data! :Restaurant[];
}
  export class RestaurantPaginationResponse {
    data! : Restaurant[];
    pageSize! : number;
    pageIndex! : number;
    searchString! : string;
  }
  export class RestaurantSearchString{
    searchString : string = '';
    data! : Restaurant[];
  }

  export class RestaurantLocation{
    location : string = '';
    restaurant! : Restaurant;
  }

  export class RestaurantUpdateRequest {
    id!: string
    restaurantName!: string
    latitude!: string
    longitude!: string
    address!: string
    city!: string
    country!: string
    hotline!: string
    isRegistration!: boolean
  }

  export class ApproveRestaurantRequest {
    id!: string;
    isRegistration!: boolean;
  }
  