const description = document.querySelector(".description");
const redirectBtn = document.querySelector(".redirect");
const createAgainBtn = document.querySelector(".create_again");
const modal = document.querySelector(".modal");

description.defaultValue =
  description.dataset.description != undefined
    ? description.dataset.description
    : "";

redirectBtn.addEventListener("click", () => {
  window.location.replace("/blogs");
  document.body.style.height = "100%";
  document.body.style.overflow = "unset";
});

createAgainBtn.addEventListener("click", () => {
  window.location.replace("/generate");
  document.body.style.height = "100%";
  document.body.style.overflow = "unset";
});

if (modal !== null) {
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
}
