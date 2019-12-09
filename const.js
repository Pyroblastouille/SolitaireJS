var VALEURS = {
    As: 'A',
    Deux: 2,
    Trois: 3,
    Quatre: 4,
    Cinq: 5,
    Six: 6,
    Sept: 7,
    Huit: 8,
    Neuf: 9,
    Dix: 10,
    Valet: 'J',
    Dame: 'Q',
    Roi: 'K'
};

var COULEURS = {
    PIQUE: '♠',
    CARREAU: '♦',
    TREFLE: '♣',
    COEUR: '♥'
}

class Deck {
    constructor(defaultDeck = false) {
        this.cartes = [];
        if (defaultDeck) {
            this.DefaultDeck();
        }
    }
    /**
     * Set le deck à 52 cartes
     */
    DefaultDeck() {
        this.Empty();
        COULEURS.forEach(col => {
            VALEURS.forEach(val => {
                this.Add(new Card(val, col));
            });
        });
    }
    /**
     * Vide le deck
     */
    Empty() {
        this.cartes = [];
    }
    /**
     * Retourne le nombre de cartes dans le deck
     */
    DeckSize() {
        return this.cartes.length;
    }
    /**
     * 
     * @param {int} fromId 
     */
    DeckSlice(fromId){
        var newDeck = new Deck();
        for (let i = fromId; i < this.DeckSize(); i++) {
            newDeck.AddAtBegin(this.Draw());
        }
        return newDeck;
    }
    DeckFusion(otherDeck){
        for (let i = 0; i < otherDeck.DeckSize(); i++) {
            const card = otherDeck.cartes[i];
            this.Add(card);
        }
    }
    /**
     * Tire la dernière carte du deck
     */
    Draw() {
        return this.cartes.pop();
    }
    /**
     * 
     */
    Last() {
        return this.cartes[this.DeckSize() - 1];
    }
    /**
     * Rajoute une carte dans le deck
     * @param {Card} aCarte 
     */
    Add(aCarte) {
        this.cartes.push(aCarte);
    }
    /**
     * Rajoute une carte dans le deck au début
     * @param {Card} aCarte 
     */
    AddAtBegin(aCarte) {
        this.cartes.shift(aCarte);
    }
    /**
     * Mélange le deck
     */
    Shuffle() {
        this.cartes.sort(() => 0.5 - Math.random());
    }
    Write(){
        var str = "";
        this.cartes.forEach(element => {
            str += element.Write()+"\n";
        });
        return str;
    }
}

class Card {
    constructor(Valeur, Couleur) {
        this.couleur = Couleur;
        this.valeur = Valeur;
        this.visible = false;
    }
    Write(){
        return this.valeur + " "+this.couleur;
    }
    Flip() {
        this.visible = !this.visible;
    }
    /* Check for values */
    EqualValue(than) {
        return (this.valeur == than.valeur);
    }
    JustMoreValue(than) {
        return (this.valeur - than.valeur == 1);
    }
    MoreValue(than) {
        return (this.valeur - than.valeur > 0);
    }
    JustLessValue(than) {
        return (this.valeur - than.valeur == -1);
    }
    LessValue(than) {
        return (this.valeur - than.valeur < 0);
    }
    /* Check for Colors */
    SameColor(than) {
        switch (this.couleur) {
            case COULEURS.CARREAU:
            case COULEURS.COEUR:
                return (than.couleur == COULEURS.CARREAU || than.couleur == COULEURS.COEUR);
                break;
            case COULEURS.PIQUE:
            case COULEURS.TREFLE:
                return (than.couleur == COULEURS.PIQUE || than.couleur == COULEURS.TREFLE);
                break;
            default:
                return false;
                break;
        }
    }
    DifferentColor(than) {
        return !this.SameColor(than)
    }
}