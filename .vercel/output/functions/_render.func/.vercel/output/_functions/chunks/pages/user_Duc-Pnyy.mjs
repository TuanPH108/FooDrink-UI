import { c as createComponent, r as renderTemplate, g as createAstro } from '../astro_5Nzo7u0R.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$User = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$User;
  return renderTemplate`<!-- ---
import { UserService } from "../../service/UserService";
import type { FormEvent } from 'react';



const userService = new UserService();
const userId = "8836c173-b58e-4c60-8c34-a885022a4ebd"; 
const user = await userService.GetUserById(userId);

const handleSave = async (event: FormEvent) => {
    // Function body remains unchanged
};

if (user === null) {
  throw new Error("Failed to fetch user data");
}
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>User Profile</title>
	</head>
	<body>
		<div class="navigation-bar">
			<a href="/">FooDrink</a>
			<a href="/About">REVIEW</a>
			<a href="/About">ABOUT</a>
			<a href="/Contact">CONTACT</a>
			<a href="/user">User</a>
			<input type="text" placeholder="Search"/>
			<button type="submit">
				<a>Search</a>
			</button>
			<button>
				<a href="/Login">Order</a>
			</button>
		</div>

		<div class="body-area">
			<div class="welcome-layout">
				<a>User Profile</a>
			</div>
			<div class="user-profile">
				<h2>User Profile</h2>
				{user.map((user) => (
					<form onsubmit={handleSave as any} class="user-details" id="user-form">
					<div class="avatar">
						<img src="https://foo.dangthanhquy.io.vn/image/user/8836c173-b58e-4c60-8c34-a885022a4ebd/d8b32e8f-24ab-4776-b6e0-57b0f8795ecd.jpeg" alt={user.fullName} class="user-image" />

					</div>
					<div>
						<p><strong>Username:</strong> <input type="text" name="username" value={user.username} class="form-control" /></p>
						<p><strong>Email:</strong> <input type="email" name="email" value={user.email} class="form-control" /></p>
						<p><strong>Full Name:</strong> <input type="text" name="fullName" value={user.fullName} class="form-control" /></p>
						<p><strong>Phone Number:</strong> <input type="text" name="phoneNumber" value={user.phoneNumber} class="form-control" /></p>
						<p><strong>Address:</strong> <input type="text" name="address" value={user.address} class="form-control" /></p>
					</div>
					<div>
						<button type="submit" class="btn btn-success save-button">Save</button>
						<button type="button" class="btn btn-secondary cancel-button" onclick="cancelEdit()">Cancel</button>
					</div>
				</form>

				))}
			</div>
			
		</div>
	</body>
</html>

<style>


.navigation-bar {
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #f8f9fa;
	padding: 10px;
}

.navigation-bar a {
	text-decoration: none;
	color: #333;
	margin: 0 10px;
}

.body-area {
	padding: 20px;
}

.welcome-layout a {
	font-size: 24px;
	font-weight: bold;
}

.user-profile {
	margin-top: 20px;
}

.user-details {
	border: 1px solid #ddd;
	padding: 20px;
	border-radius: 10px;
}

.user-image {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	margin-bottom: 20px;
}

.user-details p {
	margin: 10px 0;
}
</style> -->`;
}, "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/User/user.astro", void 0);

const $$file = "C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/User/user.astro";
const $$url = "/User/user";

export { $$User as default, $$file as file, $$url as url };
