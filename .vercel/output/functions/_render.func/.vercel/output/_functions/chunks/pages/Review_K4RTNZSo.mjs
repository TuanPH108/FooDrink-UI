import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Customerlayout } from './Blog_D5JrSVwv.mjs';
/* empty css                           */

const $$Review = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Customerlayout", $$Customerlayout, { "data-astro-cid-qp6gdojp": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-qp6gdojp><div class="restaurant-info" data-astro-cid-qp6gdojp><h1 id="restaurant-name" data-astro-cid-qp6gdojp>Restaurant Name</h1><img id="restaurant-image" src="restaurant.jpg" alt="Restaurant Image" data-astro-cid-qp6gdojp></div><form class="review-form" id="reviewForm" data-astro-cid-qp6gdojp><div class="form-group" data-astro-cid-qp6gdojp><label for="reviewText" data-astro-cid-qp6gdojp>Your Review:</label><textarea class="form-control" id="reviewText" rows="5" placeholder="Write your review here..." data-astro-cid-qp6gdojp></textarea></div><div class="form-group" data-astro-cid-qp6gdojp><label for="uploadImage" data-astro-cid-qp6gdojp>Upload Image:</label><input type="file" class="form-control-file" id="uploadImage" data-astro-cid-qp6gdojp></div><button type="submit" class="btn btn-primary" data-astro-cid-qp6gdojp>Submit</button></form></div>` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Review.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Review.astro";
const $$url = "/Customer/Review";

export { $$Review as default, $$file as file, $$url as url };
