<script>
    import { MoveableCard } from "../Card.js";

    import { MoveableDeck } from "../Deck.js"

    import Hub from "../Hub.js";

    /**@type {MoveableDeck}*/
    export let moveableDeck;

    /**@type {Hub}*/
    export let hub;

    // let draggable = moveableCard != undefined ? moveableCard : moveableDeck;

</script>

<div class="draggable" on:mousedown={() => {moveableDeck =  hub.mouseDown()}} on:touchstart={() => {moveableDeck = moveableDeck.mouseDown()}}>
<slot></slot>
</div>

<style>

    .draggable {
        width: fit-content;
        height: fit-content;
    }

</style>