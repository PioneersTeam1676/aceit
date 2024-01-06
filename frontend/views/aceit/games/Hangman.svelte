<script>
    import { blank_object, each, loop_guard } from "svelte/internal";
    import Header from '../sections/Header.svelte';
    import Footer from '../sections/Footer.svelte';
    import frogGif1 from '../../../media/aceit/FrogAnimation.gif';
    import frogJpg from '../../../media/aceit/FrogLoad.jpg';
    import Background from '../../../media/aceit/HangmanBackground.png';
    import { onMount } from 'svelte';
    import LibLoader from '../sections/LibLoader.svelte';
    import frogVideo1 from '../../../media/aceit/frogGifPart1.gif';
    import frogVideo2 from '../../../media/aceit/frogGifPart2.gif';
    import frogVideo3 from '../../../media/aceit/frogGifPart3.gif';
    import frogVideo4 from '../../../media/aceit/frogGifPart4.gif';
    import frogVideo5 from '../../../media/aceit/frogGifPart5.gif';
    import frogBase from '../../../media/aceit/AllAlive.jpg';

    let cards = [
        {
          id: 0,
          term: "Floppa",
          Definition: "Big",
          IsShowingTerm:true,
          DisplayText:"Floppppppa",
          State: {
              Flipped: false,
              Matched: false
          }

        },
        {
          id: 1,
          term: "cheese",
          Definition: "Tasty milk product",
          IsShowingTerm:true,
          DisplayText:"Tasty milk product",
          State: {
              Flipped: false,
              Matched: false
          }
        },
        {
          id: 2,
          term: "two terms",
          Definition: "dos wordos",
          IsShowingTerm:true,
          DisplayText:"Dos wordos",
          State: {
              Flipped: false,
              Matched: false
          }
        },
        // {
        //   id: 1,
        //   term: "Pneumonoultramicroscopicsilicovolcanoconiosis",
        //   Definition: "The longest Word",
        //   IsShowingTerm:false,
        //   DisplayText:"Big",
        //   State: {
        //       Flipped: false,
        //       Matched: false
        //   }
        // },      {
        //   id: 3,
        //     term: "DefFloooooopaenition",
        //     Definition: "Shrimple",
        //     IsShowingTerm:false,
        //     DisplayText:"Shrimple",
        //     State: {
        //         Flipped: false,
        //         Matched: false
        //     }
        // },    {
        //   id: 4,
        //     term: "Big Sad",
        //     Definition: "My Mood",
        //     IsShowingTerm:true,
        //     DisplayText:"Big Sad",
        //     State: {
        //         Flipped: false,
        //         Matched: false
        //     }
        // },    {
        //   id: 5,
        //     term: "Big Sad",
        //     Definition: "My Mood",
        //     IsShowingTerm:false,
        //     DisplayText:"My Mood",
        //     State: {
        //         Flipped: false,
        //         Matched: false
        //     }
        // }
    ];

  let game_state = "start";


  var seperationArr=[];
  var currentWords=[];
  var displayWords=[];

  var index=0;
  var displayWord=""
  var display=[];
  var init=true;
  var currentLives=5;
  var finishedSet=false;
  var lostAllLives=false;
  var frogVid=[];
  //gif inits
  //the base no lives lost one
  frogVid[0]=frogBase;
  //for losing each life
  frogVid[1]=frogVideo1;
  frogVid[2]=frogVideo2;
  frogVid[3]=frogVideo3;
  frogVid[4]=frogVideo4;
  frogVid[5]=frogVideo5;
  //add one for the frog getting hit by a rock or dazed

  var currentFrog=frogVid[0];

	onMount(async () => {
		//Tests Vars
      seperationArr=cards[index].term.split(" ");
  for(let lowerInd=0;lowerInd<seperationArr.length;lowerInd++)
  {
    seperationArr[lowerInd]=seperationArr[lowerInd].toLowerCase();
  }


  for(let layer=0;layer<seperationArr.length;layer++)
  {
    currentWords[layer]=[];
    displayWords[layer]=[];
    for(let letter=0;letter<seperationArr[layer].length;letter++)
    {
        currentWords[layer][letter]=seperationArr[layer].charAt(letter);
        displayWords[layer][letter]="_";
    }
  }

    let buttons = document.getElementsByClassName('keyboard-button')
    for(let i = 0; i < buttons.length; i++)
    {
      let element = buttons[i]
      element.addEventListener("click", (event) => {
        handleKey(element.innerHTML)
      });
    }
	});

  //KEYS
  document.addEventListener("keyup", (e) => {
    handleKey(String(e.key))
  })

  //FUNCTIONS
  //UPDATE
  function updateDisplay(letter)
  {

    for(let yInd=0;yInd<currentWords.length;yInd++)
    {

        if(currentWords[yInd].includes(letter))
        {
            for(let xInd=0;xInd<currentWords[yInd].length;xInd++)
            {
                if(currentWords[yInd][xInd]==letter)
                {
                    displayWords[yInd][xInd]=letter;
                }
            }
        }


    }
    displayWords=displayWords;
 }

 function handleKey(key) {
    let foundKey=false;
    for(let layer=0;layer<currentWords.length;layer++)
    {
      if(currentWords[layer].includes(key))
      {
      foundKey=true;
      console.log("Key Found");
      updateDisplay(key);
      }
    }
    if(foundKey==false)
    {
      console.log("Key Found");
      if(currentLives<=0)
          {
            finishedSet=true;
            lostAllLives=true;
          }
          else{
        currentLives=currentLives-1;
        frogUpdate();
          }


    }

    checkWin();
 }

 //CHECK WIN
 function checkWin()
 {
  let winning=true;
     for(let indY=0;indY<currentWords.length;indY++)
     {

      if(displayWords[indY].includes("_"))
          {
           winning=false;
         }
     }
        if(winning)
       {
        index=index+1;
        if(cards[index]==null)
        {
         console.log("DEBUGGING");
         finishedSet=true;
         game_state = "won";
        }
        else
        {
          console.log("YOU WON, NOW WE WILL MOVE");
        currentLives=5;
        seperationArr=cards[index].term.split(" ");

        currentWords=[]
        displayWords=[]
        for(let layer=0;layer<seperationArr.length;layer++)
        {
         currentWords[layer]=[];
          displayWords[layer]=[];
         for(let letter=0;letter<seperationArr[layer].length;letter++)
         {
          currentWords[layer][letter]=seperationArr[layer].charAt(letter).toLowerCase();
          displayWords[layer][letter]="_";
         }
        }



       }
    }


 }

 function reset()
 {
  index=0;
  currentLives=5;
  finishedSet=false;
  console.log("Testing1");
  displayWords=displayWords;
  Definition=Definition;
  currentFrog=frogVid[0];
  checkWin();

 }

 let gifRunTime = 200;
 function frogUpdate()
 {
  if(currentLives>=0)
   {
    console.log("Method Call")
  setTimeout(async () => {
    console.log((5-currentLives).toString());
    currentFrog=frogVid[5-currentLives]
   }, gifRunTime);
   if(currentLives==0)
   {
    finishedSet=true;
    lostAllLives=true;
   }
  }
  else
  {


  }
 }
// currentGif=frogGif+string(5-lives);


  function setGameStatePlaying()
  {
    game_state = "playing";
  }

  </script>

  <svelte:head>
    {#each frogVid as img}
      <link rel="preload" as="image" href={img} />
    {/each}
  </svelte:head>

  <main style="background-image: url({Background});">

  <Header/>

{#if game_state==="start"}
  <div class="aceit-win-screen">
      <h1>Guess the word without losing all your lives!</h1>
      <button on:click|once={setGameStatePlaying}>Start Hangman</button>
  </div>
{:else if game_state==="won"}
  <div class="aceit-win-screen">
      <h1>You have completed the Hangman.</h1>
      <a href="https://apps.team1676.com/aceit/hangman">
          <button>Play Again</button>
      </a>
  </div>
{:else if game_state==="playing"}

  <h1 id="title">Frog Escape!</h1>
  <table id="game">
    <tr>
      <!--Cards Column-->
      <td id="cardCol">
        {#if finishedSet==false}
        <div id="letterDisplay">
          <table style="margin-left:10%; margin-top:5%;">

            {#each displayWords as indY,indexY}
            <tr class="wordRow">
              {#each indY as indX,indexX}
              <td class="letterStyle">
                  <div class="letterStyleBaseAnim" class:flipUp={displayWords[indexY][indexX]!=="_"}>
                    {indX}
                  </div>
                </td>
                {/each}
              </tr>

              {/each}


            </table>
            <p id="definition">
              {cards[index].Definition}
            </p>
          </div>
          {:else}
            {#if lostAllLives==true}
             <p class="endText"> You Have Lost! Please retry or go to the homepage.</p>
            {:else}
            <p class="endText">You Win!</p>
            {/if}

              <table id="afterOptions">
              <tr>
              <td class="afterTD"> <button class="afterButton" on:click={reset}>Retry</button></td>
               <td class="afterTD"> <button class="afterButton" onclick="window.location.href='https://apps.team1676.com/#/aceit/games';">Go Home</button></td>
              </tr>
            </table>


          {/if}

        </td>

      <td id="frogCol">
        <!--<p id="lives">Lives: {currentLives} </p>-->
        <div id="livesAnimation">
          <img class="frogImg" src={currentFrog} alt="very intimidating frog">
        </div>
      </td>

    </tr>
  </table>


  <div id="keyboard-cont">
    <div class="first-row">
      <button class="keyboard-button">q</button>
      <button class="keyboard-button">w</button>
      <button class="keyboard-button">e</button>
      <button class="keyboard-button">r</button>
      <button class="keyboard-button">t</button>
      <button class="keyboard-button">y</button>
      <button class="keyboard-button">u</button>
      <button class="keyboard-button">i</button>
      <button class="keyboard-button">o</button>
      <button class="keyboard-button">p</button>
    </div>
    <div class="second-row">
      <button class="keyboard-button">a</button>
      <button class="keyboard-button">s</button>
      <button class="keyboard-button">d</button>
      <button class="keyboard-button">f</button>
      <button class="keyboard-button">g</button>
      <button class="keyboard-button">h</button>
      <button class="keyboard-button">j</button>
      <button class="keyboard-button">k</button>
      <button class="keyboard-button">l</button>
    </div>
    <div class="third-row">
      <button class="keyboard-button">z</button>
      <button class="keyboard-button">x</button>
      <button class="keyboard-button">c</button>
      <button class="keyboard-button">v</button>
      <button class="keyboard-button">b</button>
      <button class="keyboard-button">n</button>
      <button class="keyboard-button">m</button>
    </div>
  </div>

{/if}

  <Footer/>

</main>

<style>
  #title{
    text-align:center;
  }
  #keyboard-cont {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #keyboard-cont div {
    display: flex;
  }

  .second-row {
    margin: 0.5rem 0;
  }

  .keyboard-button {
    min-width: 35px;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    margin: 0 2px;
    cursor: pointer;
    text-transform: uppercase;

    color: var(--aceit-white);
    text-shadow: var(--aceit-white) 0px 0px 10px;
    background-color: var(--aceit-bs-tertiary);
    border: 3px solid var(--aceit-secondary);
    border-radius: 500px;
  }

  .keyboard-button:active {
    color: #549798;
    text-shadow: none;
    background-color: var(--aceit-bs-tertiary);
  }

  #letterDisplay
  {
    margin-top:10px;
    width: 400px;
    overflow: scroll;
    background-color: var(--aceit-bs-tertiary);
    border: 3px solid var(--aceit-secondary);
    border-radius: 10px;
  }

  .letterStyle
  {
    width: 1em;
    height: 1em;
    text-align: center;
    padding-top: 10px;
    justify-content: center;
    border: 2px solid black;
    background-color: #EBEBB8;
    padding: 3px;
    border: 3px solid var(--aceit-bs-tertiary);
    border-radius:5px;

  }

  .wordRow
  {
    text-align:center;
    align-content: center;
  }

  .letterStyleBaseAnim
  {
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flipUp{
    transform: rotateX(360deg);
  }

  #cardCol{
    border: 2px solid grey;
    width:30%;
    height:500px;
    vertical-align: top;
  }

  #definition{
    margin:50px;
    border: 2px solid grey;
    height:350px;
    width:300px;
    text-align: center;
    justify-content: center;
    background-color: #EBEBB8;
    border-radius: 20px;

  }

  #frogCol{
    border: 2px solid grey;
    width:50%;
    height:70%;
    vertical-align: top;

  }

  #lives{
    text-align:right;
    margin-right:10px;
  }

  .frogImg
  {
    max-width: 700px;
  }

  #game{
    margin-left:2.5%;
    width:95%;
  }

  tr{
    margin-top:10px;
    padding-top:5px;
  }
  #afterOptions
  {
    width:100%
  }

  .afterButton
  {
    color:white;
    text-shadow: var(--aceit-white) 0px 0px 10px;
    background-color: var(--aceit-bs-tertiary);
    border: 3px solid var(--aceit-secondary);
    border-radius: 500px;
  }
  .afterTD
  {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
  .endText
  {
    padding: 7.5%;
    text-align: center;
    height: 20%;
    background-color: var(--aceit-bs-tertiary);
    border: 3px solid var(--aceit-secondary);
    border-radius: 20px;
    color: white;
    text-shadow: var(--aceit-white) 0px 0px 10px;
  }


  main{
    /*We have to stick to a theme on the website*/
    /* background-color: var(--aceit-primary); */
    background-repeat: no-repeat;
    background-size: 100% 70%;

  }

</style>