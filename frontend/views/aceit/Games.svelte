<script>
import Header from './sections/Header.svelte';
  import Footer from './sections/Footer.svelte';
</script>

<main style="height: auto;">
 <Header tab=2 />
  <div class="card" style="width: 100%; background-color:#4D774E;">
      <div class="card-body">
        <h5 class="card-text card-title" style="color:white">Activies</h5>
        <p class="card-text" style="color:white">Activies you can do on ACE-IT to enrich your study session with!</p>
      </div>
  </div>

  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Flash Cards
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="accordion-text">
            <p>A study tool that presents sets of cards containing information on a particular topic. View the front or back of the cards and review at your own pace.</p>
          </div>
          <div class="image-container">
            <img src="" class="img-fluid accordion-image" alt="...">
          </div>
        </div>
      </div>
    </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Hangman
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="accordion-text">
          <p>A word-guessing game where players guess letters to uncover a hidden word or phrase. Incorrect guesses result in losing lives and eventually losing the games</p>
        </div>
        <div class="image-container">
        <img src="" class="img-fluid accordion-image" alt="...">
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Memory Match
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="accordion-text">
           <p>A card matching game that helps improve cognitive skills and short-term memory. Flip over pairs of matching cards to earn points.</p>
        </div>
        <div class="image-container">
          <img src="https://www.hopkinsmedicine.org/-/media/images/health/3_-wellness/aging-well/memory-science-teaser.ashx" class="img-fluid accordion-image" alt="...">
        </div>
      </div>
    </div>
  </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Boss Battle
        </button>
      </h2>
      <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="accordion-text">
            <p>Test your knowledge with our Boss Battle game! Defeat the boss by answering questions correctly and prove that you have what it takes to ace your exams.</p>
          </div>
          <div class="image-container">
          <img src="https://images.fanpedia.com/4/boss-fight-furious2.jpg" class="img-fluid accordion-image" alt="...">
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFive">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Title
        </button>
      </h2>
      <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="accordion-text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aperiam itaque quasi ea ratione, debitis tempore exercitationem libero facilis. Neque odit maxime ex quod cupiditate.
            </p>
          </div>
          <div class="image-container">
          <img src="" class="img-fluid accordion-image" alt="...">
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingSix">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Title
        </button>
      </h2>
      <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="accordion-text">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic doloremque porro voluptates dolores, dolorem iste quam. Assumenda labore pariatur consequuntur atque aperiam nisi alias praesentium.</p>
          </div>
          <div class="image-container">
          <img src="" class="img-fluid accordion-image" alt="...">
          </div>
        </div>
      </div>
    </div>
  </div>

<Footer/>

</main>

<style>
  main {
    background: #4D774E;
  }

  .accordion {
    min-height: 20vw;
  }

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .accordion-image {
    width: 30%;
  }

  .card {
    border: 0;
  }

  .card-text {
    text-align:center;
  }

  .card-title {
    text-align:center;
  }

  .accordion-body {
    display: flex;
    flex-direction: row;
  }

  .accordion-collapse {
    background-color: var(--aceit-tertiary);
    color: white;
    border: 2px solid var(--aceit-secondary);
  }

  .accordion-item {
    border: var(--bs-accordion-border-width) solid var(--aceit-secondary);
  }

  .accordion-button:focus {
    box-shadow: 0 0 0 0.25rem #a0e2a2;
  }

  .accordion-button:not(.collapsed) {
    color: var(--aceit-tertiary);
    background-color: #b0f7b3;
  }

  /* .accordion-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
  } */

  .accordion-image {
    border: 2px solid var(--aceit-secondary);
    border-radius: 2.5rem;

    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
  }

  #accordionExample {
    width: 80%;
    margin-left: 10%;
  }


</style>