<script>

    // import svelte components
    import Header from '../aceit/sections/Header.svelte';
    import CardElement from './sharedComponents/Card.svelte';
    import Draggable from './sharedComponents/Draggable.svelte';
    import DeckElement from './sharedComponents/Deck.svelte';
    import PopupModal from './sharedComponents/PopupModal.svelte';

    // import js stuff
    import { Card, MoveableCard } from "./Card.js";
    import Hub from "./Hub.js"
    import request from "../api.js";
    import { Deck, MoveableDeck } from "./Deck.js"
    import { onMount } from 'svelte';


    /** @type {Hub} */
    let hub;
    hub = new Hub(-1);

    hub.loadCookies();

    async function handleClick() {
        hub.activeModal = true;
    }

    function refreshSideBar() {
        hub.inverseSelection();
        hub.currentSide = hub.currentSide;
    }

    /**
     * @param {DragEvent} ev
     * @param {Deck} deck
     * @param {String} origin
    */
    function dragStart(ev, deck, origin) {
        ev.stopPropagation();

        if(ev.target.id == "launch-popup") {
            return;
        }

        // set the data that is being transfered durring the drag
        deck.origin = origin;
        ev.dataTransfer.setData("text/plain", JSON.stringify(deck));
        console.log("owner from dragStart")
        console.log(JSON.parse(ev.dataTransfer.getData("text/plain")).owner)


        //create the div that is going to be dragged by the user
        let dragImage = document.createElement('div');
        dragImage.setAttribute("style", "background-color: var(--aceit-primary); border: 2px solid black; border-radius: 5px; padding: 5px; width: fit-content; height: fit-content; display: flex; flex-direction: column; justify-content: space-between; overflow: auto; min-width: 14rem; position:absolute; z-index: -1; left:0; top:0; ");
        let title = document.createElement('span');
        title.setAttribute("style", "display: flex; flex-direction: column; font-weight: bold; font-size: 32px; color: var(--aceit-accent);");
        title.innerText = deck.name;
        let description =  document.createElement('span');
        description.setAttribute("style", "color: white; font-size: smaller;");
        description.innerText = deck.description;
        dragImage.appendChild(title);
        dragImage.appendChild(description);
        document.body.appendChild(dragImage);
        ev.dataTransfer.setDragImage(dragImage, 0, 0);
    }

    function dragCardStart(ev, card, origin) {
        ev.stopPropagation();

        //set the data that is being transfered durring the drag
        card.origin = origin;
        ev.dataTransfer.setData("text/plain", JSON.stringify(card));
    }


    /**
     * @param {DragEvent} ev
    */
    function dragDeckEnd(ev) {

        ev.preventDefault();


        /**
         * @type {Deck}
         */
        let data = JSON.parse(ev.dataTransfer.getData("text/plain"));

        let containerDiv = ev.target.closest('.hub-sidebar-decks-dropzone')

        if(data.origin == "sidebar-deck") {

            if(ev.target.id == "hub-field") {

                // remove the deck from the sidebar
                let sideBarDeckIndex = hub.decks.findIndex(deck => deck.id == data.id);
                hub.decks.splice(sideBarDeckIndex, 1);
                hub.decks = hub.decks;


                // add the deck to the feild
                let moveableDeck = MoveableDeck.generateFromDeck(data, ev.clientX, ev.clientY, 2);
                hub.moveableDecks.push(moveableDeck);
                hub.moveableDecks = hub.moveableDecks;

        }



    } else if(data.origin == "field-deck" || undefined) {

        // let fieldDeckElement = document.getElementById(`field-deck-${data.id}`);

        let moveableDeckIndex = hub.moveableDecks.findIndex(deck => deck.id == data.id);
        

        if(ev.target.id == "hub-field") {

            hub.moveableDecks[moveableDeckIndex].left = ev.clientX;
            hub.moveableDecks[moveableDeckIndex].top = ev.clientY;


        } else if(ev.target.id == "hub-sidebar-decks") {

            console.log(ev.target.id);


            // let sideBarDeckElement = document.getElementById(`sidebar-deck-${data.id}`);

            // sideBarDeckElement.style.display = "block";
            console.log(data.owner)

            hub.decks.push(new Deck(data.id, data.owner, data.name, data.description, data.dbPublic, data.cards))
            hub.decks = hub.decks;

            let fieldDeckIndex = hub.moveableDecks.findIndex(deck => deck.id == data.id);
            hub.moveableDecks.splice(fieldDeckIndex, 1);


            // fieldDeckElement.remove();

        }






    }

    // console.log(ev)


    }

    /**
     * @param {DragEvent} ev
    */
    function dragCardEnd(ev) {
        ev.preventDefault();
        // console.log(ev);

        let data = JSON.parse(ev.dataTransfer.getData("text/plain"));

        let containerDiv = ev.target.closest('.draggable-deck');

        if(data.origin == "sidebar-card") {
            if(containerDiv?.id.substring(0, 11) == "field-deck-") {
                console.log(data);

                let deckID = containerDiv.id.substring(11);
                console.log(deckID);

                let deckIndex = hub.moveableDecks.findIndex(deck => deck.id == deckID);

                let card = new Card(data.id, data.owner, data.term, data.definition, data.image, data.dbPublic);

                let deck = hub.moveableDecks[deckIndex];
                console.log("Deck: ")
                console.log(deck)



                if(!deck.cards.map(c => c.id).includes(card.id)) {
                    // const addCard = request(`api/aceit_decks/${deckID}`, 'PUT', {cards: `${hub.moveableDecks[deckIndex].cards.map(c => c.id)}, ${card.id}`});
                    
                    // addCard.then(res => {
                    //     console.log(res);
                    // });

                    hub.moveableDecks[deckIndex].cards.push(card);

                    hub.moveableDecks[deckIndex].refreshBackend();
                    
                } else {

                    shake(containerDiv.id);

                }

                hub.moveableDecks = hub.moveableDecks;

            }
        }

    
    }

    function shake(id) {
        let element = document.getElementById(id);
        element.style.animation = 'shake 0.5s'; // Run the shake animation for 0.5 seconds
        element.style.animationIterationCount = '1'; // Run the animation only once

        // Remove the animation so it can be triggered again later
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    }

    function extraFunc(deck, card) {

        console.log('hi');

        console.log(deck.cards);

        let deckIndex = hub.moveableDecks.findIndex(d => d.id == deck.id);

        hub.moveableDecks[deckIndex].cards.splice(hub.moveableDecks[deckIndex].cards.findIndex(c => c.id == card.id), 1);
        hub.moveableDecks = hub.moveableDecks;
        hub.moveableDecks[deckIndex].refreshBackend();

        // removes the card from the deck 
        // hub.moveableDecks.find(d => d.id == deck.id).cards.splice(hub.cards.findIndex(c => c.id == card.id), 1);

        console.log(deck.cards);

    }

    /**
     * @param {Card} card the card to be checked
     * @param {String} searchValue the value to be checked against
    */
    function passesCardSearch(card, searchValue) {
        if(searchValue == "") {
            return true;
        } else {
            return card.term.toLowerCase().includes(searchValue.toLowerCase()) || card.definition.toLowerCase().includes(searchValue.toLowerCase());
        }
    }

    /**
     * @param {Deck} deck the deck to be checked
     * @param {String} searchValue the value to be checked against
    */
    function passesDeckSearch(deck, searchValue) {
        if(searchValue == "") {
            return true;
        } else {
            return (
            deck.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            deck.description.toLowerCase().includes(searchValue.toLowerCase()) 
//            || maybe implement a way for search to also filter cards in a deck
            );
        }
    }


    /**
     * 
     *  Activates the popup that lets the user launch a game from a deck
     * i dont think this does anything
     * @deprecated
     * @param {Deck} deck
    */
    function playModal(deck) {
        
        let popupDiv = document.createElement('div');
        document.getElementById(`title-group-${deck.id}`).appendChild(popupDiv);


        popupDiv.style = "position:absolute; top: 10%; left: 105%; background-color: aqua; width: 12rem; height: 16rem; z-index: 10000;";

        popupDiv.innerHTML = `
            <h1>Modal</h1>
            <button on:click={() => {hub.activeModal = false}}>Close</button>
        `;


    }

    function closeModal() {
        hub.activeModal = false;
        console.log(hub.activeModal);
    }

    /**
     * @param {Event} ev 
    */
    async function createCard() {

        console.log(hub.newCard);

        const newCard = request('api/aceit_cards/', 'POST', {
            owner: hub.userID,
            term: hub.newCard.term,
            definition: hub.newCard.def,
            public: false
        });

        hub.newCard.term = "";
        hub.newCard.def = "";
        hub.newCard.public = false;

        newCard.then((res) => {

            hub.cards.push(new Card(res.id, res.owner, res.term, res.definition, res.image, res.public));

            if(hub.newCard.deck != "-1") {


                // checks if hub.decks contains the deck that is being updated and if it does then get the cards for that deck, otherwise search through hub.moveableDecks and get the cards from that deck


                let oldCards = hub.decks.find((d) => d.id == hub.newCard.deck) != undefined ? hub.decks.find((d) => d.id == hub.newCard.deck).cards.map(c => c.id) : hub.moveableDecks.find((d) => d.id == hub.newCard.deck).cards.map((c) => c.id);

                console.log(oldCards);

                    const addToDeck = request(`/api/aceit_decks/${hub.newCard.deck}`, 'PUT', 
                    {
                        cards: `${oldCards}, ${res.id}`
                    }
                    );

                    addToDeck.then((deckRes) => {
                        let deckIndex = hub.decks.findIndex((d) => d.id == deckRes.id);
                        // console.log(deckRes.message);
                        // console.log(deckRes.message.match(/([0-9])\w*/g));
                        let activeDecksIndex = hub.moveableDecks.findIndex((d) => d.id == deckRes.message.match(/([0-9])\w*/g)[0]);



                        console.log(deckRes)

                        if(deckIndex != -1) {
                            hub.decks[deckIndex].cards.push(hub.cards.find((c) => c.id == res.id));
                            hub.decks = hub.decks;
                        } else if(activeDecksIndex != -1) {
                            hub.moveableDecks[activeDecksIndex].cards.push(hub.cards.find((c) => c.id == res.id));
                            hub.moveableDecks = hub.moveableDecks;
                        }

                    })

                }


        });

        

    }

    function createDeck() {
        const newDeck = request('api/aceit_decks/', 'POST', {
            owner: hub.userID,
            name: hub.newDeck.name,
            description: hub.newDeck.description,
            public: hub.newDeck.dbPublic,
            cards: ''
        });

        newDeck.then((res) => {
            console.log(res.owner)
            hub.decks.push(new Deck(res.id, res.owner, res.name, res.description, res.public, res.cards));
            hub.decks = hub.decks;
        })
    }

    $: {
            localStorage.setItem("hub-active-decks", JSON.stringify(hub.moveableDecks))
            console.log(localStorage.getItem("hub-active-decks"));
        }
    



    onMount(() => {
        hub.loadDecks({owner: hub.userID});


        hub.moveableDecks = hub.moveableDecks;
    })


</script>

<body>

    <Header/>


    <!-- <button on:click={handleClick} style="position: absolute;">thingy</button> -->

    <!-- the main container for the hub -->
    <div class="hub-container">
        <!-- {hub.activeModal} -->

        {#if hub.activeModal}

            <PopupModal showModal={hub.activeModal} onClose={() => {closeModal()} } onConfirm={() => {closeModal()}} style={"background-color: var(--aceit-primary); border-radius: 1rem;"}>

                <div slot="header">
                    <h1 style="text: var(--aceit-tertiary);">New {hub.currentSide == "cards" ? "Card" : "Deck"}</h1>
                </div>

                <div slot="content" style="text: var(--aceit-tertiary);">

                    {#if hub.currentSide == "cards"}

                    <form on:submit|preventDefault={createCard}>

                        <label for="term">Term: </label>
                        <br/>

                        <input type="text" name="term" required bind:value={hub.newCard.term}/>
                        <br/>

                        <label for="def">Definition: </label>
                        <br/>

                        <textarea name="def" rows="3" required bind:value={hub.newCard.def}></textarea>

                        <br/>
                        <label for="public">Public: </label>
                        <br/>
                        <input type="checkbox" bind:checked={hub.newCard.dbPublic}/>
                        <br/>

                        <label for="deck">Add to Deck: </label>
                        <select name="deck" bind:value={hub.newCard.deck}>

                            <option value="-1"></option>

                            {#each hub.decks as deck}

                                <option value="{deck.id}">{deck.name}</option>

                            {/each}

                            {#each hub.moveableDecks as deck}

                                <option value="{deck.id}">{deck.name}</option>

                            {/each}

                        </select>

                        <br/>

                        <label for="create"></label>
                        <br>

                        <button type="submit" name="create">Create</button>

                    </form>

                    {:else}

                    <form on:submit|preventDefault={createDeck}>

                        <label for="deck-name">Name: </label>
                        <br/>

                        <input type="text" name="deck-name" required bind:value={hub.newDeck.name}/>
                        <br/>

                        <label for="deck-decription">Description: </label>
                        <br/>

                        <input type="text" name="deck-description" required bind:value={hub.newDeck.description}/>
                        <br/>

                        <label for="deck-public">Public: </label>
                        <br/>

                        <input type="checkbox" bind:checked={hub.newDeck.dbPublic}/>
                        <br/>

                        <label for="create"></label>
                        <br/>

                        <button type="submit" name="create">Create</button>

                    </form>

                    
                    {/if}
                </div>
            
            </PopupModal>

        {/if}

        <!-- hub field - where the decks are dragged around and placed down -->
        <div class="hub-field" id="hub-field" on:dragover={ ev => {ev.preventDefault()}} on:drop={ ev => {dragDeckEnd(ev)}}>

            {#each hub.moveableDecks as deck}

            <div class="draggable-deck" id="field-deck-{deck.id}" style="position: absolute; left: {deck.left}px; top: {deck.top}px;" draggable="true" on:dragstart={ev => dragStart(ev, deck, "field-deck")} on:dragover={ev => {ev.preventDefault()}} on:drop={ev => {dragCardEnd(ev)}}>
                <DeckElement deck={deck} extraCardFunc={(card) => {extraFunc(deck, card)}} extraCardClass={"aceit-button aceit-close-button aceit-button-primary"} extraCardText={"X"} extraDeckClass={"aceit-button aceit-button-tertiary"} extraDeckFunc={() => {playModal(deck)}} extraDeckText={'🚀'}> </DeckElement>
            </div>

            {/each}
        </div>

        <!-- hub sidebar - where the decks and cards are stored -->
        <div class="hub-sidebar" >

            <!-- controller - switch between decks and card & filter/search -->
            <div class="hub-controller">
                <!-- controller buttons - switch between the cards and the decks in the sidebar  -->
                <div class="hub-controller-buttons">
                    <button class="hub-controller-button" id="hub-controller-button-cards" data-selected="true" on:click={() => {refreshSideBar()} }>Cards</button>
                    <button class="hub-controller-button" id="hub-controller-button-decks" data-selected="false" on:click={() => {refreshSideBar()} }>Decks</button>
                </div>
                <input type="search" placeholder="Search" bind:value={hub.searchValue}/>
            </div>
            
            <!-- new button - makes a popup modal that creates a new card or deck depending on the current selection -->
                <button on:click={() => {hub.activeModal = true}} class="aceit-button aceit-button-primary">New</button>

            {#if hub.currentSide == "cards"}

                {#await hub.loadCards({owner: hub.userID})}

                    {#if hub.cards.length <= 0} 

                    <p>Loading Cards...</p>

                    {:else }
                        {#each hub.cards as card}

                            {#if passesCardSearch(card, hub.searchValue)}

                                <div class="sidebar-card; draggable" draggable="true" style="overflow-x: visible;" on:dragstart={ev => dragCardStart(ev, card, "sidebar-card")}>
                                    <CardElement title={card.term} definition={card.definition} style={'width: fit-content; min-width: 14rem; height:fit-content; padding-2rem;'} draggable="true"> </CardElement>
                                </div>
                            
                            {/if}

                        {/each}

                    {/if}
                {:then cards} 

                    {#if hub.cards.length <= 0}
                        <p>No Cards found 😢 Maybe you should make some? </p>
                    {/if}

                    {#each hub.cards as card}

                        {#if passesCardSearch(card, hub.searchValue)}

                            <div class="sidebar-card; draggable" draggable="true" on:dragstart={ev => {dragCardStart(ev, card, "sidebar-card")}}>
                                <CardElement title={card.term} definition={card.definition} style={'width: fit-content; min-width: 14rem; height:fit-content; padding-2rem;'} > </CardElement>
                            </div>

                        {/if}
                    {/each}
                {/await}

                

            {:else if hub.currentSide == "decks"}

            <div class="hub-sidebar-decks-dropzone">

            
            {#await hub.decks.length == 0 && hub.moveableDecks == 0 ? hub.loadDecks({owner: hub.userID}) : Promise.resolve()}
                <p>Loading Decks...</p>
            {:then decks} 
            <div on:dragover={ ev => ev.preventDefault()} on:drop={ev => {dragDeckEnd(ev)}} style="flex-grow: 1; min-width:90%" id=hub-sidebar-decks>
            

                {#if hub.decks.length == 0 && hub.moveableDecks.length == 0}
                <p>No Decks Found 😢 Maybe you should make one?</p>

                {:else if hub.moveableDecks.length != 0 && hub.decks.length == 0}

                <p>All your decks are on the board!</p>
                <p>You can drag them back here!</p>

                {/if}
                
                {#each hub.decks as deck}

                    {#if passesDeckSearch(deck, hub.searchValue)}

                        <div draggable="true" on:dragstart={(event) => dragStart(event, deck, "sidebar-deck")} id="sidebar-deck-{deck.id}" on:drop={ev => {dragCardEnd(ev)}}>
                            <DeckElement deck={deck}> </DeckElement>
                        </div>

                    {/if}

                {/each}
                    
                    
                    
                </div>
                    
                    
                    {/await}

            </div>

                    
                    
                    
                
                
            {/if}



        </div>

    </div>



</body>

<style>

    .hub-container {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .hub-field {
        background-color: var(--aceit-secondary);
        flex-grow: 4;
    }

    .hub-sidebar {
        background-color: var(--aceit-bs-primary);
        /* flex-grow: 1; */
        padding: 0.5rem;
        flex-shrink: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        overflow-y: auto;
        width: fit-content;
        max-width: 20rem;

    }

    .sidebar-card {
        
    }

    .hub-controller {
        background-color: var(--aceit-accent);
        border-radius: 0.5rem;
        margin: 1.5rem;
        padding: 0.5rem;
        display: flex;
        gap: 0.75rem;
        flex-direction: column;
        align-items: center;

    }
    .hub-controller-buttons {
        display: flex;
        gap: 0.75rem;
        border-radius: 0.25rem;
        flex-grow: 1;        
    }
    .hub-controller-button {
        color: antiquewhite;
        border-radius: 0.25rem;
    }
    .hub-controller-button[data-selected="false"] {
        background-color: var(--aceit-tertiary);
        border-color: var(--aceit-tertiary);
    }
    .hub-controller-button[data-selected="true"] {
        background-color: var(--aceit-bs-primary);
        border-color: var(--aceit-bs-primary);
    }
    .draggable {
        width: fit-content;
        height: fit-content;
    }
    .draggable-deck {
        height: fit-content;
        max-height: 60%;
    }
    .modal-container {
        position: fixed; 
        top: 50%; 
        left: 50%; 
        /* transform: translate(-50%, -50%);  */
        z-index: 1000;
        animation: pop-up 0.5s ease-out;
    }

    @keyframes pop-up {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
}


</style>

<!-- 
     |\ | |  ||\ \ /(_~     |~)|_~|\/||_~|\/||~)|_~|~)
     |~\|_|/\||~\ | ,_)     |~\|__|  ||__|  ||_)|__|~\

        \ //~\| |    |\ |~)|_~    | ||\ ||/~\| ||_~
         | \_/\_/    |~\|~\|__    \_/| \||\_X\_/|__

      (J U S T   L I K E   E V E R Y O N E   E L S E)
      _____         _____         _____         _____
    .'     '.     .'     '.     .'     '.     .'     '.
   /  o   o  \   /  o   o  \   /  o   o  \   /  o   o  \
  |           | |           | |           | |           |
  |  \     /  | |  \     /  | |  \     /  | |  \     /  |
   \  '---'  /   \  '---'  /   \  '---'  /   \  '---'  /
    '._____.'     '._____.'     '._____.'     '._____.'
      _____         _____         _____         _____
    .'     '.     .'     '.     .'     '.     .'     '.
   /  o   o  \   /  o   o  \   /  o   o  \   /  o   o  \
  |           | |           | |           | |           |
  |  \     /  | |  \     /  | |  \     /  | |  \     /  |
   \  '---'  /   \  '---'  /   \  '---'  /   \  '---'  /
    '._____.'     '._____.'     '._____.'     '._____.'
      _____         _____         _____         _____
    .'     '.     .'     '.     .'     '.     .'     '.
   /  o   o  \   /  o   o  \   /  o   o  \   /  o   o  \
  |           | |           | |           | |           |
  |  \     /  | |  \     /  | |  \     /  | |  \     /  |
   \  '---'  /   \  '---'  /   \  '---'  /   \  '---'  /
    '._____.'     '._____.'     '._____.'     '._____.'
      _____         _____         _____         _____
    .'     '.     .'     '.     .'     '.     .'     '.
   /  o   o  \   /  o   o  \   /  o   o  \   /  o   o  \
  |           | |           | |           | |           |
  |  \     /  | |  \     /  | |  \     /  | |  \     /  |
   \  '---'  /   \  '---'  /   \  '---'  /   \  '---'  /
    '._____.'     '._____.'     '._____.'     '._____.'
      _____         _____         _____         _____
    .'     '.     .'     '.     .'     '.     .'     '.
   /  o   o  \   /  o   o  \   /  o   o  \   /  o   o  \
  |           | |           | |           | |           |
  |  \     /  | |  \     /  | |  \     /  | |  \     /  |
   \  '---'  /   \  '---'  /   \  '---'  /   \  '---'  /
    '._____.'     '._____.'     '._____.'     '._____.'
 -->