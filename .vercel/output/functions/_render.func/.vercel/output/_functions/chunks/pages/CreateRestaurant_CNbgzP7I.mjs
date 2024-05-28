import { c as createComponent, r as renderTemplate, e as renderSlot, d as renderHead, f as renderComponent, g as createAstro, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Adminlayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Foo</title><link rel="stylesheet" href="/src/pages/Admin/styles.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"><script src="/js/Admin.js" type="text/javascript"><\/script>', '</head> <body> <div class="app-container"> <div class="sidebar"> <div class="sidebar-header"> <div class="app-icon"> <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <path fill="currentColor" d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z"></path> </svg> </div> </div> <ul class="sidebar-list"> <li id="home" class="sidebar-list-item active"> <a href="/Admin/Index"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"> <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> <polyline points="9 22 9 12 15 12 15 22"></polyline> </svg> <span>Home</span> </a> </li> <li id="restaurant" class="sidebar-list-item"> <a href="/Admin/Restaurant/ListRestaurant"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"> <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path> <line x1="3" y1="6" x2="21" y2="6"></line> <path d="M16 10a4 4 0 0 1-8 0"></path> </svg> <span>Restaurant</span> </a> </li> <li id="user" class="sidebar-list-item"> <a href="/Admin/User/ListUser"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"> <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path> <path d="M22 12A10 10 0 0 0 12 2v10z"></path> </svg> <span>User Manager</span> </a> </li> <li id="Review" class="sidebar-list-item"> <a href="/Admin/Review/ListReview"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"> <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline> <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path> </svg> <span>Review Manager</span> </a> </li> <li class="sidebar-list-item"> <a href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path> <path d="M13.73 21a2 2 0 0 1-3.46 0"></path> </svg> <span>Notifications</span> </a> </li> </ul> <div class="account-info"> <button class="account-info-more" id="exit-btn"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg> </button> </div> </div> <article> ', " </article> </div>  </body> </html>"])), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/shares/adminlayout.astro", void 0);

class RestaurantUpdateRequest {
  id;
  restaurantName;
  latitude;
  longitude;
  address;
  city;
  country;
  hotline;
  isRegistration;
}
class ApproveRestaurantRequest {
  id;
  isRegistration;
}
class AddRestaurantRequest {
  restaurantName;
  latitude;
  longitude;
  address;
  city;
  country;
  hotline;
  username;
  password;
  email;
}

class RestaurantService {
  url = "https://foo.dangthanhquy.io.vn/api/Restaurant/";
  async GetListSearchPagination(pageIndex, searchContent) {
    const endPoint = "GetListRestaurant";
    const pageSize = 10;
    const restaurants = [];
    const urlRequest = this.url + endPoint + "?PageSize=" + pageSize + "&PageIndex=" + String(pageIndex) + "&SearchingString=" + searchContent;
    const response = await fetch(urlRequest);
    if (response.ok) {
      const dataJson = await response.json();
      for (const item of dataJson.data) {
        restaurants.push(item);
      }
    }
    return restaurants;
  }
  async GetListPagination(pageIndex) {
    const endPoint = "GetListRestaurant";
    const pageSize = 10;
    const restaurants = [];
    const urlRequest = this.url + endPoint + "?PageSize=" + pageSize + "&PageIndex=" + String(pageIndex);
    const response = await fetch(urlRequest);
    if (response.ok) {
      const dataJson = await response.json();
      for (const item of dataJson.data) {
        restaurants.push(item);
      }
    }
    return restaurants;
  }
  async RestaurantSearchString(searchString) {
    const endPoint = "https://foo.dangthanhquy.io.vn/api/Restaurant/GetListRestaurant";
    const restaurants = [];
    try {
      const urlRequest = this.url + endPoint + "&SearchingString=" + encodeURIComponent(searchString);
      const response = await fetch(urlRequest);
      if (response.ok) {
        const dataJson = await response.json();
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
  async GetListRestaurant() {
    const endPoint = "GetListRestaurant";
    const pageSize = 50;
    const restaurants = [];
    const urlRequest = this.url + endPoint + "?PageSize=" + pageSize;
    const response = await fetch(urlRequest);
    if (response.ok) {
      const dataJson = await response.json();
      const listRestaurantResponse = dataJson.data;
      for (const item of listRestaurantResponse) {
        restaurants.push(item);
      }
    }
    return restaurants;
  }
  async GetRestaurantByLocation(lat, long) {
    const endPoint = "search-by-location";
    const urlRequest = this.url + endPoint + "?Latitude=" + String(lat) + "&Longitude=" + String(long);
    const response = await fetch(urlRequest);
    const restaurantResponse = await response.json();
    const locationResponse = restaurantResponse.location;
    return locationResponse;
  }
  async GetRestaurantById(id) {
    const urlRequest = "https://foo.dangthanhquy.io.vn/api/Restaurant/" + id;
    try {
      const response = await fetch(urlRequest);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const dataJson = await response.json();
      return dataJson.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
  async DeleteRestaurantById(id) {
    const endPoint = this.url + id;
    await fetch(endPoint, {
      method: "DELETE"
    });
  }
  async AddRestaurant(request) {
    const endPoint = this.url + "AddRestaurant";
    await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
  async UpdateRestaurant(request) {
    const endPoint = this.url + "UpdateRestaurant?id=" + request.id;
    await fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
  async ApproveRestaurant(request) {
    const endPoint = this.url + "approve?id=" + request.id;
    await fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
}

const $$Astro = createAstro();
const $$CreateRestaurant = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreateRestaurant;
  const service = new RestaurantService();
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const restaurantName = data.get("restaurantName");
    const city = data.get("city");
    const address = data.get("address");
    const hotline = data.get("hotline");
    const latitude = data.get("latitude");
    const longtitude = data.get("longtitude");
    const email = data.get("email");
    const username = data.get("username");
    const password = data.get("password");
    const country = data.get("country");
    const addData = new AddRestaurantRequest();
    addData.restaurantName = restaurantName;
    addData.city = city;
    addData.address = address;
    addData.hotline = hotline;
    addData.latitude = latitude;
    addData.longitude = longtitude;
    addData.email = email;
    addData.username = username;
    addData.password = password;
    addData.country = country;
    await service.AddRestaurant(addData);
  }
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST"> <div class="form-row"> <div class="col-md-4 mb-3"> <label for="validationDefault01">Full name</label> <input type="text" name="restaurantName" class="form-control" id="validationDefault01" placeholder="Full name" required> </div> <div class="col-md-4 mb-3"> <label for="validationDefault02">Last name</label> <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required> </div> <div class="col-md-4 mb-3">\`\`
<label for="validationDefaultUsername">Username</label> <div class="input-group"> <div class="input-group-prepend"></div> <input type="text" class="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required> </div> </div> </div> <div class="form-row"> <div class="col-md-6 mb-3"> <label for="validationDefault03">Country</label> <input type="text" name="country" class="form-control" id="validationDefault03" placeholder="City" required> </div> <div class="col-md-6 mb-3"> <label for="validationDefault03">City</label> <input type="text" name="city" class="form-control" id="validationDefault03" placeholder="City" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault04">Address</label> <input type="text" name="address" class="form-control" id="validationDefault04" placeholder="Address" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Hotline</label> <input type="text" name="hotline" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Latitude</label> <input type="text" name="latitude" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Longtitude</label> <input type="text" name="longtitude" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">User Name</label> <input type="text" name="username" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Password</label> <input type="text" name="password" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> </div> <button class="btn btn-primary" type="submit">Add</button> <a href="/Admin/Restaurant/ListRestaurant"> <button type="button" id="submit" name="submit" class="btn btn-secondary">Back</button> </a> </form> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/CreateRestaurant.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/CreateRestaurant.astro";
const $$url = "/Admin/Restaurant/CreateRestaurant";

const CreateRestaurant = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreateRestaurant,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Adminlayout as $, ApproveRestaurantRequest as A, CreateRestaurant as C, RestaurantService as R, RestaurantUpdateRequest as a };
