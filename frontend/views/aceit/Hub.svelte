<!-- i added z-indexing on mouse down so that dragging a card over toolbar divs wouldn't break it -Victor -->
<script>
console.log("185")
import { store, get } from 'svelte/store';
import { onMount } from 'svelte';

import Header from './sections/Header.svelte'

import Toolbar from './widgets/Toolbar.svelte'

import { playCards, newCard } from '../../js/stores.js';




let cards = [
    {
        owner: "Tester",
        term: "SO4 2-",
        def: "Sulfate",
        image: "https://cdn1.byjus.com/wp-content/uploads/2019/08/Sulfate-ion.png",
        labels: ["debug", "data", "Chem"],
        id: "22",
        moving: false,
        left: 0,
        top: 0,
        color: "#00ccff",
        intersecting: false,
        intersectId: null,
        zIndex: 100
    },
    {
        owner: "Tester",
        term: "SO3 2-",
        def: "Sulfite",
        image: "https://cdn1.byjus.com/wp-content/uploads/2019/08/Sulfate-ion.png",
        labels: ["debug", "data", "Chem"],
        id: "23",
        moving: false,
        left: 0,
        top: 0,
        color: "#ffcc00",
        intersecting: false,
        intersectId: null,
        zIndex: 100
    },
    {
        owner: "Tester",
        term: "C6H12O6",
        def: "Glucose",
        image: "https://cdn1.byjus.com/wp-content/uploads/2019/08/Sulfate-ion.png",
        labels: ["debug", "data", "Chem", "Bio"],
        id: "24",
        moving: false,
        left: 0,
        top: 0,
        color: "#ffcc00",
        intersecting: false,
        intersectId: null,
        zIndex: 100
    }
];


let sections = [
    {
        name: "Chem",
        labels: [{name: "debug", color: "#00ccff"}, {name: "chem", color: "#00ffcc"}],
        cards: [],
        id: "section1",
        color: "#ffcc00",
        intersecting: false,
        intersectId: null,
        top: 0,
        left: 0,
        moving: false,
        zIndex: 100
    },
    {
        name: "BIO!",
        labels: [{name: "debug", color: "#00ccff"}, {name: "chem", color: "#00ffcc"}],
        cards: [],
        id: "section2",
        color: "#ffcc00",
        intersecting: false,
        intersectId: null,
        top: 0,
        left: 0,
        moving: false,
        zIndex: 100
    }
];


let showNewModal = false;
let loadNewCards = false;

let sectNames = [];

for(let i = 0; i < sections.length; i++) {
    sectNames.push(sections[i].name);
}


// card drag stuff
let cardSelected = false;

let currentCardIndex = 0;


const cardMouseDown = (card, index) => {

    currentCardIndex = index;
    cardSelected = true;
    cards[index] = card;
    cards[currentCardIndex].moving = true;
    cards[currentCardIndex].zIndex = 10000000;
};

const onMouseMoveCard = (e) => {


    if(cards[currentCardIndex].moving) {
        cards[currentCardIndex].left += e.movementX;
        cards[currentCardIndex].top += e.movementY;

    }

    for(let s in sections) {
        let sect = document.getElementById(sections[s].id).getBoundingClientRect();
        let card = document.getElementById(cards[currentCardIndex].id).getBoundingClientRect();
        if(cards[currentCardIndex].moving && !(sect.right < card.left ||
        sect.left > card.right ||
        sect.bottom < card.top ||
        sect.top > card.bottom)) {
            if(sections[s].intersecting == false) {
                sections[s].intersectId = cards[currentCardIndex].id;
                cards[currentCardIndex].intersectId = sections[s].id;
            }
            sections[s].intersecting = true;
            cards[currentCardIndex].intersecting = true;

            // console.log("intersecting!");

        } else if(cards[currentCardIndex].moving) {
            console.log("yep!")

            sections[s].intersecting = false;
            sections[s].intersectId = null;
            if(sections[s].intersectId != null) {

                cards[currentCardIndex].intersectId = null;
                cards[currentCardIndex].intersecting = false;
            }



        }

    }

}

const onMouseUpCard = () => {
    cards[currentCardIndex].moving = false;

    if(cards[currentCardIndex].intersecting) {



        console.log("debug!")
        for(let i in sections) {
            if(cards[currentCardIndex].intersectId == sections[i].id && cards[currentCardIndex].intersecting && sections[i].intersecting && cardSelected) {
                sections[i].cards = [...sections[i].cards, cards[currentCardIndex]];

                console.log("hellooo!!")
            }
        }
    }
    cardSelected = false;
    cards[currentCardIndex].zIndex = 100;
}



const giveSecretCards = () => {
    return cards;
}

$: {

    cards = [...giveSecretCards(), $newCard];
    console.log(giveSecretCards())

}






//section drag stuff
let sectionSelected = false;

let currentSectIndex = 0;

const sectMouseDown = (sect, index) => {

    console.log("HELLO")

    currentSectIndex = index;
    sectionSelected = true;
    sections[index] = sect;
    sections[currentSectIndex].moving = true;
    sections[currentSectIndex].zIndex = 1000000;

};

const onMouseMoveSect = (e) => {


    if(sections[currentSectIndex].moving) {


        sections[currentSectIndex].left += e.movementX;
        sections[currentSectIndex].top += e.movementY;

    }



}

const onMouseUpSect = () => {
    sections[currentSectIndex].moving = false;
    sections[currentSectIndex].zIndex = 100;
    sectionSelected = false;
}

const removeCard = (sectID, cardID) => {

    sections[sectID].cards.splice(cardID, 1);
    sections[sectID].cards = sections[sectID].cards;
    // i know this is weird but if u dont reasign the array to itself svelte dosent know that it changed so it dosent update the frontend

    console.log(get(playCards));

}


</script>


<main style=" margin: 0; height: 100%; overflow: hidden">


<Header tab=0 />

<Toolbar passedSectNames={sectNames} passedSects={sections}/>


<div id="catpin" on:mousemove={onMouseMoveSect} on:mousemove={onMouseMoveCard} on:mouseup={ () => {onMouseUpCard(); onMouseUpSect()}} on:touchmove={onMouseMoveSect} on:touchmove={onMouseMoveCard} on:touchend={ () => {onMouseUpCard(); onMouseUpSect()}}>


<div id="sections" class="sections">
{#each sections as s, x}

    <div class="section" id="{s.id}" on:mousedown={() => sectMouseDown(s, x)} on:touchstart={() => sectMouseDown(s, x)} style:top={s.top}px style:left={s.left}px style="user-select: none; z-index: {s.zIndex}; overflow-y:auto;;" draggable="false">

        <div class="Labels" style>
            <p>{s.name}</p>
            {#each s.labels as label, i}

            <div style="display: inline-flex; margin: 5px;">

                <svg id="Layer_1" data-name="Layer 1" fill="{label.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.01 16.01" height="30px">
                    <path d="m14.8,0c.06,0,.54-.04.9.32.27.28.3.62.3.71v13.56c0,.12-.03.58-.4.97-.49.51-1.16.45-1.24.44H1.32c-.07,0-.57.04-.95-.35C-.01,15.28,0,14.8,0,14.73V1.08c0-.06-.04-.42.21-.72C.5,0,.93,0,.98,0h13.82Z"/>
                </svg>

                <p style="margin: 0px; margin-left:5px; padding:0px; background-color:{label.color}">{label.name}</p>
            </div>

            {/each}
        </div>

        <p class="section-p" style="{s.color}">This Sure Is a Section Name</p>

        <div class="add-card">
            <p style="text-align:center">+</p>
        </div>
        {#each s.cards as card, i}
            <div class="card-cat">
                <!-- i just copy pasted my stuff from toolbar -Victor -->
                <button id="closeDiv1" class="aceit-close-button aceit-button-primary aceit-button" on:click={() => removeCard(x, i)}>
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
                <!-- <button class="" on:click={() => removeCard(x, i)}>X</button> -->
                <h1>{card.term}</h1>
                <p>{card.def}</p>
            </div>
        {/each}

    </div>

{/each}
</div>

<div class="free-cards">
    {#each cards as card, i}

    <div class="card-cat" style:left={card.left}px style:top={card.top}px style="user-select: none; z-index: {card.zIndex}" id="{card.id}" draggable="false" on:mousedown={() => cardMouseDown(card, i)} on:touchstart={() => cardMouseDown(card, i)}>

        <h1 draggable="false">{card.term}</h1>
        <p draggable="false">{card.def}</p>
        <!-- <img src="{card.image}" alt="{card.term}" draggable="false"> -->
    </div>

    {/each}
</div>

</div>

</main>



<style>

#catpin{
    color: #ffcc00;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column;
}

.card-cat{
    width: fit-content;
    height: fit-content;
    padding: 10px;
    background-color: dimgray;
    border-radius: 10px;
    margin: 10px;
    position: relative;

}

.section{

    background-color: #6CC4A1;
    width: fit-content;
    height: fit-content;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    max-height: 80vh;
    float: left;
    overflow-y: auto;
    max-width: 25vw;
}

.add-card {
    background-color: #63b091a6;
    border-radius: 5px;

}
.sections{
    display: flex;
}
.new-but {
    margin-top: 20vh;
    justify-content: center;
    display: flex;
}
.free-cards {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
}
#create-new {
    background-color: #6CC4A1;
    border: #6CC4A1;
    border-radius: 10px;
    color: white;
    width: 30vh;
    height: 10vh;
    font-size: 5vh;
    padding: 2px;
}

#create-new:hover {
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    background-color: #67b797;
}
</style>