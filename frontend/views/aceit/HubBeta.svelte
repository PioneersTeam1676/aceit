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

    /** @type {Hub} */
    let hub;
    hub = new Hub(-1);

    let thingy = "oishdiu"

    let myCurrentSide = hub.currentSide;

    $: sidebarItems = hub.currentSide == 'cards' ? hub.cards : hub.decks;
    

    async function handleClick() {
        console.log(hub.cards);
    }

    // onMount(() => {
        
    //     hub = new Hub(-1);

    // })

    function refreshSideBar() {
        hub.inverseSelection();
        hub.currentSide = hub.currentSide;
    }




</script>

<body>

    <Header/>


    <button on:click={handleClick} style="position: absolute;">thingy</button>

    <!-- the main container for the hub -->
    <div class="hub-container">

        <!-- hub field - where the decks are dragged around and placed down -->
        <div class="hub-field">

        </div>

        <!-- hub sidebar - where the decks and cards are stored -->
        <div class="hub-sidebar">

            <!-- controller - switch between decks and card & filter/search -->
            <div class="hub-controller">
                <!-- controller buttons - switch between the cards and the decks in the sidebar  -->
                <div class="hub-controller-buttons">
                    <button class="hub-controller-button" id="hub-controller-button-cards" data-selected="true" on:click={() => {refreshSideBar()} }>Cards</button>
                    <button class="hub-controller-button" id="hub-controller-button-decks" data-selected="false" on:click={() => {refreshSideBar()} }>Decks</button>
                </div>
                <input type="search" placeholder="Search" bind:value={hub.searchValue}/>
                {hub.searchValue}
            </div>

            {#if hub.currentSide == "cards"}

                {#await hub.loadCards({owner: hub.userID})}
                    <p>Loading Cards...</p>
                {:then cards} 
                    {#each hub.cards as card}
                    <div class="sidebar-card">
                        <Draggable moveableCard={card}>
                            <CardElement title={card.term} definition={card.definition} style={'width: fit-content; min-width: 14rem; height:fit-content; padding-2rem;'} draggable="true"> </CardElement>
                        </Draggable>
                    </div>
                    {/each}
                {/await}

                

            {:else if hub.currentSide == "decks"}

            {#await hub.loadDecks({owner: hub.userID})}
                <p>Loading Decks...</p>
            {:then decks} 

                {#if decks.length == 0}
                  <p>No Decks Found 😢 Maybe you should make one?</p>
                {/if}

                {#each hub.decks as deck}
                    <Draggable moveableCard={deck}>
                        <DeckElement deck={deck}> </DeckElement>
                    </Draggable>
                {/each}

                

                

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


</style>