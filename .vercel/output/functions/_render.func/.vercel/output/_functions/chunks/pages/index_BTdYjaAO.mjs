import { c as createComponent, r as renderTemplate, m as maybeRenderHead, g as createAstro, h as addAttribute, d as renderHead, f as renderComponent } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { R as RestaurantService } from './CreateRestaurant_CH8_AAib.mjs';

const $$Astro$1 = createAstro();
const $$NavigationBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NavigationBar;
  const service = new RestaurantService();
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const searchData = data.get("search");
    await service.RestaurantSearchString(searchData);
    if (searchData) {
      return Astro2.redirect("/ViewSearching");
    }
  }
  return renderTemplate`<link rel="stylesheet" href="src/components/NavigationBar.css">${maybeRenderHead()}<nav class="navbar"> <div class="navbar-container"> <form class="navbar-search" method="POST"> <input type="text" name="search" placeholder="Search..." aria-label="Search"> <button type="submit">Search</button> </form> <div class="navbar-auth"> <a href="/Login" class="btn btn-login">Login</a> <a href="/create-account" class="btn btn-create-account">Create Account</a> </div> </div> <span class="brand-name"> FooDrink </span> </nav>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/components/NavigationBar.astro", void 0);

const $$BodyContent = createComponent(async ($$result, $$props, $$slots) => {
  const restaurantService = new RestaurantService();
  const listRestaurant = await restaurantService.GetListRestaurant();
  const props = { listRestaurant };
  return renderTemplate`<link rel="stylesheet" href="src/components/BodyContent.css">${maybeRenderHead()}<div style="background-color: black;"> <div class="introduction-restaurant"> <h3></h3> <h2>Welcome to our Restaurants</h2> </div> <img src="/public/assets/fine_dinning_background.jpg" style="margin-bottom: 3em;"> <div class="small-container" style="background-color: black;"> <div class="row"> ${props.listRestaurant.map((item) => renderTemplate`<div class="col-4"> <img${addAttribute(item.imageList[0], "src")}> </div>`)} </div> <div class="food-type"> <h1>What do we have for you ?</h1> <div> <h2>Vietnamese Food</h2> <h2>Chinese Food</h2> <h2>Japanese Food</h2> <h2>And more than that.</h2> </div> </div> </div></div>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/components/BodyContent.astro", void 0);

const $$FooterContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/components/FooterContent.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>FooDrink</title>${renderHead()}</head> <body> ${renderComponent($$result, "NavigationBar", $$NavigationBar, {})} ${renderComponent($$result, "BodyContent", $$BodyContent, {})} ${renderComponent($$result, "FooterContent", $$FooterContent, {})} </body></html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
