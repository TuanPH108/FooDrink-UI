import { c as createComponent, r as renderTemplate, f as renderComponent, g as createAstro, m as maybeRenderHead, h as addAttribute } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { R as RestaurantService, $ as $$Adminlayout, a as RestaurantUpdateRequest } from './CreateRestaurant_CH8_AAib.mjs';

const $$Astro$1 = createAstro();
const $$id$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$id$1;
  const { id } = Astro2.params;
  const service = new RestaurantService();
  const restaurantDetail = await service.GetRestaurantById(id);
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, { "title": "Restaurant Detail Manager" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <form> <main> <div class="card"> <div class="card__title"> <h3>Restaurant Detail Manager</h3> </div> <div class="card__body"> <div class="half"> <div class="featured_text"> <h1>${restaurantDetail?.restaurantName}</h1> </div> <div class="image"> <img${addAttribute(restaurantDetail?.imageList[0], "src")}> </div> </div> <div class="half"> <div class="description"> <p class="sub">${restaurantDetail?.address}</p> </div> <span class="stock"> <i class="fa fa-pen"></i> Edit
</span> <div class="reviews"> <ul class="stars"> <li> <i class="fa fa-star"></i> </li> </ul> <span>${restaurantDetail?.averageRating}</span> <span>(64 reviews)</span> <div class="card__footer"> <div class="action"> <a href="/Admin/Restaurant/ListRestaurant"> <button type="button">Back to list</button> </a> </div> </div> </div> </div> </div> </div> </main> </form> </div> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/Detail/[id].astro", void 0);

const $$file$1 = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/Detail/[id].astro";
const $$url$1 = "/Admin/Restaurant/Detail/[id]";

const _id_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const service = new RestaurantService();
  const restaurant = await service.GetRestaurantById(id);
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const restaurantName = data.get("fullname");
    const phone = data.get("phone");
    const address = data.get("address");
    const city = data.get("city");
    const latitude = data.get("latitude");
    const longtitude = data.get("longtitude");
    const country = data.get("country");
    const updateRestaurant = new RestaurantUpdateRequest();
    updateRestaurant.id = id;
    updateRestaurant.restaurantName = restaurantName;
    updateRestaurant.hotline = phone;
    updateRestaurant.address = address;
    updateRestaurant.latitude = latitude;
    updateRestaurant.longitude = longtitude;
    updateRestaurant.city = city;
    updateRestaurant.country = country;
    updateRestaurant.isRegistration = true;
    await service.UpdateRestaurant(updateRestaurant);
  }
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="row gutters"> <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12"> <div class="card h-100"> <div class="card-body"> <div class="account-settings"> <div class="user-profile"> <div class="user-avatar"> <img${addAttribute(restaurant?.imageList[0], "src")} alt="Restaurant Image"> </div> </div> </div> </div> </div> <form method="POST"> <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"> <div class="card h-100"> <div class="card-body"> <div class="row gutters"> <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="fullName">Full Name</label> <input type="text" name="fullname" class="form-control" id="fullName"${addAttribute(restaurant?.restaurantName, "value")}> </div> </div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="phone">Phone</label> <input type="text" name="phone" class="form-control"${addAttribute(restaurant?.hotline, "value")}> </div> </div> </div> <div class="row gutters"> <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"></div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="fullName">Country</label> <input class="form-control" name="country"${addAttribute(restaurant?.country, "value")}> </div> </div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="fullName">Address</label> <input class="form-control" name="address"${addAttribute(restaurant?.address, "value")}> </div> </div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="ciTy">City</label> <input class="form-control" name="city"${addAttribute(restaurant?.city, "value")}> </div> </div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="latitude">Latitude</label> <input class="form-control" name="latitude"${addAttribute(restaurant?.latitude, "value")}> </div> </div> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"> <div class="form-group"> <label for="longtitude">Longitude</label> <input class="form-control" name="longtitude"${addAttribute(restaurant?.longitude, "value")}> </div> </div> </div> <div class="row gutters"> <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"> <div class="text-right"> <a href="/Admin/Restaurant/ListRestaurant"> <button type="button" class="btn btn-secondary">Cancel</button> </a> <button type="submit" name="submit" class="btn btn-primary">Update</button> </div> </div> </div> </div> </div> </div> </form> </div> </div> </div>` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/UpdateRestaurant/[id].astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/UpdateRestaurant/[id].astro";
const $$url = "/Admin/Restaurant/UpdateRestaurant/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_$1 as _, _id_ as a };
