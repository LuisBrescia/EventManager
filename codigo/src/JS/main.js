/*
> Seria interessante algo como: 
> aside = conteudo aside da página
> $('.telaInteira').prepend(aside);
*/

import { ROUTES } from "../router/routes.js";

// redirecionar para /Listas
window.location.href = "/Listas";

// export function clearScript(src) {
//   const script = document.createElement("script");
//   script.src = src;
//   script.type = "module";
//   setTimeout(() => {
//     document?.body?.removeChild?.(script);
//   });
// }

// export function loadScript(src) {
//   const script = document.createElement("script");
//   script.src = src;
//   script.type = "module";
//   document.body.appendChild(script);
//   window.addEventListener("locationchange", clearScript(script));
// }

// function extractAndLoadScripts(html) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, "text/html");
//   const scriptTags = doc.body.getElementsByTagName("script");

//   const loadPromises = [];
//   for (let scriptTag of scriptTags) {
//     if (scriptTag.src) {
//       loadPromises.push(loadScript(scriptTag.src));
//     }
//   }

//   return Promise.all(loadPromises);
// }

// async function renderContent(route) {
//   console.log("caiu no main.js");
//   const container = document.getElementById("app");
//   let fileName = ROUTES[route];

//   if (!fileName) {
//     // If no match is found, check for dynamic routes
//     for (const dynamicRoute in ROUTES) {
//       if (new RegExp(dynamicRoute).test(route) && dynamicRoute !== "/") {
//         fileName = ROUTES[dynamicRoute];
//         break;
//       }
//     }
//   }

//   if (fileName) {
//     const html = await fetch(fileName)
//       .then((response) => response.text())
//       .catch((error) => {
//         console.error("Error loading HTML file:", error);
//       });
//     extractAndLoadScripts(html);
//     container.innerHTML = html;
//   } else {
//     console.log("errorr routing");
//     // Handle 404 or other cases as needed
//     container.innerHTML = "Page not found";
//   }
// }

// function handleRouteChange() {
//   const currentRoute = window.location.pathname;
//   console.log(currentRoute);
//   renderContent(currentRoute);
//   window.scrollTo(0, 0);
//   history.pushState(null, null, currentRoute);
// }

// window.addEventListener("popstate", handleRouteChange);
// window.addEventListener("load", handleRouteChange);
// window.onhashchange = handleRouteChange;
