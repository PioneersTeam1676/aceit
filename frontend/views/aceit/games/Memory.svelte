<script>

  import bootstrap from "bootstrap";
  import Header from '../sections/Header.svelte';
  import Footer from '../sections/Footer.svelte';
  import { onMount } from "svelte";
  import { playCards } from '../../../js/stores.js'
  import API from '../../../js/api.js'
  import { MemoryCard } from '../../../js/cards.js';
    import { load } from "../../utils";



  // **DO NOT DELETE ANY OF THESE COMMENTS THEY ARE VERY IMPORTANT**

  // Grant's Great Goals:
  // 1) Figure out what the heck is happening. | DONE! Easy peasy lemon skweezy
  // 2) Make it so it knows when you selected two cards that match | DONE. I saw this one coming and prepared in advance.
  // 3) Make it so cards actually display what they're supposed to rather than just the Defenition | DONE!!!!!!
  // 4) Make it so cards indicate when you matched them | DONE
  // 5) Make the progress bar dependent on your progress | DONE

  // Thomas's Terrific Tasks:
  // 1) Make the progress bar look cool again like you did before the server died. RIP | DONE!!

  // Dylan's Divine Duties:
  // 1) Link up the backend to this file
  // 2) Make the backend work

  // Victor's Valiant Ventures:
  // 1) Fix grant's confusing card clicking | DONE!!!
  // 2) Add start/end screen | DONE :)
  let game_state = "start";

  // Alex's Articulate Assignments

  // Larry's Leisurely Labors:

  // Treshan's Tedious Toils:
  // 1) college stuff :(

  // William's Wonderous Works:

  // **DO NOT DELETE ANY OF THESE COMMENTS THEY ARE VERY IMPORTANT**

  let percentage = 0.75;
  let max_bar_height = 500;

  // let cards = [];

  const addCards = async (id, index) => {

      let res = await api.getCardById(id);
      console.log(res);

      let card = new MemoryCard(res.id, res.term, res.definition, true, res.term, true, false);
      cards.push(card);
      card = new MemoryCard(res.id*-1, res.term, res.definition, false, res.definition, true, false);
      cards.push(card)
      console.log(card);
      cards = cards;

    randomizeCards()
    }

    const memoryCardLoad = (deck) => {

      let cards = [];

      for(let i = 0; i < deck.cards.length; i++) {

        let oldCard = deck.cards[i];

        let newTermCard = {
          id: oldCard.id,
          term: oldCard.term,
          Definition: oldCard.definition,
          IsShowingTerm: true,
          DisplayText: oldCard.term,
          State: {
            Flipped: true,
            Matched: false
          }
        }

        let newDefCard = {
          id: oldCard.id * -1,
          term: oldCard.term,
          Definition: oldCard.definition,
          IsShowingTerm: false,
          DisplayText: oldCard.definition,
          State: {
            Flipped: true,
            Matched: false
          }
        }

        cards.push(newTermCard);
        cards.push(newDefCard);

      }
      return cards;

    }

    let cards = load(memoryCardLoad);

  //   cards = [
  //     {
  //         id: 0,
  //         term: "Floppppppa",
  //         Definition: "Big",
  //         IsShowingTerm:true,
  //         DisplayText:"Floppppppa",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }

  //     },
  //     {
  //         id: 1,
  //         term: "Floppppppa",
  //         Definition: "Big",
  //         IsShowingTerm:false,
  //         DisplayText:"Big",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //     },  {
  //         id: 2,
  //         term: "DefFloooooopaenition",
  //         Definition: "Shrimple",
  //         IsShowingTerm:true,
  //         DisplayText:"DefFloooooopaenition",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //     },    {
  //       id: 3,
  //         term: "DefFloooooopaenition",
  //         Definition: "Shrimple",
  //         IsShowingTerm:false,
  //         DisplayText:"Shrimple",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //     },    {
  //       id: 4,
  //         term: "Big Sad",
  //         Definition: "My Mood",
  //         IsShowingTerm:true,
  //         DisplayText:"Big Sad",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //     },    {
  //       id: 5,
  //         term: "Big Sad",
  //         Definition: "My Mood",
  //         IsShowingTerm:false,
  //         DisplayText:"My Mood",
  //         State: {
  //             Flipped: false,
  //             Matched: false
  //         }
  //     }
  // ];





  //You probably need to turn all these cards into another array of one definition card and one term card in order to make this work properly
  // resetCards(); //needed to make "State" work, idk why, idc why.

  // randomizeCards();

  // Treshan has done this. Do not touch
  function flipCard(cardId) {
  // if(shouldRun == true){
  //   console.log("CARD STATE IS " + shouldRun);
  // for (let i = 0; i < cards.length; i++)
  // {
  //   if (cards[i].id == cardId)
  //   {
  //   cards[i].State = false;
  //   console.log(cards[i].State);
  //   }
  // }
  // }
    cards[cardId].flipped = false;
    console.log(cards[cardId].flipped);
  }


  let count = 0;
  let resetTime = true;
  console.log("V 62");
  let selectedCards = [];

  // FUNCTION PLAYGAME!!!
  function playGame(cardId){


    let index;
    for (let i = 0; i < cards.length; i++){
      if (cards[i].id === cardId)
      {
        index = i;
        break;
      }
    }

    console.log("Hi" + cards[index].flipped);
   if(count < 2 && cards[index].flipped == true){
    { count++;
      selectedCards.push(index);
      flipCard(index);
    console.log(count);
    }
    console.log(cards[index].flipped);
   }

     if (selectedCards.length >= 2)
      {
       if(resetTime == true){
        resetTime = false;
        console.log("FLIPPHUZZAH54");

        //Delays this from happening for 1.5 seconds
         setTimeout(function () {
          // Prints out values to enable checking in the console
          console.log(cards[selectedCards[0]].term);
          console.log(cards[selectedCards[1]].term);

           if (cards[selectedCards[0]].term == cards[selectedCards[1]].term) //uses term because they have the same term
           {
             console.log("matched");
            //Ya see, we make it so we know they're matched when they match
            cards[selectedCards[0]].matched = true;
            cards[selectedCards[1]].matched = true;

              let tempCount = 0;
              for (let x of cards) {
                  if (x.matched) {
                      tempCount++
                  }
              }

            updateProgressBar(Math.floor(100*tempCount/cards.length));

           }
           else
           {
            console.log("not matched");
            //Ya see, when they don't match it's convenient because you can just reset them.
           }
            resetCards();
            console.log("Cards Reset");
            resetCount();
            resetTime = true;
            selectedCards = [];
         }, 250);
        }
        console.log(count);
      }


  }

  // function playGame(cardState1, cardId1)
  // {
  //   let temp = [];
  // let selectedCards = [];
  // console.log("Hi" + cards[cardId1].State);
  //  if(count < 2 && cards[cardId1].State == true){
  //   { count++;

  //     flipCard(cardId1);
  //   console.log(count);
  //   }
  //   console.log(cards[cardId1].State);
  //  }
  //  else
  //    {

  //    }

  //  for (let i = 0; i < cards.length; i++)
  // {
  //   if (cards[i].State == false)
  //   {
  //     temp.push(cards[i]);
  //     selectedCards.push(cards[i]);
  //     if (selectedCards.length >= 2)
  //     {
  //      if(resetTime == true){
  //       resetTime = false;
  //       console.log("FLIPPHUZZAH54");

  //        setTimeout(function () {
  //         console.log(cards[selectedCards[0].id]);
  //         console.log(cards[selectedCards[1].id]);

  //           resetCards();
  //           console.log("Cards Reset");
  //           resetCount();
  //           resetTime = true;
  //        }, 1500);
  //       }
  //       console.log(count);
  //     }
  //   }
  // }


  //Written by Thomas
  //(you're welcome <3)
  function updateProgressBar(height) {
    if (document.getElementById('progressbar')) document.getElementById('progressbar').style.height = height + "%";
    if (document.getElementById('progressbar-text')) document.getElementById('progressbar-text').textContent = height;
    if (document.getElementById('progressbar-pusher')) document.getElementById('progressbar-pusher').style.height = (100 - height) + "%";

    console.log("checking won state: "+height);
    if (height >= 100)
    {

      setTimeout(function () {
        game_state = "won";
        console.log("won");
      }, 500);


    }
  }

  function randomizeCards() {
      let currentIndex = cards.length;
      let randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];

      }


      // VERY BIG SAD DOES WORK OH WELL SO SAD BIG SAD VERY SAD CRY WONTCHA
      // let tempC1 = Math.floor(cards.length * Math.randomize); //0-5
      // let tempC2 = Math.floor(cards.length *  Math.randomize); //0-5
      // let tempId = 0;
      // let tempCard = cards[0];
      // console.log("V6");

      // console.log(Math.random());
      // // console.log(tempCard.term);
      // for (let i = 0; i < cards.length * 2; i++) {
      //     // Randomize the chosen cards
      //     tempC1 = Math.floor(cards.length * Math.random()); //0-5
      //     tempC2 = Math.floor(cards.length *  Math.random()); //0-5

      //     console.log(tempC1);
      //     console.log(tempC2);

      //     // Switcheroo
      //     tempCard = cards[tempC1];
      //     cards[tempC1] = cards[tempC2];


      //     console.log(tempCard.term);
      //     console.log(tempCard.id);
      //     cards[tempC2] = tempCard;
      //     cards[tempC1].id = tempCard.id; //Random Card 1 keeps it's id
      //     cards[tempC2].id = cards[tempC1].id; //Random Card 2 keeps it's id
      // }

  }

  function resetCount() {
    count = 0;
    console.log("Count Reset");
  }
  function resetCards(){
    for (let i = 0; i < cards.length; i++){
    if (!cards[i].matched) {
      cards[i].flipped = true; //Flipped becomes false?
    }}
  }
  function flipCardBack(arrayOfPositions){
        cards[arrayOfPositions[0]].flipped = true;
        console.log(cards[arrayOfPositions[0]].flipped);
        cards[arrayOfPositions[1]].flipped = true;
  }
  function testFunction()
  {
      console.log("Hi")
    }




  onMount(async () => {
    updateProgressBar(0);
    // console.log("hi");
    // $playCards.forEach(addCards);
    resetCards()
    randomizeCards();

  });


  function setGameStatePlaying()
  {
    game_state = "playing";
  }

  const refresh = () => {
    window.location.reload();
  }
  </script>

  <!-- END OF JAVA SCRIPT!!!! YAY!! Wait no not yay :( -->
  <!-- HTML -->

  <main>
    <Header/>

{#if game_state==="start"}
  <div class="aceit-win-screen-secondary">
      <h1>Match the cards correctly to finish the game!</h1>
      <button on:click|once={setGameStatePlaying}>Start Memory game</button>
  </div>
{:else if game_state==="won"}
  <div class="aceit-win-screen-secondary">
      <h1>You have completed the memory game.</h1>
      <a href="/#/aceit/memory">
          <button on:click={refresh}>Play Again</button>
      </a>
  </div>
{:else if game_state==="playing"}
  {#if cards.length > 0}
      <!-- <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous"> -->
      <div style="display: flex">
        <!-- Beginning of Progress Bar -->
        <div class="sidebar">
          <div class="progressbar-background-container">
            <div id="progressbar-background">
              <div id="progressbar-pusher" style="height: 100%;"></div>
              <div id="progressbar" style="height: 0%;">
                <p id="progressbar-text">0</p>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Progress Bar -->
        <!-- Beginning of Cards -->
        <div style="flex: 8">

            {#each cards as item}
            <button class="card-flip" on:click={() => playGame(item.id)} >
              <div class:matched={item.matched}>
                <div class:flip={!item.flipped}> <!-- Why is our variable the opposite of what it actually is? Good Question.-->
                  <div class="front">
                      <div class="card">

                      </div>
                  </div>
                  <div class="back">
                      <!-- back content -->
                      <div class="card">
                        <div class="card-block">
                          <h4 class="card-title">{item.id}</h4>
                          <h4 class="card-text">{item.DisplayText}</h4>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            {/each}

        </div>
      </div>

      {:else if cards.length = 1}

      <p>length = 1</p>

      <!-- make something to say to select more than one card in the hub! -->

      {:else if cards.length = 0}

      <p>length = 0</p>
      <!-- make something to say to wait for the cards to load and if they didnt go to the hub and select some! -->

      {:else}
      <!-- say something probably went wrong -->
      <p>something else!</p>

  {/if}
{/if}
    <Footer/>
  </main>

  <!-- CSS!!!!!! -->
  <style>

  main {
    background-color: var(--aceit-primary);
  }

  .card-flip {
    perspective: 1000px;
    max-width: 350px;
    margin: 10px;
    left: 5px;
    display: inline-block !important;
    background: transparent;
    border: 0
  }
  /* .card-flip:focus{
    outline:0
  }
  .card-flip:focus .flip {
    transform: rotateY(180deg);
  } */
  .card-flip{
    outline:0;
  }
  .card-flip .flip {
    transform: rotateY(180deg);
  }

  .card-flip,
  .front,
  .back {
    width: 100%;
    height: 175px;
  }
  .card-flip .card{
    height: 175px;
  }
  .flip {
    top: 0;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: absolute;
    width: 100%;
  }
  .flip:hover{
    cursor:pointer;
  }
  .card-text{
    /* text-align:center; */
    overflow:scroll;
    height:100px;
    margin: auto;
    width: 50%;
    padding: 10px;
  }
  .card-block{
    display:flex;
    align-items:center;
    height:100%;
  }

  .front,
  .back {
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }
  .front .card {
    /* background-image:url("https://team1676.com/dash/img/tiles/pattern3.png") ; */
    background:#ccc;
  }
  .matched .card-block {
    background: #91e274;
  }

  .card-title {
    text-align: center;
    width: 100%;
  }

  .back {
    transform: rotateY(180deg);
  }

  .sidebar {
    width: 150px;
    position: static;
    z-index: 1;
    top: 6vw;
    left: 0;
    right: 150px;
    background-color: var(--aceit-tertiary);
    overflow-x: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #progressbar-background {
      background-color: var(--aceit-primary);
      padding:15%;
      width: 2.5rem;
      height: 100%;
      border-radius: 100px;
    }

  .progressbar-background-container {
    height: 85%;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
  }

  #progressbar-pusher {
    background-color:transparent;
    width: 1px;
    height: 50%;
    border-radius: 100px;
    transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  }

  #progressbar {
    height: 100%;
    background-color: var(--aceit-accent);
    box-shadow: 0px 0px 20px var(--aceit-accent);
    text-align:center;
    overflow:hidden;
    border-radius: 100px;
    transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  }


  #progressbar-text {
    width: 100%;
    color: rgb(255, 216, 153);
    transform: translate(0px, 5px) rotate(315deg);
  }

  /* .sidebar-text {
    width: 100%;
    color: rgb(255, 216, 153);
    transform: translate(0px, 5px) rotate(315deg);
  } */

  </style>
