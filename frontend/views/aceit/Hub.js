/*

TODO: 
    - implement cookies for saving the activeCards and activeDecks 

*/

import { Card, MoveableCard } from './Card.js';
import { Deck, MoveableDeck } from './Deck.js';
import request from '../api.js';

export default class Hub {
    
    /** @type {Array.<Card>} - the list of loaded Cards currently for the user*/
    cards;
    /** @type {Array.<Card>} - the list of cards currently on the sidebar for the user */
    activeCards;
    /** @type {Array.<Deck>} - the list of loaded Decks for the user */
    decks;
    /** @type {Array.<MoveableDeck>} - the list of decks currently on the board for the user */
    moveableDecks;

    constructor() {
        
        this.loadCards({})

    };


    /**
     * Loads the cards into the cards array
     * @param {Object} params the searchParams for the cards to load
     * @param {String} params.term the term that the user is searching for
     * @param {String} params.definition the definition that the user is searching for
     * @param {Number} params.owner the owner id that the user is searching for, -1 if not the user
     */
    async loadCards(params) {

        let cards = request('api/aceit_cards')
        

    }


}