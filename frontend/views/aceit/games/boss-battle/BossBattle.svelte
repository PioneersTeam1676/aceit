<!-- MUST FIX: THIS SCRIPT RUNS ON EVERY PAGE -->


<!-- external -->
<script context="module" lang="ts" src="./three.ts"></script>

<script>
  import Header from '../../sections/Header.svelte';
  import Footer from '../../sections/Footer.svelte';

  // export let paused = false;
  // export let started = true;

  // let msg: string = "Hello world!";
  // console.log(msg);

  //when p clicked, change pause
  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'p') {
  //     // paused = !paused;
  //     console.log('oki two scripts works')
  //   }
  // });

  let started = false;

  function start() {
    if (!started)
    {
      document.getElementById('game-area').classList.add('started');
      started = true;
    }
  }


</script>

<main>
  <Header />
  <!-- <h1>{document.readyState}</h1> -->
  <div class="canvas-div" id="game-area">
    <canvas id="bg" style="left: 100px;"></canvas>
  </div>
  {#if started}
    <h1 id="boss-battle-lives" style="top: 100px;"> </h1>
    <h1 id="boss-battle-stage" style="top: 135px;"> </h1>
    <div class="buttons">
      <button class="card" id="7" disabled></button>
      <button class="card" id="6" disabled></button>
      <button class="card" id="5" disabled></button>
      <button class="card" id="4" disabled></button>
      <button class="card" id="3" disabled></button>
      <button class="card" id="2" disabled></button>
      <button class="card" id="1" disabled></button>
      <button class="card" id="0" disabled></button>
    </div>
  {:else}
    <div class="aceit-win-screen">
      <h1>Match as many terms below with the definitions above before time runs out. Incorrect guess lose time, and correct guesses gain time.</h1>
      <button on:click|once={start}>Start</button>
    </div>
  {/if}
  <Footer />
</main>

<style>


    /* body {
      overflow: hidden;
      margin: 0;
    } */

    h1 {
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: absolute;
      left: 50px;
    }

    main {
      background: var(--aceit-secondary);
    }

    /* canvas {
      position: fixed;
      top: 0;
      left: 0;
    } */

    .card:focus {
      /* outline: none;
      box-shadow: none; */
    }

    .card:disabled {
      opacity: 0;
    }

    /* .above-three {
    position: relative;
    z-index: 1;
    } */

    .card {
      /* sizing */
      width: 100%;
      height: 100%;
      background: var(--aceit-secondary);
      border-radius: 10px 10px 0 0;
    }

    .buttons {
      /* positioned the be stuck to the bottom of the screen */
      /* position: fixed; */
      /* bottom: 0;
      left: 0; */
      width: 100vw;
      height: 10vw;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      /* z-index: 2; */
      font-size: 1vw;
      position: absolute;
      /* top: 500px; */
      bottom: 0;
    }

    .card:hover {
      background: var(--aceit-bs-secondary);
    }

    .canvas-div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* .scoreDiv {
      margin: 5vw;
      color: white;
    } */

    /* win screen stuff, taken from my code in learn mode */
    /* elements are added later in three.js code, around line 400 */
    :global(.aceit-win-screen) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    :global(.aceit-win-screen a button, .aceit-win-screen button) {
        font-size: 50px;
        padding: 20px 40px;
        margin-top: 270px;
        background-color: var(--aceit-primary);
        transition: background-color 150ms;
        border: none;
        border-radius: 5px;
    }

    :global(.aceit-win-screen button:hover) {
        background-color: var(--aceit-bs-primary);
    }

    #game-area:not(.started) {
      display: none;
    }

    #game-area.started {
      display:flex;
    }

</style>

