/* =========================================================================
PIZZERIA ASYNC — SQUELETTE D'EXERCICE
=========================================================================
Lis attentivement chaque TODO et remplis les blocs correspondants.
Garde le README.md ouvert à côté pour la consigne complète.

Tu peux t'aider du dossier parent (01-, 02-, ..., 10-) pour réviser
les concepts au besoin.
========================================================================= */


// =====================================================================
// CONSTANTES & ÉTAT GLOBAL (déjà fait pour toi)
// =====================================================================

// Liste des garnitures possibles, choisies aléatoirement plus tard
const GARNITURES = ["jambon", "olives", "champignons", "poivrons", "oignons", "fromage", "tomate", "basilic"];

// Compteur incrémenté à chaque nouvelle commande (pour l'id)
let prochainId = 1;

// Compteurs pour les statistiques
const stats = {
  enCours: 0,
  livrees: 0,
  perdues: 0,
};




// =====================================================================
// TODO N°1 — Récupération des éléments du DOM
// =====================================================================
// Récupère et stocke dans des constantes :
//   - le <select id="type-pizza">
let slctPizza = document.getElementById("type-pizza")
//   - l'<input id="nb-garnitures">
let myInput = document.getElementById("nb-garnitures")
//   - le <button id="btn-commander">
const btnComm = document.getElementById("btn-commander")
//   - le <div id="liste-commandes">
const commande = document.getElementById("liste-commandes")
//   - le <div id="journal">
const journal = document.getElementById("journal")
//   - les trois compteurs : #stat-cours, #stat-livrees, #stat-perdues
const statCours = document.getElementById("stat-cours")
const statDeliver = document.getElementById("stat-livrees")
const statLost = document.getElementById("stat-perdues")


// =====================================================================
// HELPERS UI (déjà faits pour toi — sers-toi de ces fonctions)
// =====================================================================

/** Ajoute une ligne dans le journal (type = "info" | "ok" | "err"). */
function logJournal(message, type = "info") {
  const journal = document.getElementById("journal");
  const heure = new Date().toLocaleTimeString("fr-FR");
  const ligne = document.createElement("p");
  ligne.className = "ligne";
  ligne.innerHTML = `<span class="heure">${heure}</span><span class="${type}">${message}</span>`;
  journal.prepend(ligne);
}

/** Met à jour les 3 compteurs de l'UI à partir de l'objet `stats`. */
function rafraichirStats() {
  document.getElementById("stat-cours").textContent = stats.enCours;
  document.getElementById("stat-livrees").textContent = stats.livrees;
  document.getElementById("stat-perdues").textContent = stats.perdues;
}

/** Crée la carte HTML d'une commande et l'insère dans la liste. */
function creerCarteCommande(commande) {
  const liste = document.getElementById("liste-commandes");
  // Si c'est la 1ère commande, on retire le message "Aucune commande..."
  const vide = liste.querySelector(".vide");
  if (vide) vide.remove();

  const carte = document.createElement("div");
  carte.className = "commande";
  carte.id = `commande-${commande.id}`;
  carte.innerHTML = `
        <div class="commande-titre">
            <span>#${String(commande.id).padStart(3, "0")} — ${commande.type}</span>
            <span class="commande-temps"></span>
        </div>
        <div class="commande-statut">Nouvelle commande...</div>
        <div class="progress"><div class="progress-bar"></div></div>
        <button class="delete">❌</button>
    `;
  let btnDelete = carte.querySelector(".delete");
  btnDelete.addEventListener('click', function () {
    commande.annulee = true;
    disBtnDelete(btnDelete);
  })
  liste.prepend(carte);
  return carte;
}

/** Met à jour le texte de statut d'une commande. */
function setStatut(commande, texte) {
  commande.carte.querySelector(".commande-statut").textContent = texte;
}

/** Affiche/met à jour la barre de progression (pourcentage entre 0 et 100). */
function setProgress(commande, pourcent) {
  const progress = commande.carte.querySelector(".progress");
  const bar = commande.carte.querySelector(".progress-bar");
  progress.classList.add("visible");
  bar.style.width = `${pourcent}%`;
}

/** Marque la commande comme livrée (vert) ou échouée (rouge). */
function finaliserCarte(commande, succes) {
  commande.carte.classList.add(succes ? "succes" : "echec");
  commande.carte.querySelector(".progress").classList.remove("visible");
}

// =====================================================================
// TODO N°2 — Utilitaire `delai(ms)`
// =====================================================================
// Doit retourner une Promise qui se résout après `ms` millisecondes.
// C'est la brique de base utilisée par toutes les étapes asynchrones.
// Indice : new Promise + setTimeout

function delai(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

// =====================================================================
// TODO N°3 — `preparerPate(commande)`
// =====================================================================
// 1. Affiche "Préparation de la pâte..." comme statut de la commande
//    (utilise setStatut)
// 2. Attend 1500 ms (utilise `await delai(...)`)
// 3. Log "Pâte prête pour #001" dans le journal (type "ok")

async function preparerPate(commande) {
  setStatut(commande, "Préparation de la pâte...");
  await delai(1500);
  logJournal(`Pâte prête pour #${commande.id}`, "ok");
}

// =====================================================================
// TODO N°4 — `ajouterGarniture(commande, nom)`
// =====================================================================
// 1. Attend un temps aléatoire entre 300 et 900 ms
// 2. Log "Garniture {nom} ajoutée à #001" dans le journal

async function ajouterGarniture(commande, nom) {
  const timer = Math.floor((Math.random() * 600) + 300);
  await delai(timer);
  logJournal(`Garniture ${nom} ajoutée à #${commande.id}`);
}

// =====================================================================
// TODO N°5 — `ajouterToutesLesGarnitures(commande)`
// =====================================================================
// 1. Choisit `commande.nbGarnitures` garnitures au hasard dans GARNITURES.
// 2. Affiche le statut "Ajout des garnitures en parallèle..."
// 3. Utilise Promise.all pour lancer TOUTES les `ajouterGarniture` EN MÊME
//    TEMPS (et non l'une après l'autre).
// 4. La fonction n'est terminée que quand TOUTES sont ajoutées.
//
// Indice : `liste.map(g => ajouterGarniture(commande, g))` puis Promise.all

async function ajouterToutesLesGarnitures(commande) {
  const newGarn = [];
  for (let i = 0; i < commande.nbGarnitures; i++) {
    const nmb = Math.floor(Math.random() * GARNITURES.length)
    newGarn.push(GARNITURES[nmb])
  }
  setStatut(commande, "Ajout des garnitures en parallèle...");
  const promTab = newGarn.map(g => ajouterGarniture(commande, g))
  await Promise.all(promTab);
}

// =====================================================================
// TODO N°6 — `cuirePizza(commande)`
// =====================================================================
// Cuisson de 3000 ms. Pendant ce temps, la barre de progression doit
// passer de 0 % à 100 % par paliers de 10 % toutes les 300 ms.
//
// Indices :
//   - Boucle `for (let p = 0; p <= 100; p += 10)` avec `await delai(300)`
//   - Utilise setStatut et setProgress
//   - Log "Cuisson terminée pour #001" à la fin

async function cuirePizza(commande) {
  setStatut(commande, "Cuisson en cours...");
  for (let p = 0; p <= 100; p += 10) {
    await delai(300)
    checkStatus(commande)
    setProgress(commande, p)
  }
  logJournal(`Cuisson terminée pour #${commande.id}`, "ok");
}

// =====================================================================
// TODO N°7 — `livrerPizza(commande)`
// =====================================================================
// 1. Affiche le statut "Livraison en cours..."
// 2. Attend 1000 ms
// 3. 20 % de chances que la livraison échoue → la promise doit alors
//    REJECT avec `new Error("Livraison perdue")`
//    (Tu peux utiliser Math.random() < 0.2 ET throw new Error(...))
// 4. Sinon, log "Pizza #001 livrée !"

async function livrerPizza(commande) {
  setStatut(commande, "Livraison en cours...");
  await delai(1000);
  let chance = Math.random();
  if (chance < 0.2) {
    throw new Error("Livraison perdue")
  } else {
    logJournal(`Pizza #${commande.id} livrée !`, "ok")
  }
}

// =====================================================================
// TODO N°8 — `traiterCommande(commande)` (orchestration)
// =====================================================================
// Enchaîne les 4 étapes DANS L'ORDRE avec async/await :
//   preparerPate → ajouterToutesLesGarnitures → cuirePizza → livrerPizza
// Puis :
//   - setStatut "✓ Livrée"
//   - finaliserCarte(commande, true)
//   - incrémente stats.livrees et décrémente stats.enCours
//   - rafraichirStats()

async function traiterCommande(commande) {

  try {
    commande.timePrep = Date.now();
    await preparerPate(commande);
    checkStatus(commande)
    await ajouterToutesLesGarnitures(commande);
    checkStatus(commande)
    await cuirePizza(commande);
    checkStatus(commande)
    await livrerPizza(commande);
    checkStatus(commande)
    setStatut(commande, "✓ Livrée");
    disBtnDelete(commande)
    let totTime = commande.carte.querySelector(".commande-temps");
    totTime.textContent = `(${((Date.now() - commande.timePrep) / 1000).toFixed(1)}sec.)`;
    finaliserCarte(commande, true);
    stats.livrees++;
    stats.enCours--;
    rafraichirStats();
  }
  // TODO N°9 — Gestion d'erreur
  // Entoure le code ci-dessus d'un try/catch.
  // Dans le catch :
  //   - setStatut(`✗ ${erreur.message}`)
  //   - finaliserCarte(commande, false)
  //   - log "Commande #001 perdue : Livraison perdue" type "err"
  //   - incrémente stats.perdues, décrémente stats.enCours
  //   - rafraichirStats()
  catch (erreur) {
    setStatut(commande, `✗ ${erreur.message}`)
    disBtnDelete(commande)
    let totTime = commande.carte.querySelector(".commande-temps");
    totTime.textContent = `(${((Date.now() - commande.timePrep) / 1000).toFixed(1)}sec.)`;
    finaliserCarte(commande, false)
    if (erreur.message == "Commande annulée" ){
      logJournal(`Commande #${commande.id}: Commande annulée`, "del");
      finaliserCarte(commande, false);
      commande.carte.classList.add("delete");
    } else {
      logJournal(`Commande #${commande.id}: ${erreur.message}`, "err");
    }
    stats.perdues++;
    stats.enCours--;
    rafraichirStats();
  }
}

// =====================================================================
// TODO N°10 — Branchement du bouton "Commander"
// =====================================================================
// Au clic sur le bouton :
btnComm.addEventListener('click', function () {
  //   1. Lis le type sélectionné et le nombre de garnitures
  //   2. Crée un objet `commande` { id, type, nbGarnitures, carte: ... }
  let commande = {
    id: prochainId,
    type: slctPizza.value,
    nbGarnitures: Number(myInput.value),
  };
  //   3. Appelle creerCarteCommande pour obtenir l'élément DOM
  //      → stocke-le dans commande.carte
  commande.carte = creerCarteCommande(commande);
  //   4. Incrémente stats.enCours et rafraichirStats()
  stats.enCours++;
  rafraichirStats();
  prochainId++;
  //   5. Lance traiterCommande(commande) SANS l'attendre
  //      (pour permettre plusieurs commandes en parallèle)
  traiterCommande(commande);
  //   6. Log "Nouvelle commande #001 (Margherita)" type "info"
  logJournal(`Nouvelle commande #${commande.id} (${commande.type})`, "info")

})
//
// → L'utilisateur doit pouvoir cliquer plusieurs fois rapidement et voir
//   plusieurs commandes progresser en même temps.

// =====================================================================
// BONUS (facultatif)
// =====================================================================
// B1. Affiche le temps total de chaque commande dans .commande-temps
// // B1. Temps total par commande :
// - Au début de traiterCommande, on stocke Date.now() dans commande.timePrep
// - À la fin (try ET catch), on calcule Date.now() - commande.timePrep
//   et on l'affiche en secondes dans la <span class="commande-temps">


// B2. Ajoute un bouton "Annuler" sur chaque carte (utilise AbortController
//     ou un drapeau booléen sur l'objet commande)
function checkStatus(commande) {
  if (commande.annulee) {
    throw new Error("Commande annulée")
  }
}

function disBtnDelete(commande) {
  let btnDelete = commande.carte.querySelector(".delete")
  btnDelete.disabled = true;
  btnDelete.classList.add("deleteNone")
}

// B3. Calcule et affiche le temps moyen de livraison 

