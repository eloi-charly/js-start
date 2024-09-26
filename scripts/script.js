function afficherResultat(score, nombreTotalProposer) {
  let zoneScore = document.querySelector(".zoneScore span");
  zoneScore.innerHTML = score + "/" + nombreTotalProposer;
}
function afficherProposition(motAleatoire) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerHTML = motAleatoire;
}

function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
  location.href = mailto;
}

function validerNom(nom) {
  if (nom.length < 2) {
    throw new Error("Le nom est trop court");
  }
}

function validerEmail(email) {
  const regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]+");

  if (!regexEmail.test(email)) {
    throw new Error("L'email n'est pas valide");
  }
}

function afficherErreurMesage(message) {
  let spanErreurMessage = document.getElementById("erreurMessage");
  if (!spanErreurMessage) {
    let popup = document.querySelector(".popup");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";

    popup.append(spanErreurMessage);
  }

  spanErreurMessage.innerHTML = message;
}

function gererFormulaire(scoreEmail) {
  try {
    let baliseNom = document.getElementById("nom");
    validerNom(baliseNom.value);

    let baliseEmail = document.getElementById("email");
    validerEmail(baliseEmail.value);

    afficherErreurMesage("");
    afficherEmail(baliseNom.value, baliseEmail.value, scoreEmail);
  } catch (error) {
    afficherErreurMesage(error.message);
  }
}

function lancerJeu() {
  initAddEventListenerPopup();
  let score = 0;
  let i = 0;
  let listeProposition = listeMots;

  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  afficherProposition(listeProposition[i]);

  // Gestion de l'événement click sur le bouton "valider"
  btnValiderMot.addEventListener("click", () => {
    if (inputEcriture.value === listeProposition[i]) {
      score++;
    }
    i++;
    afficherResultat(score, i);
    inputEcriture.value = "";
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
    } else {
      afficherProposition(listeProposition[i]);
    }
  });

  // Gestion de l'événement change sur les boutons radios.
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      // Si c'est le premier élément qui a été modifié, alors nous voulons
      // jouer avec la listeMots.
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        // Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      // Et on modifie l'affichage en direct.
      afficherProposition(listeProposition[i]);
    });
  }

  // Gestion de l'événement submit sur le formulaire de partage.
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let scoreEmail = `${score} / ${i}`;
    gererFormulaire(scoreEmail);
  });

  afficherResultat(score, i);
}
