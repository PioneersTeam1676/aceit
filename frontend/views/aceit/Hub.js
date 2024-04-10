/*

TODO: 
    - implement cookies for saving the activeCards and activeDecks 

*/

import { Card, MoveableCard, generateCardFromDB, generateMoveableCardFromCard } from './Card.js';
import { Deck, MoveableDeck } from './Deck.js';
import request from '../api.js';


/** @enum {String} */
const SideBarEnum = {
    Card: "cards",
    Deck: "decks"
}

export default class Hub {
    
    /** @type {Array.<Card>} - the list of loaded Cards currently for the user*/
    cards;
    /** @type {Array.<Card>} - the list of cards currently on the sidebar for the user */
    activeCards;
    /** @type {Array.<Deck>} - the list of loaded Decks for the user */
    decks;
    /** @type {Array.<MoveableDeck>} - the list of decks currently on the board for the user */
    moveableDecks;
    /** @type {Number} - the id for the currently logged in user */
    userID;
    /** @type {String} - the search value in the sidebar searchbar */
    searchValue;
    /** @type {String} - the type of data that the sidebar is displaying */
    currentSide;
    /**@type {Array.<MoveableDeck>|Array.<Card>} */
    currentSideElement;
    /**@type {Boolean} */
    activeModal;
    
   

    constructor(userID) {
        
        this.userID = userID;
        this.cards = [];
        this.activeCards = [];
        this.decks = [];
        this.moveableDecks = [];
        this.searchValue = "";
        this.currentSide = "cards";
        this.currentSideElement = this.cards;
        this.movingDeck = 0;
        this.activeModal = false;

        

    };


    /**
     * Loads the cards into the cards array
     * @param {Object} params the searchParams for the cards to load
     * @param {Number} params.id the id of the card to load
     * @param {String} params.term the term that the user is searching for
     * @param {String} params.definition the definition that the user is searching for
     * @param {Number} params.owner the owner id that the user is searching for
     * @returns {Promise.<Array.<Card>>}
     */
    async loadCards(params) {

        /** @type {Promise.<Array.<Object>>} */
        let cards = request(`api/aceit_cards/owner/${params.owner}`);

        cards.then((res) => {
            for(let i = 0; i < res.length; i++) {
                let card = res[i];

                if(!this.cardsContainsID(card.id)) {
                    this.cards.push(generateCardFromDB(card));
                }
            }
        })
        return cards;
    };


    /**
     * Runs when the user clicks on the deck or cards button on the sidebar. Then changes between decks and cards on the sidebar in html and updates the selected button in the html
     * @returns {void}
     */
    inverseSelection() {

        let cardButton = document.getElementById("hub-controller-button-cards");
        let deckButton = document.getElementById("hub-controller-button-decks");

        this.currentSide = ((this.currentSide == "cards") ? "decks" : "cards")

        cardButton.setAttribute("data-selected", this.currentSide == "cards" ? "true" : "false");
        deckButton.setAttribute("data-selected", this.currentSide == "decks" ? "true" : "false");

        this.currentSideElement = ((this.currentSide == "cards") ? this.cards : this.decks);



        

    }

    /**
     * Loads the decks into the decks array
     * @param {Object} params the searchParams for the decks to load
     * @param {String} params.term the term that the user is searching for
     * @param {String} params.definition the definition that the user is searching for
     * @param {Number} params.owner the owner id that the user is searching for
     * @returns {Promise.<Array.<Deck>>}
     */
    async loadDecks(params) {

        /** @type {Promise.<Array.<Deck>>} */
        let decks = await request(`api/aceit_decks/owner/${params.owner}`);

        for(let i = 0; i < decks.length; i++) {

            let deck = decks[i];

            let cardIDS = deck.cards.split(",");
            console.log(cardIDS);
            let cards = [];

            for(let i = 0; i < cardIDS.length; i++) {

                if(!this.cardsContainsID(cardIDS[i])) {
                    let card = await request(`api/aceit_cards/${cardIDS[i]}, 'GET`);
                    this.cards.push(generateCardFromDB(card));
                } else {
                    cards.push(this.getCardWithID(cardIDS[i]));
                }

                
                
            }

            if(!this.decksContainsID(deck.id) && this.moveableDecks.findIndex( i => i.id == deck.id) == -1) {
                this.decks.push(new Deck(deck.id, deck.owner, deck.name, deck.description, deck.public, cards));
                console.log(cards)
                // this.moveableDecks.push(new MoveableDeck(deck.id, deck.owner, deck.name, deck.description, deck.public, cards, 0, 0, 1));
            }


        }

        
        return decks;
    }



    /**
     * Checks if the Cards array contains a card with a specific id
     * @param {Number} id - the uid of the card to check for
     * @returns {Boolean} true if the Cards array contains a card with the id, false if it does not
     */
    cardsContainsID(id) {

        for(let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].id == id) {
                return true;
            }
        }

        return false;
    }
    /**
     * Gets the card with a specific id from the cards array
     * @param {Number} id the id to check for in the cards array
     * @returns {Card} the card with the id or null if it does not exist
     */
    getCardWithID(id) {

        for(let i = 0; i < this.cards.length; i++) {
            if(this.cards[i].id == id) {
                return this.cards[i];
            }
        }

        return null;
    }
    /**
     * Checks if the Decks array contains a deck with a specific id
     * @param {Number} id the uid of the card to check for
     * @returns {Boolean} true if the Decks array contains a deck with the id, false if it does not
     */
    decksContainsID(id) {
            
            for(let i = 0; i < this.decks.length; i++) {
                if(this.decks[i].id == id) {
                    return true;
                }
            }
    
            return false;
    }


    


}