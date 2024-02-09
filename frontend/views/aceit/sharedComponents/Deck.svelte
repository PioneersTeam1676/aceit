<script>
    import Card from './Card.svelte';
    import { Deck } from '../Deck.js'
    import Draggable from './Draggable.svelte';

    /**@type {Deck}*/
    export let deck;

    /**@type {String}*/
    export let left;

    /**@type {String}*/
    export let top;

    console.log(top)
</script>

<div class="deck">
    <div class="item-title">
        <span class="title">{deck.name}</span>
        <span class="description">{deck.description}</span>
    </div>



        {#each deck.cards as card}
            <Draggable moveableCard={card} style={"padding: 0.25rem"}>
                <Card title={card.term} definition={card.definition} style={'width: fit-content; min-width: 8rem; height:fit-content; padding-2rem;'} draggable="true"/>
            </Draggable>
        {/each}





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
    overflow: auto;
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

</style>