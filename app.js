const section = document.querySelector("section");
const main = document.querySelector("main");
const plus = document.querySelector(".plus");
const formulaire = document.querySelector(".formulaire");
const divPlus = document.querySelector(".divPlus");

const nom = document.querySelector(".nom");
const role = document.querySelector(".role");
const tel = document.querySelector(".tel");
const email = document.querySelector(".email");

Unassigned.forEach(un =>{
    if(un.children.length == 0){
        un.classList.add("bg-red-200 opacity-50");
    }
    else{
        un.classList.remove("bg-red-200 opacity-50");
    }
})

plus.addEventListener("click", () => {
    formulaire.classList.remove("hidden");
    nom.focus();
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


// Création de la carte de l’employé et envoi dans Unassigned
submit.addEventListener("click", (evenement) => {

    evenement.preventDefault();
    if(!formulaire.checkValidity()){
        formulaire.reportValidity();
        return;
    }
    const nameValue = document.querySelector(".nom").value;
    // const nameRegex = /^[a-zA-Z ]{2,30}$/;
    // if(!nameRegex.test(nameValue)){
        //     alert("nom Invalid");
        //     nom.classList.add("border-red-500");
        //     return; 
        // }
        
        const roleValue = document.querySelector(".role").value;
        
        const emailValue = document.querySelector(".email").value;
        // const emailRegex = /^[\w.-]{2,30}@gmail\.com$/;
        // if(!emailRegex.test(emailValue)){
            //     alert("email Invalid");
            //     email.classList.add("border-red-500");
            //     return; 
    // }
    
    const telValue = document.querySelector(".tel").value;
    // const telRegex = /^[0-9]{10,20}$/;
    
    // if(!telRegex.test(telValue)){
        //     alert("numéro de téléphone Invalid");
        //     tel.classList.add("border-red-500");
        //     return; 
        // }
        
        
        
        formulaire.classList.add("hidden");
        
        const employe = {
            image: lien.value,
            nom: nameValue,
            role: roleValue,
            email: emailValue,
            telephone: telValue,
        };
        
        employees.push(employe);
        formulaire.reset();


    // récupiration du dernier carte ajouté au tableau , pour afficher ces infomations dans la carte 
    const worker = employees[employees.length - 1];
    const personne = document.createElement("div");
    personne.className = "md:w-full w-[300px] h-[80px] flex items-center justify-evenly bg-[#EFECE3] rounded border border-[#1E93AB] border-[2px] shadow-md shadow-black";

    personne.dataset.role = worker.role;
    const imagePersonne = document.createElement("div");
    if(!worker.image)
    {worker.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
    imagePersonne.className = `border rounded-[50%] h-[90%] w-[30%] bg-[url('${worker.image}')] bg-cover bg-center border-[#1E93AB] border-[2px] border-dashed`;
    personne.appendChild(imagePersonne);

    const infos = document.createElement("div");
    infos.className = "flex flex-col";
    if(!worker.nom){
        worker.nom = "undefined";
    }
    infos.innerHTML = `
        <h1 class="lg:text-[12px] md:text-[10px] ">${worker.nom}</h1>
        <h1 class="lg:text-[15px] md:text-[12px]">${worker.role}</h1>
    `;

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-delete-left text-red-600 cursor-pointer";

    
    personne.appendChild(infos);
    personne.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        personne.classList.remove("bg-[#87BAC3]");
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
                if(zone.children.length ==3){
                    alert("la zone est plein!");
                    return;
                } 
        UnassignedDivs.forEach(card => zone.appendChild(card));
        UnassignedDivs.forEach((card) => {
            card.onclick = null;
            card.onclick = () => {

                const cardRole  = card.dataset.role;
                if(!zone.classList.contains(cardRole)){
                    alert("cette employe n'a pas l'autorisation d'entrer à cette chambre!")
                    return;
                }
                // placer la personne dans la zone
                zone.appendChild(card);
                card.classList.add("bg-[#87BAC3]");

                const emp = UnassignedDivs.indexOf(card);
                UnassignedDivs.splice(emp, 1);

                // UnassignedDivs.forEach(card => card.classList.add("h-[80px]"))
                UnassignedDivs.forEach(card => divPlus.before(card));
                // renvoyer les autres dans Unassigned

            }
        });
    });
});

const boutton = document.querySelector("button");

boutton.addEventListener("click", ()=>{

    const experience = document.createElement("div");
    experience.className = "experience flex flex-col gap-[10px]";
    boutton.before(experience);
    
    experience.innerHTML = `
            <div class="border border-[2px] border-[#1E93AB]></div>
            <label for="entreprise" class="text-[#1E93AB] font-bold">l'entreprise</label>
            <input class="entreprise h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" type="text" id="entreprise">
            
            <label for="dateStart" class="text-[#1E93AB] font-bold">la date de début</label>
            <input type="date" class="h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" id="dateStart">
            
            <label for="dateStart" class="text-[#1E93AB] font-bold">la date de la fin</label>
            <input type="date" class="h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" id="dateStart">
            
            <label for="role" class="text-[#1E93AB] font-bold">role</label>
            <input class="entreprise h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" type="text" id="role">
    `;
})

const fermerFormulaire = document.querySelector(".fermerFormulaire");
fermerFormulaire.addEventListener("click",()=>{
    formulaire.classList.add("hidden");
})
