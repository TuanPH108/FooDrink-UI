import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Adminlayout } from './CreateRestaurant_CH8_AAib.mjs';

const $$DetailUser = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, { "title": "Restaurant Detail Manager" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p></p><form> <main> <div class="card"> <div class="card__title"> <div class="icon"> <a href="#"><i class="fa fa-arrow-left"></i></a> </div> <h3>Restaurant Detail Manager</h3> </div> <div class="card__body"> <div class="half"> <div class="featured_text"> <h1>Restaurant name</h1> <p class="sub">Office Chair</p> <p class="price">$210.00</p> </div> <div class="image"> <img src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt=""> </div> </div> <div class="half"> <div class="description"> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem nam pariatur voluptate perferendis, asperiores aspernatur! Porro similique consequatur, nobis soluta minima, quasi laboriosam hic cupiditate perferendis esse numquam magni.</p> </div> <span class="stock"><i class="fa fa-pen"></i> In stock</span> <div class="reviews"> <ul class="stars"> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o"></i></li> </ul> <span>(64 reviews)</span> <div class="card__footer"> <div class="action"> <a href="/Admin/User/ListUser"><button type="button">Back to list</button></a> </div> </div> </div> </div> </div> </div> </main> </form>  ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/DetailUser.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/DetailUser.astro";
const $$url = "/Admin/User/DetailUser";

export { $$DetailUser as default, $$file as file, $$url as url };
