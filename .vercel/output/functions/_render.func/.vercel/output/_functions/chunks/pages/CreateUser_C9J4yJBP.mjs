import { c as createComponent, r as renderTemplate, f as renderComponent, g as createAstro, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Adminlayout } from './CreateRestaurant_CNbgzP7I.mjs';

class AddUserRequest {
  username;
  password;
  email;
  fullName;
  phoneNumber;
  address;
}

class UserService {
  url = "https://foo.dangthanhquy.io.vn/api/User/";
  async AddUser(request) {
    const endPoint = this.url + "add";
    await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
  async DeleteUser(id) {
    const endPoint = this.url + "delete/" + id;
    await fetch(endPoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  async GetUserById(id) {
    const endPoint = this.url + "get/" + id;
    const response = await fetch(endPoint);
    let responseValue;
    if (response.ok) {
      responseValue = await response.json();
    }
    return responseValue.data[0];
  }
  async UpdateUser(request) {
    const endPoint = this.url + "update";
    fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
  async GetListUser() {
    const endPoint = this.url + "getAll?PageSize=100";
    const response = await fetch(endPoint);
    let responseData;
    if (response.ok) {
      responseData = await response.json();
    }
    return responseData.data;
  }
}

const $$Astro = createAstro();
const $$CreateUser = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreateUser;
  const service = new UserService();
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const userName = data.get("username");
    const passwordInput = data.get("password");
    const emailInput = data.get("email");
    const fullnameInput = data.get("fullname");
    const phoneNumberInput = data.get("phonenumber");
    const addressInput = data.get("address");
    const addData = new AddUserRequest();
    addData.username = userName;
    addData.password = passwordInput;
    addData.email = emailInput;
    addData.fullName = fullnameInput;
    addData.phoneNumber = phoneNumberInput;
    addData.address = addressInput;
    await service.AddUser(addData);
  }
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST"> <div class="form-row"> <div class="col-md-6 mb-3"> <label for="validationDefault03">Full Name</label> <input type="text" name="fullname" class="form-control" id="validationDefault03" placeholder="City" required> </div> <div class="col-md-6 mb-3"> <label for="validationDefault03">User Name</label> <input type="text" name="username" class="form-control" id="validationDefault03" placeholder="City" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault04">Password</label> <input type="text" name="password" class="form-control" id="validationDefault04" placeholder="Address" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Email</label> <input type="text" name="email" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Phone Number</label> <input type="text" name="phonenumber" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Address</label> <input type="text" name="address" class="form-control" id="validationDefault05" placeholder="Hotline" required> </div> <button class="btn btn-primary" type="submit">Add</button> <a href="/Admin/User/ListUser"> <button type="button" id="submit" name="submit" class="btn btn-secondary">Back</button> </a>  </div></form>` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro";
const $$url = "/Admin/User/CreateUser";

const CreateUser = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreateUser,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { CreateUser as C, UserService as U };
