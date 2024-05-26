import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_5Nzo7u0R.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/index","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Index\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Index","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Index.astro","pathname":"/Admin/Index","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/restaurant/createrestaurant","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/CreateRestaurant\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"CreateRestaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Restaurant/CreateRestaurant.astro","pathname":"/Admin/Restaurant/CreateRestaurant","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/restaurant/detail/[id]","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/Detail\\/([^/]+?)\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"Detail","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/Admin/Restaurant/Detail/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/restaurant/listrestaurant","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/ListRestaurant\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"ListRestaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Restaurant/ListRestaurant.astro","pathname":"/Admin/Restaurant/ListRestaurant","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/restaurant/updaterestaurant/[id]","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/UpdateRestaurant\\/([^/]+?)\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"UpdateRestaurant","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/Admin/Restaurant/UpdateRestaurant/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/review/detailreview","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Review\\/DetailReview\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}],[{"content":"DetailReview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Review/DetailReview.astro","pathname":"/Admin/Review/DetailReview","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/review/listreview","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Review\\/ListReview\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}],[{"content":"ListReview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Review/ListReview.astro","pathname":"/Admin/Review/ListReview","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/user/createuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/CreateUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"CreateUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/CreateUser.astro","pathname":"/Admin/User/CreateUser","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/user/detailuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/DetailUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"DetailUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/DetailUser.astro","pathname":"/Admin/User/DetailUser","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const s=window.location.pathname;document.querySelectorAll(\".sidebar-list-item\").forEach(e=>{const t=e.querySelector(\"a\");t&&t.getAttribute(\"href\")===s?e.classList.add(\"active\"):e.classList.remove(\"active\")})});\n"}],"styles":[],"routeData":{"route":"/admin/user/listuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/ListUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"ListUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/ListUser.astro","pathname":"/Admin/User/ListUser","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/user/updateuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/UpdateUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"UpdateUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/UpdateUser.astro","pathname":"/Admin/User/UpdateUser","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.dNSTbIj1.js"}],"styles":[],"routeData":{"route":"/customer/blog","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Blog\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Blog.astro","pathname":"/Customer/Blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.dNSTbIj1.js"}],"styles":[],"routeData":{"route":"/customer/home","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Home\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Home.astro","pathname":"/Customer/Home","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/bootsnav","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/bootsnav\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"bootsnav","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/bootsnav.js","pathname":"/Customer/js/bootsnav","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/bootstrap.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/bootstrap\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"bootstrap.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/bootstrap.min.js","pathname":"/Customer/js/bootstrap.min","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/custom","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/custom\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"custom","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/custom.js","pathname":"/Customer/js/custom","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/feather.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/feather\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"feather.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/feather.min.js","pathname":"/Customer/js/feather.min","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/jquery","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/jquery\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"jquery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/jquery.js","pathname":"/Customer/js/jquery","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/jquery.counterup.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/jquery\\.counterup\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"jquery.counterup.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/jquery.counterup.min.js","pathname":"/Customer/js/jquery.counterup.min","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/slick.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/slick\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"slick.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/slick.min.js","pathname":"/Customer/js/slick.min","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/waypoints.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/waypoints\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"waypoints.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/waypoints.min.js","pathname":"/Customer/js/waypoints.min","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.dNSTbIj1.js"}],"styles":[],"routeData":{"route":"/customer/profile","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Profile\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Profile.astro","pathname":"/Customer/Profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/register","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Register\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Register.astro","pathname":"/Customer/Register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.HPCGy_0V.js"}],"styles":[{"type":"inline","content":".restaurant-info[data-astro-cid-qp6gdojp]{text-align:center;margin-bottom:20px}.restaurant-info[data-astro-cid-qp6gdojp] img[data-astro-cid-qp6gdojp]{max-width:100%;height:auto}.review-form[data-astro-cid-qp6gdojp]{max-width:600px;margin:0 auto;padding:20px;border:1px solid #ddd;border-radius:5px}\n"}],"routeData":{"route":"/customer/review","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Review\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Review.astro","pathname":"/Customer/Review","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/eventhandler","isIndex":false,"type":"endpoint","pattern":"^\\/EventHandler\\/?$","segments":[[{"content":"EventHandler","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/EventHandler.ts","pathname":"/EventHandler","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",()=>{const a=document.getElementById(\"login-form\"),s=document.getElementById(\"btn-submit\");a.addEventListener(\"submit\",async e=>{e.preventDefault();const t=new FormData(a),n={username:t.get(\"username\"),password:t.get(\"password\")};await o(n)}),s?.addEventListener(\"click\",async()=>{await o({username:\"dangthanhquy\",password:\"dangthanhquy\"})});async function o(e){try{const t=await fetch(\"https://foo.dangthanhquy.io.vn/api/Authentication/Login\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(e)});if(!t.ok)throw t.status===415?new Error(\"Unsupported Media Type. Vui lòng kiểm tra header Content-Type.\"):new Error(\"Network response was not ok\");const n=await t.json();localStorage.setItem(\"accessToken\",n.token),alert(\"Đăng nhập thành công!\")}catch(t){console.error(\"Có lỗi xảy ra trong quá trình fetch:\",t),alert(\"Đăng nhập thất bại! that bai me roi\")}}});\n"}],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/Login\\/?$","segments":[[{"content":"Login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Login.astro","pathname":"/Login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/restaurant/register","isIndex":false,"type":"page","pattern":"^\\/Restaurant\\/Register\\/?$","segments":[[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"Register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Restaurant/Register.astro","pathname":"/Restaurant/Register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/restaurant/viewsearching","isIndex":false,"type":"page","pattern":"^\\/Restaurant\\/ViewSearching\\/?$","segments":[[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"ViewSearching","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Restaurant/ViewSearching.astro","pathname":"/Restaurant/ViewSearching","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/user/user","isIndex":false,"type":"page","pattern":"^\\/User\\/user\\/?$","segments":[[{"content":"User","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/User/user.astro","pathname":"/User/user","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Blog.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Home.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Review.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Index.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/CreateRestaurant.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/Detail/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/ListRestaurant.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/UpdateRestaurant/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/DetailReview.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/ListReview.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/DetailUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/ListUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Login.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Register.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Restaurant/Register.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/UpdateUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/Admin/User/CreateUser.astro":"chunks/pages/CreateUser_BaC4_xk5.mjs","/src/pages/Admin/Review/DetailReview.astro":"chunks/pages/DetailReview_gXTpEy_b.mjs","/src/pages/Admin/User/DetailUser.astro":"chunks/pages/DetailUser_BUqq5iNX.mjs","/src/pages/EventHandler.ts":"chunks/pages/EventHandler_H7QHJ6rg.mjs","/src/pages/Customer/Home.astro":"chunks/pages/Home_PQEpHYzJ.mjs","/src/pages/Admin/Index.astro":"chunks/pages/Index_DD8DbMt7.mjs","/src/pages/Admin/Restaurant/ListRestaurant.astro":"chunks/pages/ListRestaurant_Di4xvejO.mjs","/src/pages/Admin/Review/ListReview.astro":"chunks/pages/ListReview_D3CPm5eW.mjs","/src/pages/Admin/User/ListUser.astro":"chunks/pages/ListUser_t-Vuprxj.mjs","/src/pages/Login.astro":"chunks/pages/Login_Du-wUVfE.mjs","/src/pages/Customer/Profile.astro":"chunks/pages/Profile_CesfzQAE.mjs","/src/pages/Customer/Review.astro":"chunks/pages/Review_K4RTNZSo.mjs","/src/pages/Admin/User/UpdateUser.astro":"chunks/pages/UpdateUser_Dy08mOTc.mjs","/src/pages/Restaurant/ViewSearching.astro":"chunks/pages/ViewSearching_7aQ2r2ga.mjs","/src/pages/Customer/js/bootsnav.js":"chunks/pages/bootsnav_q6KNjMr-.mjs","/src/pages/Customer/js/bootstrap.min.js":"chunks/pages/bootstrap_BYl6i6Mz.mjs","/src/pages/Customer/js/custom.js":"chunks/pages/custom_DVu60GD7.mjs","/src/pages/Customer/js/feather.min.js":"chunks/pages/feather_BgQwoU6a.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BYFuHS8i.mjs","/src/pages/index.astro":"chunks/pages/index_BTdYjaAO.mjs","/src/pages/Customer/js/jquery.counterup.min.js":"chunks/pages/jquery_Bg0kEwC-.mjs","/src/pages/Customer/js/jquery.js":"chunks/pages/jquery_BUAx0wAO.mjs","/src/pages/Customer/js/slick.min.js":"chunks/pages/slick_Bx0DUz1h.mjs","/src/pages/User/user.astro":"chunks/pages/user_Duc-Pnyy.mjs","/src/pages/Customer/js/waypoints.min.js":"chunks/pages/waypoints_BFe3Zbqp.mjs","\u0000@astrojs-manifest":"manifest_D34k9ttu.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_wdhU3J6O.mjs","\u0000@astro-page:src/pages/Admin/Index@_@astro":"chunks/Index_vEIZISxN.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/CreateRestaurant@_@astro":"chunks/CreateRestaurant_Dk5txXUb.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/Detail/[id]@_@astro":"chunks/_id__DVf_Su63.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/ListRestaurant@_@astro":"chunks/ListRestaurant_BesD5p-x.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/UpdateRestaurant/[id]@_@astro":"chunks/_id__C6rXGNsA.mjs","\u0000@astro-page:src/pages/Admin/Review/DetailReview@_@astro":"chunks/DetailReview_DhMLjKsu.mjs","\u0000@astro-page:src/pages/Admin/Review/ListReview@_@astro":"chunks/ListReview_BzErUu7C.mjs","\u0000@astro-page:src/pages/Admin/User/CreateUser@_@astro":"chunks/CreateUser_CZoVOBjD.mjs","\u0000@astro-page:src/pages/Admin/User/DetailUser@_@astro":"chunks/DetailUser_DMxk8nwy.mjs","\u0000@astro-page:src/pages/Admin/User/ListUser@_@astro":"chunks/ListUser_Cosjj0aA.mjs","\u0000@astro-page:src/pages/Admin/User/UpdateUser@_@astro":"chunks/UpdateUser_BWqniG4-.mjs","\u0000@astro-page:src/pages/Customer/Blog@_@astro":"chunks/Blog_5VOaByH0.mjs","\u0000@astro-page:src/pages/Customer/Home@_@astro":"chunks/Home_C2sbhlH-.mjs","\u0000@astro-page:src/pages/Customer/js/bootsnav@_@js":"chunks/bootsnav_CflsfF_p.mjs","\u0000@astro-page:src/pages/Customer/js/bootstrap.min@_@js":"chunks/bootstrap_Ci6LqLx_.mjs","\u0000@astro-page:src/pages/Customer/js/custom@_@js":"chunks/custom_C9OvunQl.mjs","\u0000@astro-page:src/pages/Customer/js/feather.min@_@js":"chunks/feather_0jjCPrC-.mjs","\u0000@astro-page:src/pages/Customer/js/jquery@_@js":"chunks/jquery_D6wYv_Z-.mjs","\u0000@astro-page:src/pages/Customer/js/jquery.counterup.min@_@js":"chunks/jquery.counterup_Cdb4Syyt.mjs","\u0000@astro-page:src/pages/Customer/js/slick.min@_@js":"chunks/slick_A1lv9YU-.mjs","\u0000@astro-page:src/pages/Customer/js/waypoints.min@_@js":"chunks/waypoints_C5q-yRQU.mjs","\u0000@astro-page:src/pages/Customer/Profile@_@astro":"chunks/Profile_DTCTpxBC.mjs","\u0000@astro-page:src/pages/Customer/Register@_@astro":"chunks/Register_DhYUq8xH.mjs","\u0000@astro-page:src/pages/Customer/Review@_@astro":"chunks/Review_VzpKUI70.mjs","\u0000@astro-page:src/pages/EventHandler@_@ts":"chunks/EventHandler_BSMG0lCd.mjs","\u0000@astro-page:src/pages/Login@_@astro":"chunks/Login_D7VTsOtO.mjs","\u0000@astro-page:src/pages/Restaurant/Register@_@astro":"chunks/Register_B0z4RKMO.mjs","\u0000@astro-page:src/pages/Restaurant/ViewSearching@_@astro":"chunks/ViewSearching_D4O5fmPG.mjs","\u0000@astro-page:src/pages/User/user@_@astro":"chunks/user_CTgOFB43.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BPiQPIRY.mjs","/astro/hoisted.js?q=3":"_astro/hoisted.dNSTbIj1.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cnva6Tvz.js","/astro/hoisted.js?q=1":"_astro/hoisted.vVdNbsVM.js","/astro/hoisted.js?q=0":"_astro/hoisted.HPCGy_0V.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/assets/fine_dining_background_3.jpg","/assets/fine_dinning_background.jpg","/assets/fine_dinning_background_2.jpg","/assets/logo_brand.jpg","/js/Admin.js","/_astro/customerlayout.astro_astro_type_script_index_10_lang.DJW51OoX.js","/_astro/hoisted.dNSTbIj1.js","/_astro/hoisted.HPCGy_0V.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
