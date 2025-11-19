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
    personne.className = "w-full h-[80px] flex items-center justify-evenly bg-[#EFECE3] rounded border border-[#1E93AB] border-[2px] shadow-md shadow-black";

    const imagePersonne = document.createElement("div");

    imagePersonne.className = `border rounded-[50%] h-[90%] w-[30%] bg-[url('${employe.image}')] bg-cover bg-center border-[#1E93AB] border-[2px] border-dashed`;
    personne.appendChild(imagePersonne);

    const infos = document.createElement("div");
    infos.className = "flex flex-col";
    infos.innerHTML = `
        <h1 class="lg:text-[12px] md:text-[10px] ">${employe.nom}</h1>
        <h1 class="lg:text-[15px] md:text-[12px]">${employe.role}</h1>
    `;

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-delete-left text-red-600 cursor-pointer";

    
    personne.appendChild(infos);
    personne.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        UnassignedDivs.push(personne);
        divPlus.before(personne);
    })

    UnassignedDivs.push(personne);
    divPlus.before(personne);
});



// Affichage de la liste Unassigned dans la zone choisie
//  Sélection et placement d’un employé dans une zone

const plus2 = document.querySelectorAll(".plus2");
const Unassigned = document.querySelectorAll(".Unassigned");


plus2.forEach((btn, zoneIndex) => {

    btn.addEventListener("click", () => {

        const zone = Unassigned[zoneIndex];

        zone.classList.remove("hidden");
        Unassigned.forEach(card => card.classList.add("h-[20px]"))
        UnassignedDivs.forEach(card => zone.appendChild(card));
        UnassignedDivs.forEach((card) => {
            card.onclick = null;
            card.onclick = () => {

                // placer la personne dans la zone
                zone.appendChild(card);

                const emp = UnassignedDivs.indexOf(card);
                UnassignedDivs.splice(emp, 1);

                UnassignedDivs.forEach(card => divPlus.before(card));
                // renvoyer les autres dans Unassigned

            }
        });
    });
});