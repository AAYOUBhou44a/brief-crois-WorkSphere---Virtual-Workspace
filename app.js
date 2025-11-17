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

// Création de la carte de l’employé et envoi dans Unassigned
submit.addEventListener("click", () => {

    const employe = employees[employees.length - 1];

    const personne = document.createElement("div");
    personne.className = "w-full h-[80px] flex items-center justify-evenly bg-red-500";

    const imagePersonne = document.createElement("div");
    imagePersonne.className = `border rounded-[50%] h-[90%] w-[30%] bg-[url('${employe.image}')] bg-cover bg-center`;
    personne.appendChild(imagePersonne);

    const infos = document.createElement("div");
    infos.className = "flex gap-[20px]";
    infos.innerHTML = `
        <h1>${employe.nom}</h1>
        <h1>${employe.role}</h1>
    `;

    personne.appendChild(infos);

    UnassignedDivs.push(personne);
    divPlus.before(personne);
});