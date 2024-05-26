import { c as createComponent, r as renderTemplate, d as renderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Register$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="UTF-8"><title> Responsive Registration Form | CodingLab </title><link rel="stylesheet" href="/src/pages/style.css"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderHead()}</head> <body> <div class="container"> <div class="title">Registration</div> <div class="content"> <form action="#"> <div class="user-details"> <div class="input-box"> <span class="details">Full Name</span> <input type="text" placeholder="Enter your name" required> </div> <div class="input-box"> <span class="details">Username</span> <input type="text" placeholder="Enter your username" required> </div> <div class="input-box"> <span class="details">Email</span> <input type="text" placeholder="Enter your email" required> </div> <div class="input-box"> <span class="details">Phone Number</span> <input type="text" placeholder="Enter your number" required> </div> <div class="input-box"> <span class="details">Address</span> <input type="text" placeholder="Enter your number" required> </div> <div class="input-box"> <span class="details">Password</span> <input type="text" placeholder="Enter your password" required> </div> <div class="input-box"> <span class="details">Confirm Password</span> <input type="text" placeholder="Confirm your password" required> </div> </div> <div class="gender-details"> <input type="radio" name="gender" id="dot-1"> <input type="radio" name="gender" id="dot-2"> <input type="radio" name="gender" id="dot-3"> </div> <div class="button"> <input type="submit" value="Register"> </div> </form> </div> </div> </body></html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Register.astro", void 0);

const $$file$1 = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Register.astro";
const $$url$1 = "/Customer/Register";

const Register$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="UTF-8"><title> Responsive Registration Form | CodingLab </title><link rel="stylesheet" href="/src/pages/style.css"><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderHead()}</head> <body> <div class="container"> <div class="title">Registration</div> <div class="content"> <form action="#"> <div class="user-details"> <div class="input-box"> <span class="details">Full Name</span> <input type="text" placeholder="Enter your name" required> </div> <div class="input-box"> <span class="details">Username</span> <input type="text" placeholder="Enter your username" required> </div> <div class="input-box"> <span class="details">Email</span> <input type="text" placeholder="Enter your email" required> </div> <div class="input-box"> <span class="details">Phone Number</span> <input type="text" placeholder="Enter your number" required> </div> <div class="input-box"> <span class="details">Address</span> <input type="text" placeholder="Enter your number" required> </div> <div class="input-box"> <span class="details">Password</span> <input type="text" placeholder="Enter your password" required> </div> <div class="input-box"> <span class="details">Confirm Password</span> <input type="text" placeholder="Confirm your password" required> </div> </div> <div class="gender-details"> <input type="radio" name="gender" id="dot-1"> <input type="radio" name="gender" id="dot-2"> <input type="radio" name="gender" id="dot-3"> </div> <div class="button"> <input type="submit" value="Register Restaurant Partner"> </div> </form> </div> </div> </body></html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Restaurant/Register.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Restaurant/Register.astro";
const $$url = "/Restaurant/Register";

const Register = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Register$1 as R, Register as a };
