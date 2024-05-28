import { c as createComponent, r as renderTemplate, f as renderComponent, g as createAstro, m as maybeRenderHead, h as addAttribute } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { R as RestaurantService, A as ApproveRestaurantRequest, $ as $$Adminlayout } from './CreateRestaurant_CNbgzP7I.mjs';

const $$Astro = createAstro();
const $$idRestaurant = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$idRestaurant;
  const { idRestaurant } = Astro2.params;
  const service = new RestaurantService();
  const restaurantDetail = await service.GetRestaurantById(idRestaurant);
  if (Astro2.request.method === "POST") {
    const approveRestaurant = new ApproveRestaurantRequest();
    approveRestaurant.id = idRestaurant;
    approveRestaurant.isRegistration = true;
    await service.ApproveRestaurant(approveRestaurant);
  }
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, { "title": "Restaurant Detail Manager" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <form method="POST"> <main> <div class="card"> <div class="card__title"> <h3>Restaurant Detail Manager</h3> </div> <div class="card__body"> <div class="half"> <div class="featured_text"> <h1>${restaurantDetail?.restaurantName}</h1> </div> <div class="image"> <img${addAttribute(restaurantDetail?.imageList[0], "src")}> </div> </div> <div class="half"> <div class="description"> <p class="sub">${restaurantDetail?.address}</p> </div> <span class="stock"> <i class="fa fa-pen"></i> Edit
</span> <div class="reviews"> <ul class="stars"> <li> <i class="fa fa-star"></i> </li> </ul> <span>${restaurantDetail?.averageRating}</span> <span>(64 reviews)</span> <div class="card__footer"> <div class="action"> <a href="/Admin/Restaurant/ListRestaurant"> <button type="button">Back to list</button> </a> </div> </div> <a> <button type="submit" class="action-button" id="active-btn">Approve</button> </a> </div> </div> </div> </div> </main> </form> </div> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/approvement/[idRestaurant].astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/approvement/[idRestaurant].astro";
const $$url = "/Admin/Restaurant/approvement/[idRestaurant]";

export { $$idRestaurant as default, $$file as file, $$url as url };
