import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Adminlayout } from './CreateRestaurant_CH8_AAib.mjs';

const $$CreateUser = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Adminlayout", $$Adminlayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="userForm"> <div class="form-row"> <div class="col-md-4 mb-3"> <label for="validationDefault01">First name</label> <input type="text" class="form-control" id="validationDefault01" placeholder="First name" value="Mark" required> </div> <div class="col-md-4 mb-3"> <label for="validationDefault02">Last name</label> <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required> </div> <div class="col-md-4 mb-3"> <label for="validationDefaultUsername">Username</label> <div class="input-group"> <div class="input-group-prepend"></div> <input type="text" class="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required> </div> </div> </div> <div class="form-row"> <div class="col-md-6 mb-3"> <label for="validationDefault03">City</label> <input type="text" class="form-control" id="validationDefault03" placeholder="City" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault04">State</label> <input type="text" class="form-control" id="validationDefault04" placeholder="State" required> </div> <div class="col-md-3 mb-3"> <label for="validationDefault05">Zip</label> <input type="text" class="form-control" id="validationDefault05" placeholder="Zip" required> </div> </div> <div class="form-group"> <label for="fileUpload">Upload File</label> <input type="file" class="form-control" id="fileUpload" required> <div id="filePreview"></div> </div> <div class="form-group"> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required> <label class="form-check-label" for="invalidCheck2">
Agree to terms and conditions
</label> </div> </div> <button class="btn btn-primary" type="submit">Submit form</button> </form> ` })}`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro";
const $$url = "/Admin/User/CreateUser";

export { $$CreateUser as default, $$file as file, $$url as url };
