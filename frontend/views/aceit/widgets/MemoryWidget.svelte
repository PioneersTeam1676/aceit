<script>
// import Header from '../sections/Header.svelte';
import { playCards } from '../../../js/stores.js'

let sectSelectionText = "BIO!"

export let validSectNames;
export let sects;

const launch = () => {
  if(validSectNames.indexOf(sectSelectionText) != -1) {
    const i = validSectNames.indexOf(sectSelectionText);

    console.log(sects[i])
    for(let x = 0; x < sects[i].cards.length; x++) {

      $playCards.push(sects[i].cards[x].id);
    }


  window.location.href = "https://apps.team1676.com/#/aceit/memory";


  }
}

</script>

<!-- <Header/> -->
<body data-new-gr-c-s-check-loaded="14.1097.0" data-gr-ext-installed="">
       <div>




         <div class="card" style="width: 15rem;">
  <div class="card-header">
  <h1> Memory Matching </h1>
  </div>
  <div class="card-body">

    <div class="form-group">
    <label for="Labels">Labels</label>
    <input class="form-control" id="Labels" aria-describedby="emailHelp" placeholder="Enter Section" bind:value={sectSelectionText}>
  </div>


</div>




  <div class="form-check">


  </div>
  <button type="submit" class="aceit-button aceit-button-secondary" on:click={() => launch()} >Launch Game</button>




  </div>
</div></body>

<style>


  .card {
      background-color: var(--aceit-tertiary);
      border: 3px solid var(--aceit-secondary);
      width: 15rem;
      border-radius: 1rem;
    }

    .card h1, .card label {
    color: white;
    }

    .title {
      text-align: center;
    }

  .card button {
    border-radius: 0.7rem;
    border-top-left-radius: var(--bs-border-radius);
    border-top-right-radius: var(--bs-border-radius);
  }

  .card-header {
    border-bottom: var(--bs-card-border-width) solid var(--aceit-primary);
  }

  .form-group {
    margin: 0.25vw;
  }

  </style>