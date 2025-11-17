const section = document.querySelector("section");
const main = document.querySelector("main");
const plus = document.querySelector(".plus");
const formulaire = document.querySelector(".formulaire");
const divPlus = document.querySelector(".divPlus");

plus.addEventListener("click", () => {
    formulaire.classList.remove("hidden");
});

// Prévisualisation de l’image du formulaire
const lien = document.querySelector(".lien");
const imgDiv = document.querySelector(".imgDiv");

lien.addEventListener("input", () => {
    imgDiv.style.backgroundImage = `url('${lien.value}')`;
    imgDiv.style.backgroundSize = "cover";
    imgDiv.style.backgroundPosition = "center";
});

// Récupération des données du formulaire
const employees = [];
const UnassignedDivs = [];
const submit = document.querySelector(".submit");

submit.addEventListener("click", (evenement) => {

    evenement.preventDefault();
    formulaire.classList.add("hidden");

    const employe = {
        image: lien.value,
        nom: document.querySelector(".nom").value,
        role: document.querySelector(".role").value,
        email: document.querySelector(".email").value,
        telephone: document.querySelector(".tel").value,
        experiences: document.querySelector(".number").value,
        location: document.querySelector(".location").value
    };

    employees.push(employe);
    formulaire.reset();
});