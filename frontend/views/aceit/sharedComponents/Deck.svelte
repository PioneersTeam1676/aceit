<script>
    import Card from './Card.svelte';
    import { Deck } from '../Deck.js'
    import Draggable from './Draggable.svelte';
    import { launch } from './../../utils.js'

    /**@type {Deck}*/
    export let deck;

    export let extraCardFunc, extraCardClass, extraCardText;

    export let extraDeckFunc, extraDeckClass, extraDeckText;

    let popup = false;

</script>

<div class="deck">
    <div class="item-title">

        <div class="title-group" id="title-group-{deck.id}">

            <span class="title">{deck.name}</span>

            {#if extraDeckFunc != undefined && extraDeckText != undefined}
                <button class="{extraDeckClass != undefined ? extraDeckClass : ""}" on:click={() => {popup = !popup}} style="width: min-content; height: min-content;">{extraDeckText}</button>
            {/if}


        </div>
        <span class="description">{deck.description}</span>
    </div>



        {#each deck.cards as card}
            <Draggable moveableCard={card} style={"padding: 0.25rem"}>
                <Card title={card.term} definition={card.definition} extraFunc={() => {extraCardFunc(card) }} extraClass={extraCardClass} extraText={extraCardText} style={'width: fit-content; min-width: 8rem; height:fit-content; padding-2rem;'}/>
            </Draggable>
        {/each}

        {#if popup}

        <div class="popup">
            <h1>Launch </h1>
            <button class="aceit-button aceit-button-primary" on:click={() => {launch(deck, 'flashcards')}}>Flashcards</button>
            <button class="aceit-button aceit-button-primary">Memory</button>
            <button class="aceit-button aceit-button-primary">Learn</button>
            <button class="aceit-button aceit-button-primary" on:click={() => {launch(deck, 'hangman')}}>Frog Escape</button>
            <button class="aceit-button aceit-button-primary">Boss Battle</button>
            <!-- <button on:click={() => {popup = false}}>Bye</button> -->
        </div>

        {/if}





</div>


<style>

.deck {
    background-color: var(--aceit-primary);
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    width: fit-content;
    height: 12.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    overflow-x: visible;
    min-width: 14rem;
    

    transition: all 0.2s ease;
}

.deck:hover {
        background-color: var(--aceit-bs-primary);
        box-shadow: 0px 0px 6px 1px rgba(100,100,100,0.5);
    }

.title {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 32px;
    color: var(--aceit-accent);
}
.description {
    color: white;
    font-size: smaller;
}
.title-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow-x: visible;
}
.item-title {
    overflow-x: visible;
}
.popup {
    position: absolute;
    top: 10%;
    left: 105%;
    background-color: aqua;
    width: 12rem;
    height: fit-content;
    z-index: 1000;
    animation: popup 0.5s ease-out;
    border-radius: 5px;
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
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