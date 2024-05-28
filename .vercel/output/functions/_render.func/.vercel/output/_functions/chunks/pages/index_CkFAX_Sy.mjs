import { c as createComponent, r as renderTemplate, h as addAttribute, d as renderHead, f as renderComponent, g as createAstro } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import $$Login from './Login_BpbPojYQ.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>FooDrink</title>${renderHead()}</head> <body> ${renderComponent($$result, "Login", $$Login, {})} </body></html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
