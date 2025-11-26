const section = document.querySelector("section");
const main = document.querySelector("main");
const plus = document.querySelector(".plus");
const formulaire = document.querySelector(".formulaire");
const divPlus = document.querySelector(".divPlus");

const nom = document.querySelector(".nom");
const role = document.querySelector(".role");
const tel = document.querySelector(".tel");
const email = document.querySelector(".email");

const statuus = document.querySelectorAll(".status");


plus.addEventListener("click", () => {
    formulaire.classList.remove("hidden");
    nom.focus();
});

const tableauExperiences = []; 
// l'ajout des éxeperiences dans le formulaire 
const boutton = document.querySelector("button");
const experiences = document.querySelector(".experiences");
experiences.className = "flex flex-col gap-[20px]";
boutton.addEventListener("click", ()=>{

    const experience = document.createElement("div");
    experience.className = "experience flex flex-col gap-[10px]";
    experiences.appendChild(experience);
    
    experience.innerHTML = `
            <div class="border border-[2px] border-[#1E93AB]"></div>
            <label for="entreprise" class="text-[#1E93AB] font-bold">l'entreprise</label>
            <input class="entreprise h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" type="text" id="entreprise">
            
            <label for="dateStart" class=" text-[#1E93AB] font-bold">la date de début</label>
            <input type="date" class="dateStart h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" id="dateStart">
            
            <label for="dateEnd" class=" text-[#1E93AB] font-bold">la date de la fin</label>
            <input type="date" class="dateEnd h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" id="dateEnd">
            
            <label for="roleEx" class="text-[#1E93AB] font-bold">role</label>
            <input class="roleEx h-[35px] rounded border border-[#1E93AB] border-[2px] pl-[5px]" type="text" id="role">
    `;
})
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
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if(!nameRegex.test(nameValue)){
            alert("nom Invalid");
            nom.classList.add("border-red-500");
            return; 
        }
        
        const roleValue = document.querySelector(".role").value;
        
        const emailValue = document.querySelector(".email").value;
        const emailRegex = /^[\w.-]{2,30}@gmail\.com$/;
        if(!emailRegex.test(emailValue)){
                alert("email Invalid");
                email.classList.add("border-red-500");
                return; 
    }
    
    const telValue = document.querySelector(".tel").value;
    const telRegex = /^[0-9]{10,20}$/;
    
    if(!telRegex.test(telValue)){
            alert("numéro de téléphone Invalid");
            tel.classList.add("border-red-500");
            return; 
        }
        
        // récupération des valeurs des inputs ( experiences) 
        document.querySelectorAll(".experience").forEach(expr =>{
            
            const entrepriseValeur = expr.querySelector(".entreprise").value;
            const dateStartValeur = expr.querySelector(".dateStart").value;
            const dateEndValeur = expr.querySelector(".dateEnd").value;
            const roleExValeur = expr.querySelector(".roleEx").value;
            
            const experience = {
                    entreprise: entrepriseValeur,
                    dateStart: dateStartValeur,
                    dateEnd: dateEndValeur,
                    roleEx: roleExValeur
                }
            tableauExperiences.push(experience);
        })
            
        
        formulaire.classList.add("hidden");
        
        const employe = {
            image: lien.value,
            nom: nameValue,
            role: roleValue,
            email: emailValue,
            telephone: telValue,
            localisation : "réception",
            experiences:tableauExperiences
        };
        console.log(employe.experiences);
        
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
        zoneStatus();
    })


            // affichage des information 

                const affichage = document.createElement("i");
                affichage.className = "fa-solid fa-info text-red-600 m-[4px] cursor-pointer";
                
                personne.appendChild(affichage);
                affichage.addEventListener("click", ()=>{
                    const divInforamtion = document.createElement("div");
            divInforamtion.className = "relative z-[1000] p-[20px] gap-[10px] flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[500px] min-w-[300px] bg-gray-300 rounded border border-[#1E93AB] text-sm";
            divInforamtion.innerHTML = `
            <div class="flex items-center gap-[20px] ">
                <div class="border rounded-[50%] h-[90px] w-[90px] bg-[url('${worker.image}')] bg-cover bg-center border-[#1E93AB] border-[2px] border-dashed"></div>
                <div>
                    <div class="nom">${worker.nom}</div>
                    <div class="role">${worker.role}</div>
                    </div>
                    </div>
            <div class="email flex justify-between">
            <h1 class="text-[#1E93AB] font-bold ">EMAIL :</h1>
                <h1>${worker.email}</h1>
            </div>
            <div class="telephone flex justify-between">
            <h1 class="text-[#1E93AB] font-bold ">TELEPHONE :</h1>
            <h1>${worker.telephone}</h1>
            </div>
            <div class="localisationActuelle flex justify-between">
                <h1 class="text-[#1E93AB] font-bold ">lOCALISATION ACTUELLE : </h1>
                <h1>${worker.localisation}</h1>
                </div>
                <div class="AffichageExperiences"></div>
                `;

const AffichageExperiences = divInforamtion.querySelector(".AffichageExperiences");

worker.experiences.forEach(exp => {
    const expDiv = document.createElement("div");
    expDiv.className = "flex flex-col gap-[2px] p-[5px] border-b border-gray-700";
    expDiv.innerHTML = `
        <div class="font-bold text-[#1E93AB]">Entreprise :</div>
        <div>${exp.entreprise}</div>
        <div class="font-bold text-[#1E93AB]">Role :</div>
        <div>${exp.roleEx}</div>
        <div class="font-bold text-[#1E93AB]">Durée :</div>
        <div>${exp.dateStart} - ${exp.dateEnd}</div>
    `;
    AffichageExperiences.appendChild(expDiv);
});



                const fermerInfos = document.createElement("div");
                fermerInfos.innerHTML = ` <div class="w-full h-full"><i class="fa-solid fa-x absolute top-[10px] right-[10px] text-red-500 font-bold text-xl cursor-pointer"></i></div>`;
    
                    fermerInfos.addEventListener("click",()=>{
                        divInforamtion.classList.add("hidden");
                    })
                divInforamtion.appendChild(fermerInfos);
                main.appendChild(divInforamtion);
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

                // worker.localisation = zone.dataset.nomZone;
                
                const emp = UnassignedDivs.indexOf(card);
                UnassignedDivs.splice(emp, 1);

                // UnassignedDivs.forEach(card => card.classList.add("h-[80px]"))
                UnassignedDivs.forEach(card => divPlus.before(card));
                // renvoyer les autres dans Unassigned
                zoneStatus();
            }
        });
    });
});

const fermerFormulaire = document.querySelector(".fermerFormulaire");
fermerFormulaire.addEventListener("click",()=>{
    formulaire.classList.add("hidden");
})





function zoneStatus() {
    Unassigned.forEach((un, index) => {

        if (un.children.length === 0) {
            statuus[index].classList.add("bg-red-300/50");
        } else {
            statuus[index].classList.remove("bg-red-300/50");
        }
    });
}
zoneStatus();