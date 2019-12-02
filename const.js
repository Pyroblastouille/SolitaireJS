var VALEURS = {
    A:1,
    1:1,
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    J:11,
    Q:12,
    K:13
};

var COULEURS = {
    ROUGE:{CARREAU:1,COEUR:2},
    NOIR:{PIQUE:3,TREFLE:4}
}

class Deck{
    constructor(defaultDeck = false) {
        this.cartes = [];
        if(defaultDeck){
            this.DefaultDeck();
        }
    }

    DefaultDeck(){
        this.Empty();
        COULEURS.forEach(col => {
            VALEURS.forEach(val => {
                this.Add(new Card(val,col));
            });
        });
    }
    Empty(){
        this.cartes = [];
    }
    /**
     * Retourne le nombre de cartes dans le deck
     */
    DeckSize(){
        return this.cartes.length;
    }
    /**
     * Tire la dernière carte du deck
     */
    Draw(){
        return this.cartes.pop();
    }
    /**
     * Rajoute une carte dans le deck
     * @param {Card} aCarte 
     */
    Add(aCarte){
        this.cartes.push(aCarte);
    }
    /**
     * Mélange le deck
     */
    Shuffle(){
        this.cartes.sort(() => 0.5 - Math.random());
    }
}

class Card{
    constructor(Valeur,Couleur) {
        this.couleur = Couleur;
        this.valeur = Valeur;
        this.visible = false;
    }
    Flip(){
        this.visible = !this.visible;
    }
    /* Check for values */
    EqualValue(than){
        return (this.valeur == than.valeur);
    }
    JustMoreValue(than){
        return (this.valeur-than.valeur == -1);
    }
    MoreValue(than){
        return (this.valeur-than.valeur < 0);
    }
    JustLessValue(than){
        return (this.valeur-than.valeur == 1);
    }
    LessValue(than){
        return (this.valeur-than.valeur > 0);
    }
    /* Check for Colors */
    SameColor(than){
        return this.couleur == than.couleur;
    }
    DifferentColor(than){
        return !this.SameColor(than)
    }
}