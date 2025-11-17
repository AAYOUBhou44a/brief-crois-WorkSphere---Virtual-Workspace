const section = document.querySelector("section");
const main = document.querySelector("main");
const plus = document.querySelector(".plus");
const formulaire = document.querySelector(".formulaire");
const divPlus = document.querySelector(".divPlus");

plus.addEventListener("click", () => {
    formulaire.classList.remove("hidden");
});