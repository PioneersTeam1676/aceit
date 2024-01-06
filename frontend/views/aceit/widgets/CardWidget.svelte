<script>
    //import { checkPrime } from "crypto";

// import Header from '../sections/Header.svelte';
  import API from "../../../js/api.js";
  import { newCard } from '../../../js/stores.js';
  import { HubCard } from '../../../js/cards.js';

  export let owner = -1;
  export let term = "ive given up on naming these";
  export let def = "here too";
  export let image = "";
  export let labels = "here, too";

  const api = new API();
  // WE NEED TO HAVE A CHECK SOMEWHERE IN THE CREATION STEP THAT MAKES SURE THE USER DOSENT ALREADY HAVE A CARD WITH THE SAME TERM
  //(actually prly not, we just need to switch over to only using ids everywhere in the code...) (project for later :D )
  const makeCard = async () => {
    console.log("1")
    let parsedLabels;

    let labelIsReal = true;

    parsedLabels = labels.split(/,/);

    parsedLabels.forEach((label, x) => {
      // THIS DOSENT ACTUALLY WORK RN FOR SOME REASON SO THERE IS NO LABEL PARSING TO MAKE SURE THAT THE LABEL ACTUALLY EXISTS
      // THIS NEEDS TO BE FIXXED (eventually)
      if(label.length >= 2 && label.slice(0, 1) == ' ') {
        label = label.slice(1);
        parsedLabels[x] = parsedLabels[x].slice(1);
      }

      if(labelIsReal != false) {
        labelIsReal = checkLabels(label);
        console.log(2)
      }

    })

    if(labelIsReal && term.length >= 1 && def.length >= 1) {
      const createdCard = await api.newCard(owner, term, def, image, labels);
      console.log(createdCard);

      let newLabels = [];


      parsedLabels.forEach((label, x) => {
        newLabels.push(label);

        // THERE IS NO LABEL PARSING HERE THIS WILL 100% CAUSE ERRORS LATER
      })

      $newCard = new HubCard(createdCard.id, createdCard.owner, createdCard.term, createdCard.definition, newLabels, createdCard.image, 0, 0)







    } else {
      // someone needs to make something to notify the user that they did something wrong
      console.log('you did something wrong!')
    }

  }

  const checkLabels = async (label) => {
    const labels = await api.getUserLabels(owner)

    for(let x= 0; labels > labels.length; x++) {

      if(labels[x].name == label) return true;

    }

    return false;

  }

</script>

<!-- <Header/> -->
<body data-new-gr-c-s-check-loaded="14.1097.0" data-gr-ext-installed="">
       <div>




         <div class="card" style="width: 15rem;">
  <div class="card-header">
  <h1> Create Cards </h1>
  </div>
  <div class="card-body">


    <div class="form-group">
    <label for="Terms">Term</label>
    <input type="email" class="form-control" id="Term" aria-describedby="emailHelp" placeholder="Enter a term" bind:value="{term}">
  </div>
  <div class="form-group">
    <label for="Definition">Definition</label>
    <input type="email" class="form-control" id="Definition" aria-describedby="emailHelp" placeholder="Enter a definition" bind:value="{def}">
  </div>
    <div class="form-group">
    <label for="Labels">Labels</label>
    <input type="email" class="form-control" id="Labels" aria-describedby="emailHelp" placeholder="Enter labels" bind:value="{labels}">
  </div>

  <div>


  <div class="form-check">


  </div>
  <button type="submit" class="aceit-button aceit-button-secondary" on:click={() => makeCard()} on:submit|preventDefault>Make Card</button>




  </div>
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
  /* border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius); */
}

.card-header {
  border-bottom: var(--bs-card-border-width) solid var(--aceit-primary);
}

.form-group {
  margin: 0.25vw;
}

</style>