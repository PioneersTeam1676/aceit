import request from "../api.js";
import { Card } from './Card.js';

export class Deck {

    /**@type {Number} the unique id for the deck in the db */
    id;
    /**@type {Number} the unique id for the owner of the deck in the db */
    owner;
    /**@type {String} the name of the deck */
    name;
    /**@type {String} the description of the deck */
    description;
    /**@type {Boolean} if the deck is public or private */
    dbPublic;
    /**@type {Array.<Card>} the list containing all the Cards in the deck */
    cards;
    /**@type {String} the origin of the deck */
    origin;


    /**
     * Generates a deck from a list of cards
     * @param {Number} id the unique id for the deck in the db
     * @param {Number} owner the unique id for the owner of the deck in the db
     * @param {String} name the name of the deck
     * @param {String} description the description of the deck
     * @param {Boolean} dbPublic if the deck is public or private
     * @param {Array.<Card>} cards the list containing all the Cards in the deck
     */
    constructor(id, owner, name, description, dbPublic, cards) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.description = description; 
        this.dbPublic = dbPublic;
        this.cards = cards;
    }

    /**
     * Generate a deck using a list of card IDs rather than a list of cards
     * @param {Number} id the unique id for the deck in the db
     * @param {Number} owner the unique id for the owner of the deck in the db
     * @param {String} name the name of the deck
     * @param {String} description the description of the deck
     * @param {Boolean} dbPublic if the deck is public or private
     * @param {Array.<Number>} cards the list containing all the IDs of the cards in the deck 
     */
    static generateFromCardIDs(id, owner, name, description, dbPublic, cards) {
        let deck = new Deck(id, owner, name, description, dbPublic, []);

        for(let i = 0; i < cards.length; i++) {

            let card = request(`api/aceit_cards/${cards[i]}`, 'GET');

            card.then((res) => {
                card = new Card(res.id, res.owner, res.term, res.definition, res.image, res.public)
                deck.cards.push(card);    
            })
        }

        return deck;
    }

    /**
     * Updates the card on the backend based on the current instance variables of the deck
     * @returns the response from the backend
     */
    refreshBackend() {
        let update = request(`api/aceit_decks/${this.id}`, 'PUT', {
            name: this.name,
            description: this.description,
            public: this.dbPublic,
            cards: this.cards.map((c) => c.id).toString()
        });

        update.then((res) => {
            return res;
        }
        ).catch((err) => {
            return err;

        });
    }

}

export class MoveableDeck extends Deck {

        /**@type {Number} the unique id for the deck in the db */
        id;
        /**@type {Number} the unique id for the owner of the deck in the db */
        owner;
        /**@type {String} the name of the deck */
        name;
        /**@type {String} the description of the deck */
        description;
        /**@type {Boolean} if the deck is public or private */
        dbPublic;
        /**@type {Array.<Card>} the list containing all the Cards in the deck */
        cards;
        /**@type {Number} the amount that the deck is shifted off the left of the screen */
        left;
        /**@type {Number} the amount that the deck is shifted off the top of the screen */
        top;
        /**@type {Number} the the z-index of the deck*/
        zIndex;

        /**
         * @param {Number} id the unique id for the deck in the db
         * @param {Number} owner the unique id for the owner in the db
         * @param {String} name the name of the deck
         * @param {String} description the decription of the deck
         * @param {Boolean} dbPublic if the deck is public or private
         * @param {Array.<Card>} cards the list containg all the Cards in the deck
         * @param {Number} left the amount that the deck is shifted off the left of the screen
         * @param {Number} top the amount that the deck is shifted off the top of the screen
         * @param {Number} zIndex the z-index of the deck
         */
        constructor(id, owner, name, description, dbPublic, cards, left, top, zIndex) {
            super(id, owner, name, description, dbPublic, cards);
            this.id = id;
            this.name = name;
            this.description = description;
            this.dbPublic = dbPublic;
            this.cards = cards;
            this.left = left;
            this.top = top;
            this.zIndex = zIndex;
        }


        /**
         * Generate a new MoveableDeck from a previosly create Deck
         * @param {Deck} deck the deck to create the MoveableDeck from
         * @param {Number} left the amount that the deck is shifted off the left of the screen
         * @param {Number} top the amount that the deck is shifted off the top of the screen
         * @param {Number} zIndex the z-index of the card
         * @returns {MoveableDeck} the new MoveableDeck created
         */
        static generateFromDeck(deck, left, top, zIndex) {
            return new MoveableDeck(deck.id, deck.owner, deck.name, deck.description, deck.dbPublic, deck.cards, left, top, zIndex);
        }

        /**
         * Generate a new Deck from a previosly created MoveableDeck
         * @returns {Deck} the new Deck created
         */
        getDeck() {
            return new Deck(this.id, this.owner, this.name, this.description, this.dbPublic, this.cards);
        }

    }