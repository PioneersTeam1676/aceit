<!-- written by Victor (ikik some of this js code is absolutely horrible it makes me wanna scooter ankle but i dont wanna refactor it) -->
<script>

import FlashcardWidget from './FlashcardWidget.svelte'
import BossBattleWidget from './BossBattleWidget.svelte'
import HangmanWidget from './HangmanWidget.svelte'
import MemoryWidget from './MemoryWidget.svelte'
import LabelWidget from './LabelWidget.svelte'
import CardWidget from './CardWidget.svelte'

import Widget from './Widget.svelte'

export let passedSectNames;
export let passedSects;


//draggable div stuff
export let left = 0;
export let top = 0;
let modalWidth = 280;
let modalHeight = 420;


let moving = false;

function onMouseDown() {
    moving = true;
}

function onMouseMove(e) {
    if (moving) {
        left += e.movementX;
        top += e.movementY;
    }
}

function onMouseUp() {
    moving = false;
}


import { onMount } from 'svelte';
    import BossBattle from '../games/boss-battle/BossBattle.svelte';
    import LearnWidget from './LearnWidget.svelte';
onMount(async () => {
    // console.log('loaded');

    var toggleToolbar = document.getElementById('toggleToolbar');
    var toolbarButtons = document.getElementById('toolbarButtons');
    var createButtons = document.getElementById('create-buttons');

    // toolbarButtons.style.opacity = '0';

    // ifAllClosedResetDrag();

    toggleToolbar.addEventListener('click', function() {
        toolbarButtons.classList.toggle('hidden');
        toggleToolbar.classList.toggle('close');
        createButtons.classList.toggle('hidden-create-button');

        toggle();
    });

    //issue with intro anim is that display is none when animating
    async function toggle() {

        // if (toolbarButtons.style.opacity === '0')
        if (toolbarButtons.classList.contains('hidden'))
        {
            // toolbarButtons.style.opacity = '1';
            toggleToolbar.innerText = '';

            //<i class="fa-solid fa-circle-xmark"></i>
            let icon = document.createElement("i");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-circle-xmark");
            toggleToolbar.appendChild(icon);
        }
        else
        {
            // await new Promise(resolve => setTimeout(resolve, 100));
            // toolbarButtons.style.opacity = '0';
            toggleToolbar.innerText = '';

            //<i class="fa-solid fa-screwdriver-wrench"></i>
            let icon = document.createElement("i");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-screwdriver-wrench");
            toggleToolbar.appendChild(icon);
        }
        ifAllClosedResetDrag();
    }

    var button1 = document.getElementById('button1');
    var button2 = document.getElementById('button2');
    var button3 = document.getElementById('button3');
    var button4 = document.getElementById('button4');
    var button5 = document.getElementById('create-label');
    var button6 = document.getElementById('create-card');
    var button7 = document.getElementById('button5');
    var div1 = document.getElementById('div1');
    var div2 = document.getElementById('div2');
    var div3 = document.getElementById('div3');
    var div4 = document.getElementById('div4');
    var div5 = document.getElementById('div5');
    var div6 = document.getElementById('div6');
    var div7 = document.getElementById('div7');

    //position them offscreen
    div1.style.transform = 'translateY(-5000px)';
    div2.style.transform = 'translateY(-5000px)';
    div3.style.transform = 'translateY(-5000px)';
    div4.style.transform = 'translateY(-5000px)';
    div5.style.transform = 'translateY(-5000px)';
    div6.style.transform = 'translateY(-5000px)';
    div7.style.transform = 'translateY(-5000px)';

    button1.addEventListener('click', function() {
        div1.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div1.classList.contains('hidden'))
        {
            div1.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div1.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });

    button2.addEventListener('click', function() {
        div2.classList.toggle('hidden');
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div2.classList.contains('hidden'))
        {
            div2.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div2.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });

    button3.addEventListener('click', function() {
        div3.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div3.classList.contains('hidden'))
        {
            div3.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div3.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });

    button4.addEventListener('click', function() {
        div4.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div4.classList.contains('hidden'))
        {
            div4.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div4.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });

    button5.addEventListener('click', function() {
        div5.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div5.classList.contains('hidden'))
        {
            div5.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div5.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });
    button6.addEventListener('click', function() {
        div6.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div7.classList.contains('hidden')) {
            div7.classList.toggle('hidden');
            div7.style.transform = 'translateY(-5000px)';
        }
        if (div6.classList.contains('hidden'))
        {
            div6.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div6.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });
    button7.addEventListener('click', function() {
        div7.classList.toggle('hidden');
        if (!div2.classList.contains('hidden')) {
            div2.classList.toggle('hidden');
            div2.style.transform = 'translateY(-5000px)';
        }
        if (!div1.classList.contains('hidden')) {
            div1.classList.toggle('hidden');
            div1.style.transform = 'translateY(-5000px)';
        }
        if (!div3.classList.contains('hidden')) {
            div3.classList.toggle('hidden');
            div3.style.transform = 'translateY(-5000px)';
        }
        if (!div5.classList.contains('hidden')) {
            div5.classList.toggle('hidden');
            div5.style.transform = 'translateY(-5000px)';
        }
        if (!div4.classList.contains('hidden')) {
            div4.classList.toggle('hidden');
            div4.style.transform = 'translateY(-5000px)';
        }
        if (!div6.classList.contains('hidden')) {
            div6.classList.toggle('hidden');
            div6.style.transform = 'translateY(-5000px)';
        }
        if (div7.classList.contains('hidden'))
        {
            div7.style.transform = 'translateY(-5000px)';
        }
        else
        {
            div7.style.transform = 'translateY(0)';
        }
        ifAllClosedResetDrag();
    });

    var close1 = document.getElementById('closeDiv1');
    var close2 = document.getElementById('closeDiv2');
    var close3 = document.getElementById('closeDiv3');
    var close4 = document.getElementById('closeDiv4');
    var close5 = document.getElementById('closeDiv5');
    var close6 = document.getElementById('closeDiv6');
    var close7 = document.getElementById('closeDiv7');

    close1.addEventListener('click', function() {
        div1.style.transform = 'translateY(-5000px)';
        div1.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close2.addEventListener('click', function() {
        div2.style.transform = 'translateY(-5000px)';
        div2.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close3.addEventListener('click', function() {
        div3.style.transform = 'translateY(-5000px)';
        div3.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close4.addEventListener('click', function() {
        div4.style.transform = 'translateY(-5000px)';
        div4.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close5.addEventListener('click', function() {
        div5.style.transform = 'translateY(-5000px)';
        div5.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close6.addEventListener('click', function() {
        div6.style.transform = 'translateY(-5000px)';
        div6.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    close7.addEventListener('click', function() {
        div7.style.transform = 'translateY(-5000px)';
        div7.classList.toggle('hidden');
        ifAllClosedResetDrag();
    });

    function ifAllClosedResetDrag() {
        if (div1.classList.contains('hidden') && div2.classList.contains('hidden') && div3.classList.contains('hidden') && div4.classList.contains('hidden') && div5.classList.contains('hidden') && div6.classList.contains('hidden') && div7.classList.contains('hidden'))
        {
            left = window.innerWidth/2;
            top = window.innerHeight/2;
        }
    }




});


</script>

<main>
    <div id="create-buttons" class="create-buttons toolbar">
        <button id="create-label" class="aceit-button-secondary aceit-button">
            <i class="fa-solid fa-tags"></i>
        </button>
        <button id="create-card" class="aceit-button-secondary aceit-button">
            <i class="fa-solid fa-window-maximize"></i>
            <!-- needs a better icon, I can't find a good one -->
        </button>
    </div>
    <div class="toolbar">
        <div id="toolbarButtons">
            <button id="button1" class="aceit-button-secondary aceit-button">Flashcard</button>
            <button id="button2" class="aceit-button-secondary aceit-button">Boss Battle</button>
            <button id="button3" class="aceit-button-secondary aceit-button">Frog Escape</button>
            <button id="button4" class="aceit-button-secondary aceit-button">Memory Game</button>
            <button id="button5" class="aceit-button-secondary aceit-button">Learn</button>
        </div>

        <button id="toggleToolbar" class="button">
            <i class="fa-solid fa-screwdriver-wrench"></i>
        </button>
    </div>

    <div id="content">
        <div id="div1" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv1" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <!-- <Widget title="Flashcards" url="https://apps.team1676.com/aceit/flashcards" validSectNames={passedSectNames} sects={passedSects}/> -->
            <FlashcardWidget validSectNames={passedSectNames} sects={passedSects}/>
        </div>
        <div id="div2" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv2" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <BossBattleWidget validSectNames={passedSectNames} sects={passedSects}/>
            <!-- <Widget title="Boss Battle" url="https://apps.team1676.com/aceit/bossbattle" validSectNames={passedSectNames} sects={passedSects}/> -->
        </div>
        <div id="div3" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv3" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <HangmanWidget validSectNames={passedSectNames} sects={passedSects}/>
            <!-- <Widget title="Hangman" url="https://apps.team1676.com/aceit/hangman" validSectNames={passedSectNames} sects={passedSects}/> -->
        </div>
        <div id="div4" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv4" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <MemoryWidget validSectNames={passedSectNames} sects={passedSects}/>
            <!-- <Widget title="Memory" url="https://apps.team1676.com/aceit/memory" validSectNames={passedSectNames} sects={passedSects}/> -->
        </div>
        <div id="div5" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv5" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <LabelWidget />
        </div>
        <div id="div6" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv6" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <CardWidget />
        </div>
        <div id="div7" class="hidden" on:mousedown={onMouseDown} style="left: {left-(modalWidth/2)}px; top: {top-(modalHeight/2)}px; width: {modalWidth}px; height: {modalHeight}px">
            <button id="closeDiv7" class="aceit-close-button aceit-button-primary aceit-button">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>

            <LearnWidget validSectNames={passedSectNames} sects={passedSects} />

            <!-- <Widget title="Learn" url="https://apps.team1676.com/aceit/learn" validSectNames={passedSectNames} sects={passedSects}/> -->
        </div>
    </div>
</main>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>

    .create-buttons {
        flex-direction: column !important;
        justify-content: flex-end !important;
        align-items: flex-end !important;
        margin-bottom: 75px !important;
        right: -100px !important;
        left: auto !important;
        /* transition: transform 0.1s ease-out; */
        transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
    }

    .toolbar, #div1, #div2, #div3, #div4, #div5, #div6, #div7 {
        z-index: 1000;
    }

    .toolbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        /* background-color: #f1f1f1; */
        /* border-top: 1px solid #ccc; */
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    #toggleToolbar {
        padding: 10px;
        border: none;
        background-color: transparent;
        font-size: 18px;
        cursor: pointer;
    }

    #toolbarButtons {
        /* opacity: 0; */
        /* display: none; */
        margin-bottom: -200px;
        /* transition: transform 0.1s ease-out; */
        transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
    }

    :global(#toolbarButtons.hidden) {
        transform: translateY(-100px);
        /* transition: transform 0.5s cubic-bezier(0, 0, 1, 0) !important; */
    }

    :global(.create-buttons.hidden-create-button) {
        transform: translateX(-100px);
        animation-direction: reverse;
        /* transition: transform 0.5s cubic-bezier(0, 0, 1, 0) !important; */
    }

    #toolbarButtons button {
        margin: 5px;
        padding: 10px;
        border: none;
        background: var(--aceit-gray);
        font-size: 16px;
        cursor: pointer;
    }

    #toolbarButtons button:hover {
        background: var(--aceit-bs-gray);
    }

    /* .close-button {
        background: var(--aceit-red);
        border: var(--aceit-red);
        padding: 0 4px 0 4px;
    }

    .close-button:hover {
        background:  var(--aceit-bs-red);
        border:  var(--aceit-bs-red);
    } */

    /* #content {
        margin-bottom: 60px;
        padding: 20px;
    } */

    #content div {
        background-color: #f9f9f9;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        position: fixed;
        top: 40vh;
        left: 40vw;
    }

    #content div:hover {
        cursor: grabbing;
    }

    /* thanks to @gagan-gv at uiverse for this design
        https://uiverse.io/gagan-gv/stupid-parrot-100
    */
    .button {
        width: 40px;
        padding: 15px 20px;
        font-size: 16px;
        background: transparent;
        border: none;
        position: relative;
        color: #f0f0f0;
        z-index: 1;
    }

    .button::after,
    .button::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -99999;
        transition: all .4s;
    }

    .button::before {
        transform: translate(0%, 0%);
        width: 100%;
        height: 100%;
        /* back color */
        /* background: #28282d; */
        background: var(--aceit-primary);
        border-radius: 10px;
    }


    :global(.button.close::before) {
        /* color while opened */
        background: var(--aceit-red) !important;
    }

    :global(.button.close:active::before) {
        background: var(--aceit-bs-red) !important;
    }

    .button::after {
        transform: translate(10px, 10px);
        width: 35px;
        height: 35px;
        /* circle color */
        background: #ffffff15;
        backdrop-filter: blur(5px);
        border-radius: 50px;
    }

    .button:hover::before {
        transform: translate(5%, 20%);
        width: 110%;
        height: 110%;
        /* background: #8686c9;back hover color */
    }

    .button:hover::after {
        border-radius: 10px;
        transform: translate(0, 0);
        width: 100%;
        height: 100%;
        /* background: #8686c9; circle hover color*/
    }

    .button:active::after {
        transition: 0s;
        transform: translate(0, 5%);
        /* background: #8686c9;click color */
    }

    .button:active::before {
        /* background: #8686c9; */
        background: var(--aceit-bs-primary);
    }



</style>

<!--
    BUGS
    bug: currently a bug where dragging one of dylan's cards over my buttons breaks his dragging
        possible fix: make z-index change on click
        fixed,
        only remaining issue is that you can't pickup cards if over flexbox of toolbar
            also if you pickup right on the side of a card, and go fast over toolbar, it breaks because mouse isn't over card and instead over toolbar
-->