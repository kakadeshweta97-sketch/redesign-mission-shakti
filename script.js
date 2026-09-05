const pages = [...document.querySelectorAll(".page")];
const navLinks = [...document.querySelectorAll("[data-route]")];
const mainNav = document.getElementById("mainNav");
const menuButton = document.getElementById("menuButton");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const routes = {
  home: {title:"Home", text:"Mission Shakti Maharashtra home"},
  about: {title:"About Us", text:"About Mission Shakti and the redesigned information experience"},
  charter: {title:"Citizen Charter", text:"Citizen Charter documents and public-service commitments"},
  downloads: {title:"Downloads", text:"Useful documents and official resources"},
  rti: {title:"Right to Information", text:"Public information pathways"},
  rts: {title:"Right to Service", text:"Maharashtra Right to Public Services Act, 2015"},
  program: {title:"100 Day Programme", text:"Programme priorities and progress"},
  contact: {title:"Contact Us", text:"Department and office contact information"},
  search: {title:"Search", text:"Search results"}
};

function showRoute(route, push = false) {
  if (!routes[route]) route = "home";
  pages.forEach(page => page.classList.toggle("active", page.id === route));
  navLinks.forEach(link => link.classList.toggle("active", link.dataset.route === route));
  document.title = `${routes[route].title} | Mission Shakti Maharashtra`;
  mainNav.classList.remove("open");
  if (push && location.hash !== `#${route}`) location.hash = route;
  window.scrollTo({top:0, behavior:"smooth"});
}

function currentRoute() {
  return location.hash.replace("#","") || "home";
}

window.addEventListener("hashchange", () => showRoute(currentRoute()));
showRoute(currentRoute());

menuButton.addEventListener("click", () => mainNav.classList.toggle("open"));

let fontScale = 1;
document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "increase-font") fontScale = Math.min(fontScale + .08, 1.28);
    if (action === "decrease-font") fontScale = Math.max(fontScale - .08, .86);
    if (action === "reset-font") fontScale = 1;
    if (["increase-font","decrease-font","reset-font"].includes(action)) {
      document.documentElement.style.fontSize = `${fontScale}em`;
    }
    if (action === "screen-reader") {
      document.body.classList.toggle("screen-reader-mode");
      button.textContent = document.body.classList.contains("screen-reader-mode") ? "Reader On" : "Screen Reader Access";
    }
    if (action === "login") openModal("Citizen Login", "This project prototype includes a login entry point. Connect this button to your approved authentication system before production deployment.");
  });
});

document.getElementById("languageToggle").addEventListener("click", function() {
  const marathi = this.dataset.marathi === "true";
  if (!marathi) {
    this.dataset.marathi = "true";
    this.textContent = "English";
    document.querySelector('.brand .eyebrow').textContent = "महाराष्ट्र शासन";
    document.querySelector('.brand h1').textContent = "महिला व बाल विकास विभाग";
  } else {
    this.dataset.marathi = "false";
    this.textContent = "मराठी";
    document.querySelector('.brand .eyebrow').textContent = "Government of Maharashtra";
    document.querySelector('.brand h1').textContent = "Women & Child Development Department";
  }
});

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
document.getElementById("modalClose").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });

const searchable = [
  ["home","Mission Shakti Maharashtra","Start with the modern, image-led overview."],
  ["about","About Us","Mission purpose, values and approach."],
  ["charter","Citizen Charter","Find charter years and scheme-wise information."],
  ["downloads","Downloads","Official documents, guidance and resources."],
  ["rti","Right to Information","Public information pathways."],
  ["rts","Right to Service","Information about Maharashtra Right to Public Services."],
  ["program","100 Day Programme","Priorities and progress presentation."],
  ["contact","Contact Us","Mumbai and Pune office contact information."]
];

document.getElementById("siteSearch").addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  const query = e.target.value.trim().toLowerCase();
  const results = searchable.filter(item => item.join(" ").toLowerCase().includes(query));
  const box = document.getElementById("searchResults");
  document.getElementById("searchTitle").textContent = query ? `Results for “${e.target.value}”` : "Search the website";
  box.innerHTML = results.length
    ? results.map(([route,title,text]) => `<a class="result-item" href="#${route}"><h3>${title}</h3><p>${text}</p></a>`).join("")
    : `<div class="no-result">No exact page found. Try “service”, “charter”, “contact” or “Mission Shakti”.</div>`;
  location.hash = "search";
  showRoute("search");
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => setTimeout(() => showRoute(currentRoute()), 0));
});
