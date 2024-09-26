const reponse = await fetch("pieces-autos.json");
const piecesAutos = await reponse.json();

function afficherFiches(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    const sectionFiche = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image;

    const titreElement = document.createElement("h2");
    titreElement.innerHTML = pieces[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerHTML = `Prix ${pieces[i].prix} € (${
      pieces[i].prix < 35 ? "€" : " €€€"
    })`;

    const categorieElement = document.createElement("p");
    categorieElement.innerHTML = pieces[i].categorie ?? "Aucun categorie";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML =
      pieces[i].description ?? "Pas de description pour le moment.";

    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerHTML = pieces[i].disponibilite
      ? "en stock "
      : "en rupture de stock";

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(titreElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(descriptionElement);

    sectionFiche.appendChild(pieceElement);
  }
}

//gestion de boutton
const buttonTrier = document.querySelector(".btn-trier");
buttonTrier.addEventListener("click", () => {
  const piecesOrdonnees = Array.from(piecesAutos);
  piecesOrdonnees.sort((a, b) => a.prix - b.prix);

  console.log(piecesOrdonnees);
});

const buttonTrierDesc = document.querySelector(".btn-trier-desc");
buttonTrierDesc.addEventListener("click", () => {
  const piecesOrdonneesDesc = Array.from(piecesAutos);
  piecesOrdonneesDesc.sort((a, b) => b.prix - a.prix);
  console.log(piecesOrdonneesDesc);
});

const buttonFiltrer = document.querySelector(".btn-filtrer");
buttonFiltrer.addEventListener("click", () => {
  const piecesFiltrer = piecesAutos.filter((piece) => {
    return piece.prix < 35;
  });

  console.log(piecesFiltrer);
});

const buttonFiltrerSansDescription = document.querySelector(
  ".btn-filter-sans-description"
);
buttonFiltrerSansDescription.addEventListener("click", () => {
  const pieceFilter = piecesAutos.filter((piece) => piece.description);
  console.log(pieceFilter);
});

afficherFiches(piecesAutos);

// Pirece
const abordableElement = document.querySelector(".abordable");

const noms = piecesAutos.map((piece) => piece.nom);

for (let i = piecesAutos.length - 1; i >= 0; i--) {
  if (piecesAutos[i].prix < 35) {
    noms.splice(i, 1);
  }
}

const listeAbordable = document.createElement("ul");

for (let i = 0; i < noms.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = noms[i];
  listeAbordable.appendChild(li);
}

abordableElement.appendChild(listeAbordable);

//Piéce disponible

const disponibleElement = document.querySelector(".disponible");

const prixPiece = piecesAutos.map((piece) => piece.prix);
const nomPiece = piecesAutos.map((piece) => piece.nom);

console.log("nom ", nomPiece);

for (let i = piecesAutos.length - 1; i >= 0; i--) {
  if (piecesAutos[i].disponibilite === false) {
    prixPiece.splice(i, 1);
    nomPiece.splice(i, 1);
  }
}

const listeDisponible = document.createElement("ul");

for (let i = 0; i < nomPiece.length; i++) {
  const liste = document.createElement("li");
  liste.innerHTML = `${nomPiece[i]} -  ${prixPiece[i]} €`;
  listeDisponible.appendChild(liste);
}

disponibleElement.appendChild(listeDisponible);
