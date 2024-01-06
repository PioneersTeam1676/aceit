<script>
  import { onMount } from 'svelte';

  import bootstrap from "bootstrap";
  import Header from './aceit/sections/Header.svelte';
  import Footer from './aceit/sections/Footer.svelte';

  let loginFrameSrc = "";
  let callback = "apps.team1676.com/api/users/login/callback";
  let app_name = "My App Name"; // TO-DO

  onMount(async function () {
    const response = await fetch("/api/users/login/session");
    const data = await response.text();
    loginFrameSrc = "https://portal.team1676.com/api.php?key=" + data + "&callback=" + callback + "&app_name=" + app_name;
  });
</script>

<Header />

<main>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
    Launch login prompt
  </button>
  
  <!-- Modal -->
  <div class="modal modal-lg fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <iframe id="loginFrame" src="{loginFrameSrc}"></iframe>
      </div>
    </div>
  </div>
</main>

<style>
  #loginModal div.modal-content {
    border-radius: 15px;
  }

  #loginModal iframe#loginFrame {
    width: 100%;
    height: 92vh;
    border-radius: 12px;
  }

  #loginModal button.btn-close {
    position: absolute;
    right: 15px;
    top: 15px;
    background-color: white;
  }
</style>