<script>
  import Header from './sections/Header.svelte';
  import Footer from './sections/Footer.svelte';
  import { playCards } from '../../js/stores.js';
  import API from '../../js/api.js';
  import { FlashCardsCard } from '../../js/cards.js';

  import { onMount } from 'svelte';

  let currentIndex = 0;
  let unflip = false;
  let flipped = false;
  let answerWithTerm = true;

  const api = new API();

  let cards = [];

  let game_state = "start";

  //= [



  //       {
  //         id: 0,
  //         term: "Term",
  //         definition: "Definition",
  //         IsShowingTerm:true,
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //       },
  //       {
  //         id: 1,
  //         term: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consequuntur fugiat atque. Incidunt, id. Maxime, maiores reiciendis. Modi voluptatibus obcaecati dignissimos, deleniti libero sint voluptas nemo adipisci nostrum iure? At placeat, quasi eius quod nobis, perspiciatis soluta magnam qui odio consequuntur in. Suscipit similique mollitia, dolorem perferendis ut minus eveniet harum. Quas, magni magnam voluptate quidem illum, dolorem libero repellendus ab tempora eaque officia voluptas vero cupiditate commodi aut placeat architecto accusantium labore dicta quam aperiam? Laborum voluptas amet, praesentium consequuntur in voluptatem eius. Illum, maiores? Culpa laudantium labore laborum dolor dignissimos recusandae distinctio! Reiciendis velit aliquam temporibus sit eligendi!",
  //         definition: "Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1Definition1",
  //         IsShowingTerm:true,
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //       },
  //       {
  //         id: 2,
  //         term: "Term2",
  //         definition: "Definition2",
  //         IsShowingTerm:true,
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //       },
  //       {
  //         id: 3,
  //         term: "Term3",
  //         definition: "Definition3",
  //         IsShowingTerm:true,
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //       }
  //   ];

  const addFlash = async (id, index) => {

      let res = await api.getCardById(id);
      console.log(res);

      let card = new FlashCardsCard(res.id, res.term, res.definition, true, false, false);
      cards.push(card);
      console.log(card);
      cards = cards;


    }

  onMount(async () => {
    console.log('hi')
    $playCards.forEach(addFlash);




  })

  function onKeyPress(e){
    if(e.keyCode == 32)//space key
    {
      e.preventDefault()
      unflip = false;
      flipped = !flipped;
    }

    if(e.keyCode == 37)//left key
      prevCard();
    if(e.keyCode == 39)//right key
      nextCard();
  }

  function flipCard(key) {
    unflip = false;

    if(!key)
      flipped = !flipped;
    else if(key == 32)
        flipped = !flipped;

  }

  function nextCard() {
      if(flipped == answerWithTerm)
      {
        unflip = true;
        flipped = !flipped;
      }

      if(currentIndex == cards.length - 1)
      {
        game_state = "won";
        console.log("win: i;"+currentIndex+"len"+cards.length);
        return;
      }

      if(currentIndex == cards.length - 2)
      {
        let elements = document.getElementsByClassName('forward-button')

        // elements[1].disabled = true;
        // elements[0].disabled = true;

        currentIndex++;

      }
      else if(currentIndex == 1)
      {
        let elements = document.getElementsByClassName('back-button')

        elements[1].disabled = false;
        elements[0].disabled = false;

        currentIndex++;
      }
      else
      currentIndex++
    }

    function prevCard() {
      if(flipped == answerWithTerm)
      {
        unflip = true;
        flipped = !flipped;
      }

      if(currentIndex == 0)
        return;

      if(currentIndex == 1)
      {
        let elements = document.getElementsByClassName('back-button')

        elements[1].disabled = true;
        elements[0].disabled = true;

        currentIndex--;
      }
      else if(currentIndex == cards.length - 1)
      {
        let elements = document.getElementsByClassName('forward-button')

        elements[1].disabled = false;
        elements[0].disabled = false;

        currentIndex--;
      }
      else
      currentIndex--;
    }




  function setGameStatePlaying()
  {
    game_state = "playing";
  }

</script>

<svelte:window on:keydown={onKeyPress} />

<main >
  <Header/>

{#if game_state==="start"}
  <div class="aceit-win-screen-secondary">
      <h1>Click to flip the card.</h1>
      <button on:click|once={setGameStatePlaying}>Start Flashcards</button>
  </div>
{:else if game_state==="won"}
  <div class="aceit-win-screen-secondary">
      <h1>You have completed the flashcards.</h1>
      <a href="https://apps.team1676.com/aceit/flashcards">
          <button>Play Again</button>
      </a>
  </div>
{:else if game_state==="playing"}

  {#if cards.length >= 1}
  <button on:click={() => {answerWithTerm = !answerWithTerm}} class="aceit-button aceit-secondary-button">Answering with: {answerWithTerm ? "Term" : "Definition"}</button>

  <!-- svelte-ignore a11y-click-events-have-key-events -->

  <div class="flashcard-module">
    <div class="flashcard">
      <div class="flashcard-container">
        <div class="parent">
          <div id="child" class:flip={flipped} class:unflip={unflip}>
              <div id="card-front" on:click|self={() => flipCard()}>
                <div class="card-header" on:click|self={() => flipCard()}>
                  <p class="card-header-type" on:click|self={() => flipCard()}>Term</p>
                  <p class="card-header-number">{currentIndex + 1}/{cards.length}</p>
                </div>
                <div class="card-text-container" on:click|self={() => flipCard()}>
                  <div class="card-text" on:click|self={() => flipCard()}>{cards[currentIndex].term}</div>
                </div>
                <div class="buttons" on:click|self={() => flipCard()}>
                  <button class="button back-button" on:click={prevCard}> prev </button>
                  <button class="button forward-button" on:click={nextCard}> next </button>
                </div>
              </div>
              <div id="card-back" on:click|self={() => flipCard()}>
                <div class="card-header" on:click|self={() => flipCard()}>
                  <p class="card-header-type" on:click|self={() => flipCard()}>Definition</p>
                  <p class="card-header-number">{currentIndex + 1}/{cards.length}</p>
                </div>
                <div class="card-text-container" on:click|self={() => flipCard()}>
                  <div class="card-text" on:click|self={() => flipCard()}>{cards[currentIndex].definition}</div>
                </div>
                <div class="buttons" on:click|self={() => flipCard()}>
                  <button class="button back-button" on:click={prevCard}> prev </button>
                  <button class="button forward-button" on:click={nextCard}> next </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

{:else if $playCards.length == 0}

<!-- make something here that says that says to go to the hub and choose a section to study or wait a few seconds for the cards to load-->
<p> Hello from the not undefined world!</p>
<p> {$playCards.length} </p>

{:else }

<p> hello from the loading world</p>
<!-- make something here that says to wait for the cards to load or go to the hub-->

  {/if}

{/if}
  <Footer/>
</main>


<style>

  main {
    height: 100%;
    background-color: var(--aceit-primary);
  }

  .flashcard-module {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {

  }

    .buttons {
      width: 100%;
      max-width: 700px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .button {
      color: var(--aceit-white);
      margin: 0 2.5vw 0 2.5vw;
      width: 35%;
      background-color: transparent;
      border: 3px solid var(--aceit-primary);
      border-radius: 0.5rem;
      z-index: 5;
    }

    .flashcard-container {
      width: 64vw;
      max-width: 700px;
    }

    .flashcard {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .parent {
      width: 100%;
      height: 32vw;
      background: transparent;
    }

    .parent .flip {
      transform: rotateX(180deg);
    }

    .unflip {
      transition: transform 0ms !important;
    }

    #child {
      max-width: 700px;
      perspective: 1000px;
      width: 100%;
      height: inherit;
      transition: transform 400ms;
      transform-style: preserve-3d;
      display: inline-block !important;
      border: 3px solid var(--aceit-secondary);
      border-radius: 1rem;
      background-color: var(--aceit-tertiary);
    }

    #card-front, #card-back {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      position: absolute;
      padding: 2.5vw;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      /* align-items:center; */
    }

    #card-front {
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    #card-back{
      transform: rotateX(180deg);
      width: 100%;
      height: 100%;
    }

    .parent:hover{
      cursor:pointer;
    }

    .card-text-container {
      overflow-y: scroll;
      overflow-wrap: break-word;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;

      -webkit-align-items: center;
      align-items: center;

      -webkit-justify-content: center;
      justify-content: center;
    }

    .card-header {
      display: flex;
      flex-direction: row;
    }

    .card-header-type {
      width:100%;
      font-size: 14px;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: right;
      justify-content: right;
      color: var(--aceit-white);
    }

    .card-header-number {
      width:100%;
      font-size: 14px;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: right;
      justify-content: right;
      color: var(--aceit-white);
    }

    .card-text{
      overflow-wrap: break-word;
      width: 100%;
      height: 100%;
      vertical-align: top;
      text-align: center;
      color: var(--aceit-white);
    }

</style>