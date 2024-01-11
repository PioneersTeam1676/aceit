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
    img;

    /**
     * 
     * @param {Number} id - the uid of the card in the db
     * @param {Number} owner - the uid of the user that owns the card
     * @param {String} term - the cards term
     * @param {String} definition - the defintion of the term
     * @param {String} img - the image url on the card
     */
    constructor(id, owner, term, definition, img) {
        this.id = id;
        this.owner = owner;
        this.term = term;
        this.definition = definition;
        this.img = img;
    }

    

}

export class MoveableCard extends Card{

    

    /**
     * @param {Number} id - the uid of the card in the db
     * @param {Number} owner - the uid of the user that owns the card
     * @param {String} term - the cards term
     * @param {String} definition - the defintion of the term
     * @param {String} img - the image url on the card
     * @param {Number} left - the amount that the card is shifted off the left of the screen
     * @param {Number} top - the amount that the card is shofted off the top of the screen
     * @param {String} color - the color of the card NOT IMPLEMENTED YET
     */
    constructor(id, owner, term, definition, img, left, top, color) {
        super(id, owner, term, definition, img);
        this.left = left;
        this.top = top;
        this.color = color;
    }

    /**
     * Generates a MoveableCard from a Card and other required instance variables
     * @param {Card} card the card to create the new MoveableCard from
     * @param {Number} left the amount that the card is shifted left
     * @param {Number} top the amount that the card is shifted right
     * @param {Number} color the color of the card NOT IMPLEMENTED YET
     */
    static generateFromCard(card, left, top, color) {

        return new MoveableCard(card.id, card.owner, card.term, card.definition, card.img, left, top, color);

    }

}