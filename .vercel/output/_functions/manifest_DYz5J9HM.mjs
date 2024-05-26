import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_B3nhgXvA.mjs';
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

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"Admin/Index/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/index","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Index\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Index","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Index.astro","pathname":"/Admin/Index","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/Restaurant/CreateRestaurant/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/restaurant/createrestaurant","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/CreateRestaurant\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"CreateRestaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Restaurant/CreateRestaurant.astro","pathname":"/Admin/Restaurant/CreateRestaurant","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/Restaurant/ListRestaurant/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/restaurant/listrestaurant","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Restaurant\\/ListRestaurant\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"ListRestaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Restaurant/ListRestaurant.astro","pathname":"/Admin/Restaurant/ListRestaurant","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/Review/DetailReview/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/review/detailreview","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Review\\/DetailReview\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}],[{"content":"DetailReview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Review/DetailReview.astro","pathname":"/Admin/Review/DetailReview","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/Review/ListReview/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/review/listreview","isIndex":false,"type":"page","pattern":"^\\/Admin\\/Review\\/ListReview\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}],[{"content":"ListReview","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/Review/ListReview.astro","pathname":"/Admin/Review/ListReview","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/User/CreateUser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/user/createuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/CreateUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"CreateUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/CreateUser.astro","pathname":"/Admin/User/CreateUser","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/User/DetailUser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/user/detailuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/DetailUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"DetailUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/DetailUser.astro","pathname":"/Admin/User/DetailUser","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/User/ListUser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/user/listuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/ListUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"ListUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/ListUser.astro","pathname":"/Admin/User/ListUser","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Admin/User/UpdateUser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/user/updateuser","isIndex":false,"type":"page","pattern":"^\\/Admin\\/User\\/UpdateUser\\/?$","segments":[[{"content":"Admin","dynamic":false,"spread":false}],[{"content":"User","dynamic":false,"spread":false}],[{"content":"UpdateUser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Admin/User/UpdateUser.astro","pathname":"/Admin/User/UpdateUser","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/Blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/blog","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Blog\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Blog.astro","pathname":"/Customer/Blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/Home/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/home","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Home\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Home.astro","pathname":"/Customer/Home","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/bootsnav","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/bootsnav","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/bootsnav\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"bootsnav","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/bootsnav.js","pathname":"/Customer/js/bootsnav","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/bootstrap.min","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/bootstrap.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/bootstrap\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"bootstrap.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/bootstrap.min.js","pathname":"/Customer/js/bootstrap.min","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/custom","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/custom","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/custom\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"custom","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/custom.js","pathname":"/Customer/js/custom","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/feather.min","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/feather.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/feather\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"feather.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/feather.min.js","pathname":"/Customer/js/feather.min","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/jquery","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/jquery","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/jquery\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"jquery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/jquery.js","pathname":"/Customer/js/jquery","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/jquery.counterup.min","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/jquery.counterup.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/jquery\\.counterup\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"jquery.counterup.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/jquery.counterup.min.js","pathname":"/Customer/js/jquery.counterup.min","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/slick.min","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/slick.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/slick\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"slick.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/slick.min.js","pathname":"/Customer/js/slick.min","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/js/waypoints.min","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/js/waypoints.min","isIndex":false,"type":"endpoint","pattern":"^\\/Customer\\/js\\/waypoints\\.min\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"js","dynamic":false,"spread":false}],[{"content":"waypoints.min","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/js/waypoints.min.js","pathname":"/Customer/js/waypoints.min","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/Profile/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/profile","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Profile\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Profile.astro","pathname":"/Customer/Profile","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/Register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/register","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Register\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Register.astro","pathname":"/Customer/Register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Customer/Review/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/customer/review","isIndex":false,"type":"page","pattern":"^\\/Customer\\/Review\\/?$","segments":[[{"content":"Customer","dynamic":false,"spread":false}],[{"content":"Review","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Customer/Review.astro","pathname":"/Customer/Review","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"EventHandler","links":[],"scripts":[],"styles":[],"routeData":{"route":"/eventhandler","isIndex":false,"type":"endpoint","pattern":"^\\/EventHandler\\/?$","segments":[[{"content":"EventHandler","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/EventHandler.ts","pathname":"/EventHandler","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/Login\\/?$","segments":[[{"content":"Login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Login.astro","pathname":"/Login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Restaurant/Register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/restaurant/register","isIndex":false,"type":"page","pattern":"^\\/Restaurant\\/Register\\/?$","segments":[[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"Register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Restaurant/Register.astro","pathname":"/Restaurant/Register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"Restaurant/ViewSearching/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/restaurant/viewsearching","isIndex":false,"type":"page","pattern":"^\\/Restaurant\\/ViewSearching\\/?$","segments":[[{"content":"Restaurant","dynamic":false,"spread":false}],[{"content":"ViewSearching","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Restaurant/ViewSearching.astro","pathname":"/Restaurant/ViewSearching","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"User/user/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/user/user","isIndex":false,"type":"page","pattern":"^\\/User\\/user\\/?$","segments":[[{"content":"User","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/User/user.astro","pathname":"/User/user","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Index.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/CreateRestaurant.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/Detail/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/ListRestaurant.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Restaurant/UpdateRestaurant/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/DetailReview.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/Review/ListReview.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/CreateUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/DetailUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/ListUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Admin/User/UpdateUser.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Blog.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Home.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Review.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Customer/Register.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Login.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/Restaurant/Register.astro",{"propagation":"none","containsHead":true}],["C:/Users/phhoa/OneDrive/Desktop/FE-Mock/FooDrink-UI/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_ot_jHJUH.mjs","\u0000@astrojs-manifest":"manifest_DYz5J9HM.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DemaZ-3q.mjs","\u0000@astro-page:src/pages/Admin/Index@_@astro":"chunks/Index_CVhf_tZ_.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/CreateRestaurant@_@astro":"chunks/CreateRestaurant_wYM50deO.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/Detail/[id]@_@astro":"chunks/_id__DZ7gJ-WN.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/ListRestaurant@_@astro":"chunks/ListRestaurant_C4Wn0_sK.mjs","\u0000@astro-page:src/pages/Admin/Restaurant/UpdateRestaurant/[id]@_@astro":"chunks/_id__XHeppFPR.mjs","\u0000@astro-page:src/pages/Admin/Review/DetailReview@_@astro":"chunks/DetailReview_CgT8EHgW.mjs","\u0000@astro-page:src/pages/Admin/Review/ListReview@_@astro":"chunks/ListReview_CBhQjrIJ.mjs","\u0000@astro-page:src/pages/Admin/User/CreateUser@_@astro":"chunks/CreateUser_DURIj2kr.mjs","\u0000@astro-page:src/pages/Admin/User/DetailUser@_@astro":"chunks/DetailUser_Bz6bimVy.mjs","\u0000@astro-page:src/pages/Admin/User/ListUser@_@astro":"chunks/ListUser_DEsNDKA1.mjs","\u0000@astro-page:src/pages/Admin/User/UpdateUser@_@astro":"chunks/UpdateUser_DUeAtP2m.mjs","\u0000@astro-page:src/pages/Customer/Blog@_@astro":"chunks/Blog_DEof_zui.mjs","\u0000@astro-page:src/pages/Customer/Home@_@astro":"chunks/Home_mUYOxxq-.mjs","\u0000@astro-page:src/pages/Customer/js/bootsnav@_@js":"chunks/bootsnav_ZCJI9lN6.mjs","\u0000@astro-page:src/pages/Customer/js/bootstrap.min@_@js":"chunks/bootstrap_Dk6meKhQ.mjs","\u0000@astro-page:src/pages/Customer/js/custom@_@js":"chunks/custom_BNRp3Iqg.mjs","\u0000@astro-page:src/pages/Customer/js/feather.min@_@js":"chunks/feather_Cj8-yw0G.mjs","\u0000@astro-page:src/pages/Customer/js/jquery@_@js":"chunks/jquery_mIhxM-AK.mjs","\u0000@astro-page:src/pages/Customer/js/jquery.counterup.min@_@js":"chunks/jquery.counterup_BTGh4shf.mjs","\u0000@astro-page:src/pages/Customer/js/slick.min@_@js":"chunks/slick_C5acrxPq.mjs","\u0000@astro-page:src/pages/Customer/js/waypoints.min@_@js":"chunks/waypoints_BqSU1nbv.mjs","\u0000@astro-page:src/pages/Customer/Profile@_@astro":"chunks/Profile_CEfE3tOU.mjs","\u0000@astro-page:src/pages/Customer/Register@_@astro":"chunks/Register_6GMQFbBF.mjs","\u0000@astro-page:src/pages/Customer/Review@_@astro":"chunks/Review_BzdU9PZK.mjs","\u0000@astro-page:src/pages/EventHandler@_@ts":"chunks/EventHandler_JWcCAGo5.mjs","\u0000@astro-page:src/pages/Login@_@astro":"chunks/Login_CS1SlOcG.mjs","\u0000@astro-page:src/pages/Restaurant/Register@_@astro":"chunks/Register_BsAfK9h4.mjs","\u0000@astro-page:src/pages/Restaurant/ViewSearching@_@astro":"chunks/ViewSearching_Ba_br45m.mjs","\u0000@astro-page:src/pages/User/user@_@astro":"chunks/user_tOzjYAD7.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Be5Idwbd.mjs","/astro/hoisted.js?q=3":"_astro/hoisted.dNSTbIj1.js","/astro/hoisted.js?q=0":"_astro/hoisted.HPCGy_0V.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cnva6Tvz.js","/astro/hoisted.js?q=1":"_astro/hoisted.vVdNbsVM.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/assets/fine_dining_background_3.jpg","/assets/fine_dinning_background.jpg","/assets/fine_dinning_background_2.jpg","/assets/logo_brand.jpg","/js/Admin.js","/_astro/customerlayout.astro_astro_type_script_index_10_lang.DJW51OoX.js","/_astro/hoisted.dNSTbIj1.js","/_astro/hoisted.HPCGy_0V.js","/Admin/Index/index.html","/Admin/Restaurant/CreateRestaurant/index.html","/Admin/Restaurant/ListRestaurant/index.html","/Admin/Review/DetailReview/index.html","/Admin/Review/ListReview/index.html","/Admin/User/CreateUser/index.html","/Admin/User/DetailUser/index.html","/Admin/User/ListUser/index.html","/Admin/User/UpdateUser/index.html","/Customer/Blog/index.html","/Customer/Home/index.html","/Customer/js/bootsnav","/Customer/js/bootstrap.min","/Customer/js/custom","/Customer/js/feather.min","/Customer/js/jquery","/Customer/js/jquery.counterup.min","/Customer/js/slick.min","/Customer/js/waypoints.min","/Customer/Profile/index.html","/Customer/Register/index.html","/Customer/Review/index.html","/EventHandler","/Login/index.html","/Restaurant/Register/index.html","/Restaurant/ViewSearching/index.html","/User/user/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
