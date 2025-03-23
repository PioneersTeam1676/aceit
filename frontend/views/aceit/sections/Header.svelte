<script>
    export let tab = -1;

    import logo from '../../../media/aceit/AceIt_Logo.svg';
    import favicon from '../../../media/aceit/aceIt_mushroom.png';
    import { location } from 'svelte-spa-router';
    let sidebarOpen = false;

    let headerBgColor = "linear-gradient(90deg, rgb(6, 30, 13) 0%, rgb(15 35 23) 60%, rgb(12, 37, 20) 100%)";
    let route = "";

    location.subscribe(currentRoute => {
        route = currentRoute;
        console.log(route);
        if (currentRoute == "/aceit" || currentRoute == "/") {
            headerBgColor = "linear-gradient(90deg, var(--aceit-tertiary) 10%, var(--aceit-primary) 60%, #508558 100%)";
        }
    });

    function openNav() { sidebarOpen = true; }
    function closeNav() { sidebarOpen = false; }
</script>

<svelte:head>
    <title>ACE-IT</title>
    <link rel='icon' type='image/png' href={favicon}>
</svelte:head>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css'>
    <script src='https://solarisedesign.com/_themes/solarise/js/libgif.js'></script>

    <!-- Added Bootstrap JS ~ Larry -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
</head>

<main>
    <nav class="aceit-header aceit-header-fixed" style="background: {headerBgColor};">
        <a href="/#/aceit">
            <img class = "logo" src={logo} alt = "LogoA">
        </a>
        <button class="aceit-header-dropdown" on:click={openNav}><i class="fa-solid fa-bars"></i></button>


        <div class="aceit-header-menu">
            <a href="/#/aceit">
                <button class="aceit-button {route == "/aceit" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-house"></i>Home</button>
            </a>

            <a href="/#/aceit/decks">
                <button class="aceit-button {route == "/aceit/decks" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-layer-group"></i>My Decks</button>
            </a>

            <a href="/#/aceit/market">
                <button class="aceit-button {route == "/aceit/market" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-store"></i>Marketplace</button>
            </a>

            <a href="/#/aceit/games">
                <button class="aceit-button {route == "/aceit/games" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-gamepad"></i>Games</button>
            </a>
        </div>

        <!-- If Marketplace, hide the search bar (we make our own) -->
        {#if tab!=1}
            <div class="aceit-searchbox">
                <input required="required" type="text">
                <span>Search Cards</span>
                <i></i>
            </div>
        {/if}

        <div class="aceit-header-profile">
            <a href="/#/aceit/login">
                <button style="margin-right: 5px;" class="aceit-button" type="home-button">Log In</button>
            </a>

            <a href="/#/aceit/signup">
                <button class="aceit-button aceit-button-primary" type="home-button">Sign Up</button>
            </a>
        </div>
    </nav>

    <div id="mySidebar" class="sidebar" class:sidebar-open={sidebarOpen}>
        <a href="/#/aceit" style="margin-top: 30px; margin-bottom: 15px;">
            <img class = "logo" style="width: 50px;" src={logo} alt = "LogoA">
        </a>
        <button class="closebtn aceit-button" on:click={closeNav}><i class="fa-regular fa-circle-xmark"></i></button>
        <a href="/#/aceit"><button class="aceit-button {route == "/aceit" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-house"></i>Home</button></a>
        <a href="/#/aceit/decks"><button class="aceit-button {route == "/aceit/decks" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-house"></i>My Decks</button></a>
        <a href="/#/aceit/market"><button class="aceit-button {route == "/aceit/market" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-store"></i>Marketplace</button></a>
        <a href="/#/aceit/games"><button class="aceit-button {route == "/aceit/games" ? "aceit-button-secondary" : ""}" type="home-button"><i class="fa-solid fa-gamepad"></i>Games</button></a>
    </div>
</main>

<!-- Header fix - shift page down -->
<div class="aceit-header">
    <p>&nbsp;</p>
</div>

<style>
    .aceit-header {
        width: 100%;
        height: 90px;
        padding: 0.5vw 1.5rem;
        color: var(--aceit-white);
        background-color: var(--aceit-secondary);
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .aceit-header-fixed {
        position: fixed;
        z-index: 999;
        box-shadow: 0 0 15px 0 black;
    }

    .aceit-header-menu {
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        width: 100%;
        margin-left: 20px;
        margin-left: 5px;
    }

    .aceit-header-profile {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
    }

    .aceit-header-search {
        border: none;
        margin: 1vw;
        background-color: var(--aceit-tertiary);
        border: 2px solid var(--aceit-tertiary);
    }

    .aceit-searchbox {
        position: relative;
        width: 45vw;
    }

    @media only screen and (max-width: 1100px) {
        .aceit-searchbox {
            display: none;
        }
    }

    .aceit-searchbox input {
        position: relative;
        width: 100%;
        padding: 20px 10px 10px;
        background: transparent;
        outline: none;
        box-shadow: none;
        border: none;
        color: #23242a;
        font-size: 1em;
        letter-spacing: 0.05em;
        transition: 0.5s;
        z-index: 10;
    }

    .aceit-searchbox span {
        position: absolute;
        left: 0;
        padding: 20px 10px 10px;
        font-size: 1em;
        color: var(--aceit-secondary);
        letter-spacing: 00.05em;
        transition: 0.5s;
        pointer-events: none;
    }

    .aceit-searchbox input:valid ~span,
    .aceit-searchbox input:focus ~span {
        color: var(--aceit-secondary);
        transform: translateX(-10px) translateY(-34px);
        font-size: 0,75em;
    }

    .aceit-searchbox i {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: var(--aceit-secondary);
        border-radius: 4px;
        @media only screen and (max-width: 1000px) {
            .aceit-search-small {
                display: block;
            }

            .aceit-searchbox {
                display: none;
            }
        }
        transition: 0.5s;
        pointer-events: none;
        z-index: 9;
    }

    .aceit-searchbox input:valid ~i,
    .aceit-searchbox input:focus ~i {
        height: 44px;
    }

/*     The sidebar menu */
    .sidebar {
        height: 100%;
        width: 250px;
        left: -250px;
        position: fixed;
        z-index: 99999;
        top: 0;
        background: #07251f;
        box-shadow: 0 0 31px 0 black;
        overflow-x: hidden; /* Disable horizontal scroll 
        padding-top: 15px;
        transition: all 400ms cubic-bezier(0.55, 0.06, 0.68, 0.19); /* 0.5 second transition effect to slide in the sidebar */
    }

    .sidebar-open {
        left: 0px;
    }

    /* The sidebar links */
    .sidebar a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 18px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    /* When you mouse over the navigation links, change their color */
    .sidebar a:hover {
        color: #f1f1f1;
    }

    /* Position and style the close button (top right corner) */
    .sidebar .closebtn {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 36px;
        margin-left: 50px;
    }
</style>