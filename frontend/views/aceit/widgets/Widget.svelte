<script>

  export let url;

  import { playCards } from '../../../js/stores.js';


  export let validSectNames;
  export let sects;

  let sectSelectionText = "BIO!";

  const launch = () => {
    console.log(validSectNames)
    if(validSectNames.indexOf(sectSelectionText) != -1) {
      const i = validSectNames.indexOf(sectSelectionText);

      console.log(sects[i])
      for(let x = 0; x < sects[i].cards.length; x++) {

        $playCards.push(sects[i].cards[x].id);
      }

    console.log($playCards);

    window.location.href = "https://apps.team1676.com/#/aceit/flashcards";


    }
  }



  </script>

  <!-- <Header/> -->
  <body data-new-gr-c-s-check-loaded="14.1097.0" data-gr-ext-installed="">
         <div>

          <form  on:submit|preventDefault>


           <div class="card" style="width: 15rem;">
    <div class="card-header">
    <h1> Flashcards </h1>
    </div>
    <div class="card-body">

      <div class="form-group">
      <label for="Labels">Labels</label>
      <input class="form-control" id="Labels" aria-describedby="emailHelp" placeholder="Enter labels" bind:value={sectSelectionText}>
    </div>




    <div class="form-check">


    </div>
    <button type="submit" class="btn btn-primary" on:click={() => launch()}>Launch Game</button>




    </div>
  </div></form>
  </div></body>

<!-- <script>
    export let title;
    export let url;

    import { playCards } from '../../../js/stores.js';


    export let validSectNames;
    export let sects;

    let sectSelectionText = "BIO!";

    const launch = () => {
      console.log(validSectNames)
      if(validSectNames.indexOf(sectSelectionText) != -1) {
        const i = validSectNames.indexOf(sectSelectionText);

        console.log(sects[i])
        for(let x = 0; x < sects[i].cards.length; x++) {

          $playCards.push(sects[i].cards[x].id);
        }

        console.log($playCards);

      window.location.href = url;


    }
  }

</script> -->

<!-- <main>
    <div class="card">
        <div class="card-header">
            <h1 class="title">{title}</h1>
        </div>
        <div class="card-body">
          </div>
          <form  on:submit|preventDefault>
            <div class="form-group">
              <label for="labels">Labels</label>
              <input class="form-control" id="labels" placeholder="Math, Bio" bind:value={sectSelectionText}>
            </div>
          <div class="form-check">
        </div>
        <button on:submit|preventDefault class="aceit-button aceit-button-secondary" on:click={launch}><i class="fa-solid fa-rocket"></i> Launch Game</button>
    </div>
</main> -->

<!-- <body data-new-gr-c-s-check-loaded="14.1097.0" data-gr-ext-installed="">
  <div class="card">

    <form  on:submit|preventDefault>

    <div class="card" style="width: 15rem;">
      <div class="card-header">
        <h1 class="title"> {title} </h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="Labels">Labels</label>
          <input class="form-control" id="Labels" aria-describedby="emailHelp" placeholder="Enter labels" bind:value={sectSelectionText}>
        </div>
        <div class="form-check">
        </div>
        <button type="submit" class="btn btn-primary" on:click={() => launch()}>Launch Game</button>
      </div>
    </div>
    </form>
  </div>
</body> -->


<!-- <style>
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
</style> -->