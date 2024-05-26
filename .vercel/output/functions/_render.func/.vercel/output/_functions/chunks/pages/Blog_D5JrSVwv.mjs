import { c as createComponent, r as renderTemplate, d as renderHead, e as renderSlot, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Customerlayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><!-- FontAwesome --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"><!-- Custom CSS --><link rel="stylesheet" href="/src/pages/Customer/css/linearicons.css"><link rel="stylesheet" href="/src/pages/Customer/css/animate.css"><link rel="stylesheet" href="/src/pages/Customer/css/flaticon.css"><link rel="stylesheet" href="/src/pages/Customer/css/slick.css"><link rel="stylesheet" href="/src/pages/Customer/css/slick-theme.css"><link rel="stylesheet" href="/src/pages/Customer/css/bootstrap.min.css"><link rel="stylesheet" href="/src/pages/Customer/css/bootsnav.css"><link rel="stylesheet" href="/src/pages/Customer/css/style.css"><link rel="stylesheet" href="/src/pages/Customer/css/responsive.css">${renderHead()}</head> <body> <section class="top-area"> <div class="header-area"> <!-- Start Navigation --> <nav class="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000"> <div class="container"> <!-- Start Header Navigation --> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"> <i class="fa fa-bars"></i> </button> <a class="navbar-brand" href="Home.astro">Foo<span>Drink</span></a> </div> <div class="collapse navbar-collapse menu-ui-design" id="navbar-menu"> <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp"> <li class="scroll active"> <a href="#home">home</a> </li> <li class="scroll"> <a href="#explore">explore</a> </li> <li class="scroll"> <a href="/Customer/Blog">blog</a> </li> <li class="scroll"> <a href="/Customer/Review">review</a> </li> <li class="dropdown"> <a href="#" class="dropdown-toggle" id="userIcon" onclick="toggleDropdown()"> <i class="fas fa-user"></i> </a> <select class="dropdown-menu" id="userDropdown" onchange="handleSelectChange(event)"> <option value="">Select...</option> <option value="signin">Sign In</option> <option value="register">Register</option> </select> </li> </ul><!--/.nav --> </div><!-- /.navbar-collapse --> </div><!--/.container--> </nav><!--/nav--> <!-- End Navigation --> </div><!--/.header-area--> <div class="clearfix"></div> </section><!-- /.top-area--> <article> ${renderSlot($$result, $$slots["default"])} </article>   <!--modernizr.min.js-->  <!--bootstrap.min.js-->  <!-- bootsnav js -->  <!--feather.min.js-->  <!-- counter js -->   <!--slick.min.js-->   <!--Custom JS-->  </body> </html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/shares/customerlayout.astro", void 0);

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Customerlayout", $$Customerlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section id="reviews" class="reviews"> <div class="section-header"> <h2>clients reviews</h2> <p>What our clients say about us</p> </div><!--/.section-header--> <div class="reviews-content"> <div class="testimonial-carousel"> <div class="single-testimonial-box"> <div class="testimonial-description"> <div class="testimonial-info"> <div class="testimonial-img"> <img src="https://phunugioi.com/wp-content/uploads/2022/04/Anh-meme-meo-1.jpg" alt="clients"> </div><!--/.testimonial-img--> <div class="testimonial-person"> <h2>Tom Leakar</h2> <h4>London, UK</h4> <div class="testimonial-person-star"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div> </div><!--/.testimonial-person--> </div><!--/.testimonial-info--> <div class="testimonial-comment"> <p>
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis eaque.
</p> </div><!--/.testimonial-comment--> <div class="restaurant-info"> <h3>Restaurant Name</h3> <img src="restaurant.jpg" alt="Restaurant Image"> <p>123 Main St, London</p> </div><!--/.restaurant-info--> </div><!--/.testimonial-description--> </div><!--/.single-testimonial-box--> <!-- Add more testimonials here --> </div> </div> </section> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Blog.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Blog.astro";
const $$url = "/Customer/Blog";

const Blog = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Blog,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Customerlayout as $, Blog as B };
