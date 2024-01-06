<script>
    // import Header from '../sections/Header.svelte';

    export let name = "";
    export let color = "";

    </script>

    <!-- <Header/> -->
    <body data-new-gr-c-s-check-loaded="14.1097.0" data-gr-ext-installed="">
           <div>



             <div class="card" style="width: 15rem;">
      <div class="card-header">
      <h1> Create Labels </h1>
      </div>
      <div class="card-body">


    <div class="form-group">
        <label for="Name">Name</label>
        <input class="form-control" id="Term" aria-describedby="emailHelp" placeholder="Enter a name" bind:value={name}>
    </div>
    <div class="form-group">
        <label for="Color">Color</label>
        <input type="color" class="form-control" id="Term" value="#ffcc00">
    </div>
    <button type="submit" class="aceit-button aceit-button-secondary">Create Label</button>
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