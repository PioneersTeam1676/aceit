<script>
    import { MoveableCard } from "../Card.js";

    import { MoveableDeck } from "../Deck.js"

    /**@type {MoveableCard}*/
    export let moveableCard;

    /**@type {MoveableDeck}*/
    export let moveableDeck;

    /**@type String*/
    export let style;

    let draggable = moveableCard != undefined ? moveableCard : moveableDeck;

</script>

<div class="draggable" draggable="true" style="{style != undefined ? style : ''}">
<slot></slot>
</div>

<style>

    .draggable {
        width: fit-content;
        height: fit-content;
    }

</style>