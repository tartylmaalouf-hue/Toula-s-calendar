const h_depart = 7;
const h_fin = 22;
const px_per_min = 1;

let evenements = [];
window.API.getEvents().then(function(resultat){ 
    evenements = resultat;
    maintenant = new Date();
    mtnjoursem = maintenant.getDay();
    document.getElementById([jours[mtnjoursem]]).style.backgroundColor = "#FFDDEE"
    afficherjour(mtnjoursem);
});


function dateVersPixels(date) {
    const minutes = date.getHours() * 60 + date.getMinutes();
    const pixels = (minutes - h_depart * 60) * px_per_min;
    return pixels;
}

function tailleenPixels(evenement) {
    const debutPixels = dateVersPixels(evenement.debut);
    const finPixels = dateVersPixels(evenement.fin);
    return finPixels - debutPixels;
}
 
const heures = document.getElementById("heures");

function afficherevenement(listeevenement){
    for (const evenement of listeevenement) {
        const debutPixels = dateVersPixels(evenement.debut)
        const tailleCase = tailleenPixels(evenement)

        const blockevent = document.createElement("div");

        blockevent.classList.add("evenement");

        blockevent.style.top = debutPixels + "px";
        blockevent.style.height = tailleCase + "px";

        const titreEl = document.createElement("div");
        titreEl.textContent = evenement.titre;

        const salleEl = document.createElement("div");
        salleEl.textContent = evenement.salle;

        blockevent.appendChild(titreEl);
        blockevent.appendChild(salleEl);

        heures.appendChild(blockevent);
    }
}

const jours = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

function viderelement(){
    const ancien = document.querySelectorAll(".evenement");
    for (const el of ancien){
        el.remove()};
}


function afficherbarreh(jour){
    const maintenant = new Date();
    const barreh = document.getElementById("barreh");
    if (maintenant.getDay() == jour) {
        barreh.style.borderBlockColor = "#ff73f3"
        barreh.style.top = dateVersPixels(maintenant) + "px";
    }
    else{barreh.style.borderBlockColor = "transparent";

    }
}

function afficherjour(jour){
    viderelement();
    const evenementsdujour = evenements.filter(function(evenement){
        return evenement.debut.getDay() === jour;
    })
    afficherbarreh(jour);
    return afficherevenement(evenementsdujour);
    
}


document.getElementById("monday").addEventListener("click", function() {
  afficherjour(1);
    for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
    document.getElementById([jours[1]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("tuesday").addEventListener("click", function() {
  afficherjour(2);
    for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
    document.getElementById([jours[2]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("wednesday").addEventListener("click", function() {
  afficherjour(3);
    for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
    document.getElementById([jours[3]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("thursday").addEventListener("click", function() {
  afficherjour(4);
  for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
    document.getElementById([jours[4]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("friday").addEventListener("click", function() {
  afficherjour(5);
  for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
  document.getElementById([jours[5]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("saturday").addEventListener("click", function() {
  afficherjour(6);
  for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
  document.getElementById([jours[6]]).style.backgroundColor = "#FFDDEE";
}
});

document.getElementById("sunday").addEventListener("click", function() {
  afficherjour(0);
  for (const element of jours){
        document.getElementById([element]).style.backgroundColor = "#FFFFFF";
  document.getElementById([jours[0]]).style.backgroundColor = "#FFDDEE";
}
});

function mettreajourheure(){
    const maintenant = new Date();
    const mtnheure =  maintenant.getHours();
    const mtnminute = maintenant.getMinutes();
    if (mtnheure < 10){
        document.getElementById("heure_actuelle").textContent = "0" + mtnheure;
    }
    else{
        document.getElementById("heure_actuelle").textContent = mtnheure;
    }
    if (mtnminute < 10) {
        document.getElementById("minute_actuelle").textContent = "0" + mtnminute;
        } 
    else {
        document.getElementById("minute_actuelle").textContent = mtnminute;
        }
    }

mettreajourheure();
setInterval(mettreajourheure, 1000);


function mettreajourdate(){
    const maintenant = new Date();
    const mtndate = maintenant.getDate();
    const mtnannee = maintenant.getFullYear();

    const jours = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
    const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."];


    document.getElementById("jour_semaine_actuel").textContent=jours[maintenant.getDay()];
    document.getElementById("jour_actuel").textContent=mtndate;
    document.getElementById("mois_actuel").textContent=mois[maintenant.getMonth()];
    document.getElementById("année_actuelle").textContent=mtnannee;

}

mettreajourdate();
setInterval(mettreajourdate, 1000);



            

