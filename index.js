var NB_COLUMNS = 7;
var NB_OUT = 4;

var pioche, colonnes, sorties;

function Setup() {
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

/**
 * 
 * @param {int} fromCol 
 * @param {int} atId 
 * @param {int} toCol 
 */
function RequestMove(fromCol, atId, toCol) {
    return (colonnes[fromCol].cartes[atId].JustLessThan(colonnes[toCol].Last()));
}
/**
 * 
 * @param {Card} card 
 */
function RequestOut(card) {
    switch (card.couleur) {
        case COULEURS.PIQUE:
            return (card.JustMoreValue(sorties[0].Last()));
            break;
        case COULEURS.CARREAU:
            return (card.JustMoreValue(sorties[1].Last()));
            break;
        case COULEURS.TREFLE:
            return (card.JustMoreValue(sorties[2].Last()));
            break;
        case COULEURS.COEUR:
            return (card.JustMoreValue(sorties[3].Last()));
            break;
        default:
            return false;
            break;
    }
}