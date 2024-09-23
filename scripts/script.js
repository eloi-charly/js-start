function afficherResultat(score, nombreTotalProposer) {
  console.log("Votre score est de:" + score + " sur " + nombreTotalProposer);
}
function choisirPhrasesOuMots() {
  // let answer = prompt("Voullez-vous de mot ou phrase ?");

  // while (answer !== "mot" && answer !== "phrase") {
  //   answer = prompt("Voullez-vous de mot ou phrase ?");
  // }

  let answer = "";

  return answer;
}

function lancerBoucleDeJeu(listes) {
  let score = 0;

  for (let i = 0; i < listes.length; i++) {
    // let motUtilisateur = prompt("Entrer un mot :" + listes[i]);
    let motUtilisateur = "";
    if (listes[i] === motUtilisateur) {
      score++;
    }
  }

  return score;
}

function lancerJeu() {
  let answer = choisirPhrasesOuMots();
  let score = 0;
  let nombrePorposer = 0;

  if (answer === "mot") {
    score = lancerBoucleDeJeu(listeMots);
    nombrePorposer = listeMots.length;
  }
  if (answer === "phrase") {
    score = lancerBoucleDeJeu(listePhrases);
    nombrePorposer = listePhrases.length;
  }

  afficherResultat(score, nombrePorposer);
}
