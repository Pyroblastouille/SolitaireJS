var NB_COLUMNS = 7;
var NB_OUT = 4;

var pioche,unPioche, colonnes, sorties;

function Setup() {
    pioche = new Deck(true);
    unPioche = new Deck();
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
function TakePioche(){
    if(pioche.DeckSize() == 0){
        while(unPioche.DeckSize() > 0){
            pioche.AddAtBegin(unPioche.Draw());
        }
    }else{
        unPioche.Add(pioche.Draw());
    }

}
function FastClick(idCol,cardIdInDeck){
    if(cardIdInDeck == colonnes[idCol].DeckSize()-1){
        if(RequestOut(colonnes[idCol].Last())){
            var card = colonnes.Draw();
            SwitchOut(card);
        }
    }
    for (let i = 0; i < colonnes.length; i++) {
        if(i == idCol){
            continue;
        }
        if(RequestMove(idCol,cardIdInDeck,i)){
            SwitchCol(idCol,cardIdInDeck,i);
        }
    }
}
function SwitchOut(card){
    switch (card.couleur) {
        case COULEURS.PIQUE:
            return sorties[0].Add(card);
            break;
        case COULEURS.CARREAU:
            return sorties[1].Add(card);
            break;
        case COULEURS.TREFLE:
            return sorties[2].Add(card);
            break;
        case COULEURS.COEUR:
            return sorties[3].Add(card);
            break;
        default:
            return false;
            break;
    }
}
function SwitchCol(fromCol,atId,toCol){
    var tmpDeck = colonnes[fromCol].DeckSlice(atId);
    colonnes[toCol].DeckFusion(tmpDeck);
}
/**
 * 
 * @param {int} fromCol 
 * @param {int} atId 
 * @param {int} toCol 
 */
function RequestMove(fromCol, atId, toCol) {
    return (colonnes[fromCol].cartes[atId].JustLessThan(colonnes[toCol].Last()) && 
    colonnes[fromCol].cartes[atId].DifferentColor(colonnes[toCol].Last()));
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
function DrawThings(){
    div_unPioche.innerText = unPioche.Write();
    div_pioche.innerText = pioche.Write();

    out0.innerText = sorties[0].Write();
    out1.innerText = sorties[1].Write();
    out2.innerText = sorties[2].Write();
    out3.innerText = sorties[3].Write();

    for (let i = 0; i < NB_COLUMNS; i++) {
        var col = document.getElementById('colonne'+i);
        col.innerText = colonnes[i].Write();
    }
}
function AutoComplete(){
    var changed = false;
    while(RequestOut(unPioche.Last())){
        var card = unPioche.Draw();
        SwitchOut(card);
        changed = true;
    }
    for (let i = 0; i < colonnes.length; i++) {
        while(RequestOut(colonnes[i].Last())){
            var card = colonnes[i].Draw();
            SwitchOut(card);
            changed = true;
        }
    }
    if(changed){
        AutoComplete();
    }
}