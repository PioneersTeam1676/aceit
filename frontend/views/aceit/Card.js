export class Card {

    /**@type {number} The uid of the card in the db */
    id;
    /**@type {number} The uid of the user that owns the card */
    owner;
    /**@type {String} The card's term */
    term;
    /**@type {String}The defintion of the term */
    definition;
    /**@type {String} The image url on the card */
    image;
    /**@type {Boolean} if the deck is public or private */
    dbPublic;
    

    /**
     * 
     * @param {Number} id - the uid of the card in the db
     * @param {Number} owner - the uid of the user that owns the card
     * @param {String} term - the cards term
     * @param {String} definition - the defintion of the term
     * @param {String} image - the image url on the card
     * @param {Boolean} dbPublic - if the card is public or private
     */
    constructor(id, owner, term, definition, image, dbPublic) {
        this.id = id;
        this.owner = owner;
        this.term = term;
        this.definition = definition;
        this.image = image;
        this.dbPublic = dbPublic;
    }



    

}

export class MoveableCard extends Card {

    /**@type {Number}  */
    id;
    /**@type {Number} */
    owner;
    /**@type {String} */
    term;
    /**@type {String} */
    definition;
    /**@type {String} */
    image;
    /**@type {Boolean} */
    dbPublic;
    /**@type {Number} */
    left;
    /**@type {Number} */
    top;
    /**@type {String} */
    color;
    /**@type {Number} */
    zIndex;

    /**
     * @param {Number} id - the uid of the card in the db
     * @param {Number} owner - the uid of the user that owns the card
     * @param {String} term - the cards term
     * @param {String} definition - the defintion of the term
     * @param {String} image - the image url on the card
     * @param {Boolean} dbPublic - if the card is public or private
     * @param {Number} left - the amount that the card is shifted off the left of the screen
     * @param {Number} top - the amount that the card is shofted off the top of the screen
     * @param {String} color - the color of the card NOT IMPLEMENTED YET
     * @param {Number} zIndex - the z-index of the card
     */
    constructor(id, owner, term, definition, image, dbPublic, left, top, color, zIndex) {
        super(id, owner, term, definition, image, dbPublic);
        this.left = left;
        this.top = top;
        this.color = color;
        this.zIndex = zIndex;
    }



    

}

/**
 * Generates a new Card object from an object returned by the backend
 * @param {Object} card the card object returned by the database
 * @param {Number} card.id the unique id of the card in the db
 * @param {Number} card.owner the unique id of the owner in the db
 * @param {String} card.term the card's term
 * @param {String} card.definition the card's definiton
 * @param {String} card.image the image url on the card
 * @param {Boolean} card.public if the card is public or private
 * @param {String} card.labels a csv of labels on the card DEPRECATED - not actually used in creating the Card object
 * @returns {Card} the newly created Card
 */
export function generateCardFromDB(card) {
    return new Card(card.id, card.owner, card.term, card.definition, card.image, card.public);   
}

/**
 * Generates a MoveableCard from a Card and other required instance variables
 * @param {Card} card the card to create the new MoveableCard from
 * @param {Number} left the amount that the card is shifted left
 * @param {Number} top the amount that the card is shifted right
 * @param {Number} color the color of the card NOT IMPLEMENTED YET
 * @param {Number} zIndex the z-index of the card
 * @returns {MoveableCard} the MoveableCard that is created
 */
export function generateMoveableCardFromCard(card, left, top, color, zIndex) {
    return new MoveableCard(card.id, card.owner, card.term, card.definition, card.image, card.dbPublic, left, top, color, zIndex);
}

