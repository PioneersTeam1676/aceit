<script>

    // import svelte components
    import Header from '../aceit/sections/Header.svelte';
    import CardElement from './sharedComponents/Card.svelte';

    // import js stuff
    import { Card, MoveableCard } from "./Card.js";
    import Hub from "./Hub.js"
    import request from "../api.js";
    import { Deck } from "./Deck.js"
    import { onMount } from 'svelte';
    import Draggable from './sharedComponents/Draggable.svelte';
    import DeckElement from './sharedComponents/Deck.svelte';
    import { prevent_default } from 'svelte/internal';

    /** @type {Hub} */
    let hub;
    hub = new Hub(-1);    

    async function handleClick() {
        console.log(hub.cards);
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

        // set the data that is being transfered durring the drag
        deck.origin = origin;
        ev.dataTransfer.setData("text/plain", JSON.stringify(deck));


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
        

        // console.log(ev);
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

        if(data.origin == "sidebar") {

            if(ev.target.id == "hub-field") {


            let sideBarDeckElement = document.getElementById(`sidebar-deck-${data.id}`);

            sideBarDeckElement.style.display = "none";

            let containerDiv = document.createElement('div');
            document.getElementById("hub-field").appendChild(containerDiv);
            containerDiv.style.position = "absolute";
            containerDiv.style.left = ev.clientX + "px";
            containerDiv.style.top = ev.clientY + "px";
            containerDiv.setAttribute("draggable", "true");
            containerDiv.addEventListener("dragstart", (ev) => dragStart(ev, data, "field"));
            containerDiv.id = `field-deck-${data.id}`;


            let deckComp = new DeckElement({
                target: containerDiv,
                props: {
                    deck: data,
                }
            });


            console.log(deckComp);

        }



    } else if(data.origin == "field") {

        let fieldDeckElement = document.getElementById(`field-deck-${data.id}`);

        if(ev.target.id == "hub-field") {

            fieldDeckElement.style.left = ev.clientX + "px";
            fieldDeckElement.style.top = ev.clientY + "px";

        } else {


            let sideBarDeckElement = document.getElementById(`sidebar-deck-${data.id}`);

            sideBarDeckElement.style.display = "block";


            fieldDeckElement.remove();

        }






    }

    console.log(ev)


    }

    /**
     * @param {DragEvent} ev
    */
    function dragCardEnd(ev) {
        ev.preventDefault();
        console.log(ev);

        console.log(ev.target.id.substring(0, 12))

        if(data.origin = "sidebar") {
            if(ev.target.id.substring(0, 12) == "field-deck-") {
                console.log(ev.target.id)
            }
        }

    
    }


</script>

<body>

    <Header/>


    <!-- <button on:click={handleClick} style="position: absolute;">thingy</button> -->

    <!-- the main container for the hub -->
    <div class="hub-container" >

        <!-- hub field - where the decks are dragged around and placed down -->
        <div class="hub-field" id="hub-field" on:dragover={ ev => {ev.preventDefault()}} on:drop={ ev => {dragDeckEnd(ev)}}>

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
                <!-- {hub.searchValue} -->
            </div>

            {#if hub.currentSide == "cards"}

                {#await hub.loadCards({owner: hub.userID})}

                    {#if hub.cards.length <= 0} 

                    <p>Loading Cards...</p>

                    {:else }
                        {#each hub.cards as card}
                            <div class="sidebar-card; draggable" draggable="true">
                                <CardElement title={card.term} definition={card.definition} style={'width: fit-content; min-width: 14rem; height:fit-content; padding-2rem;'} draggable="true"> </CardElement>
                            </div>
                        {/each}

                    {/if}
                {:then cards} 

                    {#if hub.cards.length <= 0}
                        <p>No Cards found 😢 Maybe you should make some? </p>
                    {/if}

                    {#each hub.cards as card}
                    <div class="sidebar-card; draggable" draggable="true">
                            <CardElement title={card.term} definition={card.definition} style={'width: fit-content; min-width: 14rem; height:fit-content; padding-2rem;'} draggable="true"> </CardElement>
                    </div>
                    {/each}
                {/await}

                

            {:else if hub.currentSide == "decks"}

            
            
            {#await hub.loadDecks({owner: hub.userID})}
                <p>Loading Decks...</p>
            {:then decks} 
            <div on:dragover={ ev => ev.preventDefault()} on:drop={ev => {dragDeckEnd(ev)}} style="flex-grow: 1; min-width:90%">
            
                {#if decks.length == 0}
                <p>No Decks Found 😢 Maybe you should make one?</p>
                {/if}
                
                {#each hub.decks as deck}
                <!-- <Draggable moveableCard={deck}> -->
                    <div draggable="true" on:dragstart={(event) => dragStart(event, deck, "sidebar")} id="sidebar-deck-{deck.id}" on:dragover={ev => ev.preventDefault()} on:drop={ev => {dragCardEnd(ev)}}>
                        <DeckElement deck={deck}> </DeckElement>
                    </div>
                    <!-- </Draggable> -->
                    {/each}
                    
                    
                    
                </div>
                    
                    
                    {/await}
                    
                    
                    
                
                
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
        background-color: cadetblue;
        flex-grow: 4;
    }

    .hub-sidebar {
        background-color: chocolate;
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
        background-color: blueviolet;
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
        background-color: darkmagenta;
        border-color: darkmagenta;
    }
    .hub-controller-button[data-selected="true"] {
        background-color: fuchsia;
        border-color: fuchsia;
    }
    .draggable {
        width: fit-content;
        height: fit-content;
    }


</style>