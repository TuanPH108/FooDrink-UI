import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Adminlayout } from './CreateRestaurant_CH8_AAib.mjs';

const $$DetailReview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="reivew"> <div class="container-fluid py-5 mx-auto"> <div class="card py-4 px-4"> <div class="row justify-content-start px-3"> <div class="image-bg mr-3"> <img class="user-img fit-image" src="https://i.imgur.com/RCwPA3O.jpg"> </div> <div class="text-left"> <h2>User name</h2> <div class="comment-section"> <h4 class="comment-title">Comment content</h4> <p class="comment-content">This is a sample comment content that will have a similar style.</p> </div> <span class="fa fa-star active"></span> <span class="fa fa-star active"></span> <span class="fa fa-star active"></span> <span class="fa fa-star active"></span> <span class="fa fa-star"></span> </div> <div class="btn btn-pink ml-auto">Hidden</div> </div> <div class="line"></div> <div class="row d-flex justify-content-between px-3"> <div class="prod-bg text-center py-1"><img class="prod-pic" src="https://i.imgur.com/6bdzZKE.png"></div> <div class="prod-bg text-center py-1"><img class="prod-pic" src="https://i.imgur.com/CGaJoDY.png"></div> <div class="prod-bg text-center py-1"><img class="prod-pic fat-img" src="https://i.imgur.com/8JVdjVT.png"></div> <div class="prod-bg text-center py-1"><img class="prod-pic" src="https://i.imgur.com/uJGwaIy.png"></div> <div class="more text-center pt-3"> <h1 class="mb-0 dk-none dk-sm-block"><strong>+6</strong></h1> <h5>ITEMS</h5> </div> </div> </div> </div> </form> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/DetailReview.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/DetailReview.astro";
const $$url = "/Admin/Review/DetailReview";

export { $$DetailReview as default, $$file as file, $$url as url };
