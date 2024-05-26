import { c as createComponent, r as renderTemplate, d as renderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" dir="ltr"> <head><meta charset="utf-8"><title>Popup Login Form Design | CodingNepal</title><link rel="stylesheet" href="/src/pages/login.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">${renderHead()}</head> <body> <div class="center"> <input type="checkbox" id="show"> <label for="show" class="show-btn">Chào mừng đến với FooDrink</label> <div class="container"> <label for="show" class="close-btn fas fa-times" title="Đóng"></label> <div class="text">Đăng nhập</div> <form id="login-form" method="POST"> <div class="data"> <label>Tên đăng nhập</label> <input type="text" name="username" required> </div> <div class="data"> <label>Mật khẩu</label> <input type="password" name="password" required> </div> <div class="btn"> <div class="inner"></div> <button type="submit">Đăng nhập</button> </div> <div class="signup-link">
Chưa là thành viên? <a href="/Customer/Register">Đăng ký ngay</a> </div> <p>---------------------------------------</p> <div class="signup-link">
Bạn muốn trở thành đối tác nhà hàng? <a href="/Restaurant/Register">Đăng ký ngay</a> </div> </form> <button id="btn-submit" type="button">Thử đăng nhập</button> </div> </div>  </body> </html>`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Login.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Login.astro";
const $$url = "/Login";

export { $$Login as default, $$file as file, $$url as url };
