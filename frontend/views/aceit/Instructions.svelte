<script>
import Header from './sections/Header.svelte';
  import Footer from './sections/Footer.svelte';
</script>

<main style="height: auto;">
 <Header tab=2 />
 <br/><br/>
  <div class="card" style="width: 100%; background-color:#9DC88D;">
      <div class="card-body">
        <h2 class="card-text card-title" style="color:black">Instructions</h2>
        <p class="card-text" style="color:black; margin-bottom: 10px;">Activies you can do on ACE-IT to enrich your study session!</p>
      </div>
  </div>


  <div class="container">
    <section>
        <h3>Flash Cards</h3>
        <p>A study tool that presents sets of cards containing information on a particular topic. View the front or back of the cards and review at your own pace.</p>
    </section>

    <section>
        <h3>Hangman</h3>
        <p>A word-guessing game where players guess letters to uncover a hidden word or phrase. Incorrect guesses result in losing lives and eventually losing the game.</p>
    </section>

    <section>
        <h3>Memory Match</h3>
        <p>A card matching game that helps improve cognitive skills and short-term memory. Flip over pairs of matching cards to earn points.</p>
        <!-- <img src="https://www.hopkinsmedicine.org/-/media/images/health/3_-wellness/aging-well/memory-science-teaser.ashx" alt="Memory Match"> -->
    </section>

    <section>
        <h3>Boss Battle</h3>
        <p>Test your knowledge with our Boss Battle game! Defeat the boss by answering questions correctly and prove that you have what it takes to ace your exams.</p>
        <!-- <img src="https://images.fanpedia.com/4/boss-fight-furious2.jpg" alt="Boss Battle"> -->
    </section>
  </div>

  <!--<div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h3 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          Flash Cards
        </button>
      </h3>
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
    <h3 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Hangman
      </button>
    </h3>
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
    <h3 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Memory Match
      </button>
    </h3>
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
      <h3 class="accordion-header" id="headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Boss Battle
        </button>
      </h3>
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
      <h3 class="accordion-header" id="headingFive">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Title
        </button>
      </h3>
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
    </div> -->
    <!-- <div class="accordion-item">
      <h3 class="accordion-header" id="headingSix">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Title
        </button>
      </h3>
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
  </div> -->

 <br/><br/><br/><br/>

<Footer/>

</main>

<style>
  main {
    background: #9DC88D;
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
    background-color: #385139;
    color: white;
    border: 2px solid #0000004f;
  }

  .accordion-item {
    border: var(--bs-accordion-border-width) solid var(--aceit-secondary);
  }

  .accordion-button::after,
  .accordion-button:not(.collapsed)::after {
    color: white;
  }

  .accordion-button {
    background: linear-gradient(90deg, #092812 0%, #0a2515 100%) !important;
    background-color: unset;
    color: white;
  }

  .accordion-button:focus {
    box-shadow: 0 0 0 0.25rem #a0e2a2;
  }

  .accordion-button:not(.collapsed) {
    color: #fff;
    font-weight: bolder;
    background-color: linear-gradient(90deg, #0b3918 0%, #143118 100%);
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