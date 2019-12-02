var NB_COLUMNS = 7;
var NB_OUT = 4;

var pioche, colonnes, sorties;

function Setup(){
    pioche = new Deck(true);
    colonnes = [];
    sorties = [];
    //Définit les decks de sortie
    for (let k = 0; k < NB_OUT; k++) {
        sorties.push(new Deck()); 
    }
    //Définit les colonnes du jeu
    for (let i = 0; i < NB_COLUMNS; i++) {
        colonnes.push(new Deck());
        for (let j = 0; j < colonnes.length; j++) {
            colonnes[i].Add(pioche.Draw());
        }
    }
}

function RequestMove(fromCol,atId,toCol){
    if(colonnes[fromCol].cartes[atId].valeur)
}