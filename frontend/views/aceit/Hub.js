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
    /**@type {Array.<Deck>|Array.<Card>} */
    currentSideElement;
    
   

    constructor(userID) {
        
        this.userID = userID;
        this.cards = [];
        this.activeCards = [];
        this.decks = [];
        this.moveableDecks = [];
        this.searchValue = "";
        this.currentSide = "cards";
        this.currentSideElement = this.cards;

        

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
                this.cards.push(generateCardFromDB(card));
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

        /** @type {Promise.<Array.<Object>>} */
        let decks = await request(`api/aceit_decks/owner/${params.owner}`);

        for(let i = 0; i < decks.length; i++) {

            let deck = decks[i];

            let cardIDS = deck.cards.split(",");
            console.log(cardIDS);
            let cards = [];

            for(let i = 0; i < cardIDS.length; i++) {

                let card = await request(`api/aceit_cards/${cardIDS[i]}, 'GET`);

                cards[i] = generateCardFromDB(card);
                
            }

            console.log(cards);

            this.decks.push(new Deck(deck.id, deck.owner, deck.name, deck.description, deck.public, cards));
        }

        
        return decks;
    }

}