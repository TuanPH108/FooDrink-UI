import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Adminlayout } from './CreateRestaurant_CH8_AAib.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$Adminlayout, { "title": "Home Admin" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Welcome to the Admin Dashboard!</p> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Index.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Index.astro";
const $$url = "/Admin/Index";

export { $$Index as default, $$file as file, $$url as url };
