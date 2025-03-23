<script>
    // import components
    import Header from "./sections/Header.svelte";
    import Footer from "./sections/Footer.svelte";
    import Card from "./sharedComponents/Card.svelte";
    import PopupModal from "./sharedComponents/PopupModal.svelte";
    import { fade } from "svelte/transition";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { Deck } from "./Deck.js";
    import { Card as JSCard } from "./Card.js"

    // unused imports, kept so I don't forget what they are
    import { playCards } from "../../js/stores.js";
    import { get } from "svelte/store";
    import request from "../api.js";

    let USER_ID = localStorage.getItem("user_id");

    // placeholder data
    const allCards = [
        {
            id: '51070128347012837081293',
            name: "CO2",
            date: new Date("May 8 1984"),
            user: "ballslover69",
            defs: ["Carbon Dioxide"],
        },
        {
            id: '18052170283471082371283',
            name: "H2O",
            date: new Date("Jan 17 2022"),
            user: "RealTeacher22",
            defs: ["Water", "Hydric Acid"],
        },
        {
            id: '86781237485721823512350',
            name: "Industrial Revolution",
            date: new Date("Aug 30 2023"),
            user: "aosdhaiosudhaouwhdfauosd",
            defs: ["The period with rapid industrial expansion"],
        },
        {
            id: '13425765434765432123121',
            name: "H2O",
            date: new Date("Jan 17 2022"),
            user: "RealTeacher22",
            defs: ["Water", "Hydric Acid"],
        },
        {
            id: '67258394565812940581251',
            name: "Industrial Revolution",
            date: new Date("Aug 30 2023"),
            user: "aosdhaiosudhaouwhdfauosd",
            defs: ["The period with rapid industrial expansion"],
        },
        {
            id: '17829045868012000924812',
            name: "H2O",
            date: new Date("Jan 17 2022"),
            user: "RealTeacher22",
            defs: ["Water", "Hydric Acid"],
        },
        {
            id: '980012583251263352305844',
            name: "Industrial Revolution",
            date: new Date("Aug 30 2023"),
            user: "aosdhaiosudhaouwhdfauosd",
            defs: ["The period with rapid industrial expansion"],
        },
        {
            id: '608127540182381056801802',
            name: "H2O",
            date: new Date("Jan 17 2022"),
            user: "RealTeacher22",
            defs: ["Water", "Hydric Acid"],
        },
        {
            id: '145671000004021823485128',
            name: "Industrial Revolution",
            date: new Date("Aug 30 2023"),
            user: "aosdhaiosudhaouwhdfauosd",
            defs: ["The period with rapid industrial expansion"],
        },
    ];

    let allDecks = [];

    let loadAllDecks = request(`api/aceit_decks/getNDecks/${3}`, 'GET');
    

    loadAllDecks.then((res) => {
        
        console.log("Load res: \n"+res)
    });

    const allDecksOld = [
        {
            id: '358172098571028371823',
            name: "My chemistry set",
            count: 12,
            user: "ambatukam4",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '6158237401827408142',
            name: "The Industrial Revolution",
            count: 59,
            user: "NoobFucker69",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '518234701835701',
            name: "Physics Equations",
            count: 12,
            user: "ambatukam4",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '70618274081238127348',
            name: "The Industrial Revolution",
            count: 59,
            user: "NoobFucker69",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '6805137450812730172308',
            name: "Random Set i think",
            count: 12,
            user: "ambatukam4",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '72312051208457968210347',
            name: "The Industrial Revolution",
            count: 59,
            user: "NoobFucker69",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '10249810259299912485',
            name: "fard noises",
            count: 12,
            user: "ambatukam4",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '5821720481750287480128034',
            name: "The Industrial Revolution",
            count: 59,
            user: "NoobFucker69",
            date: new Date("Feb 10 2023"),
        },
        {
            id: '608123740812182308123312',
            name: "This deck name is really long and should be shortened somehow",
            count: 12,
            user: "aVeryLongUsernameThatShouldBeModifiedAlongsideTheNameOfTheAforementionedDeck",
            date: new Date("Nov 16 2023"),
        },
    ];

    const myDecks = [allDecks[2], allDecks[6], allDecks[0]];

    // search states
    let searchInput = "";
    let cardResults = allCards;
    let deckResults = allDecks;
    let hasSearched = false;
    let aniFadeTime = 600;

    let relevanceSetting = 0;

    // update cards shown
    function search() {
        hasSearched = true;

        if (searchInput === "") {
            cardResults = allCards;
            deckResults = allDecks;

            return;
        }

        // similarity functions
        function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();

            var costs = new Array();
            for (var i = 0; i <= s1.length; i++) {
                var lastValue = i;
                for (var j = 0; j <= s2.length; j++) {
                    if (i == 0) costs[j] = j;
                    else {
                        if (j > 0) {
                            var newValue = costs[j - 1];
                            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                                newValue =
                                    Math.min(
                                        Math.min(newValue, lastValue),
                                        costs[j]
                                    ) + 1;
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        }
                    }
                }
                if (i > 0) costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        }
        function similarity(s1, s2) {
            var longer = s1;
            var shorter = s2;
            if (s1.length < s2.length) {
                longer = s2;
                shorter = s1;
            }
            var longerLength = longer.length;
            if (longerLength == 0) {
                return 1.0;
            }
            return (
                (longerLength - editDistance(longer, shorter)) /
                parseFloat(longerLength)
            );
        }

        cardResults = allCards.filter(
            (card) =>
                similarity(
                    card.name.toLowerCase(),
                    searchInput.toLowerCase()
                ) > Number(relevanceSetting)
        );
        deckResults = allDecks.filter(
            (deck) =>
                similarity(
                    deck.name.toLowerCase(),
                    searchInput.toLowerCase()
                ) > Number(relevanceSetting)
        );
    }

    function setVMC(vmc) { viewModalContentElement.innerHTML = vmc };
    function setVMN(vmn) { viewModalNameElement.innerHTML = vmn };

    // Both are HTML elements.
    let viewModalContentElement;
    let viewModalNameElement;
    let configModalElement;

    let showModal = false;
    let showConfigModal = false;

    let modalData;
    let modalFunction;

    function popup(title, vmc) {
        if (showModal) return; // can't open the modal while one is already open :thumbs-up:
        setVMN(title);
        setVMC(vmc);
        showModal = true;
    }

    function popupAddDeck(deck) {
        let content = `Add deck <i>${deck.name}</i>?`;
        modalData = deck;
        modalFunction = addDeckToHub;
        popup("Add Deck to Collection", content);
    }

    function popupViewDeck(deck) {
        let content = "No data available yet. Pls make backend 🥺";
        modalData = deck;
        modalFunction = viewDeck;
        popup(`Viewing deck <i>${deck.name}</i>`, content);
    }

    function popupAddCard(card) {
        let content = "<select>";
        myDecks.forEach(deck => {
            content += `\n\t<option value="${deck.id}">${deck.name}</option>`;
        });
        modalData = card;
        modalFunction = addCard;
        popup(`Add Card <i>${card.name}</i> to a Deck`, `${content}\n</select>`);
    }

    function popupConfig() {
        showConfigModal = true;
        popup("Search Settings", "Settings will go here.");
    }

    const addDeckToHub = () => {
        
        let newDeck = request('api/aceit_decks/', 'POST', {
            owner: modalData.id,
            name: modalData.name, 
            description: modalData.description,
            cards: modalData.cards,
            public: modalData.dbPublic
        });

        newDeck.then((res) => {
            showConfigModal = false;
            
        })

    }

    const viewDeck = () => {

    }

    const addCard = () => {

    }
</script>

<main class="bg-white">
    <Header tab=1 />

    <PopupModal bind:showModal onConfirm={modalFunction} onClose={() => {showConfigModal = false;}}>
        <div slot="header">
            <div bind:this={viewModalNameElement}></div>
        </div>

        <div slot="content">
            {#if showConfigModal}
                <div bind:this={viewModalContentElement}>
                    <label class="input-label" for="relevance-min-config">Relevance Minimum</label><br>
                    <select id="relevance-min-config" bind:value={relevanceSetting}>
                        <option value="0">Relevance > 0</option>
                        <option value="0.2">Relevance > 0.2</option>
                        <option selected value="0.5">Relevance > 0.5</option>
                        <option value="1">Relevance = 1</option>
                    </select>
                </div>
            {:else}
                <div bind:this={viewModalContentElement}></div>
            {/if}
        </div>
    </PopupModal>

    <!-- The input elements -->
    <div class="top-bar">
        <input on:keydown:enter="{search}" class="search-input" bind:value="{searchInput}" type="text" placeholder="Search for study materials" />
        <button class="input-button" on:click={search}><i class="fa-solid fa-search"></i></button>
        <button class="input-button" on:click={popupConfig}><i class="fa-solid fa-gear"></i></button>
    </div>

    {#await loadAllDecks}
        <p>Loading Decks...</p>
    {:then thingThatWontBeUsed} 
        
    <div class="results">
        <!-- Card results -->
        <div>
            <!-- Update title of results according to data -->
            {#if hasSearched}
                <h3>Top Card Results</h3>
            {:else}
                <h3>Trending Cards</h3>
            {/if}
            <!-- Show results of any searches -->
            <div in:fade="{{ aniFadeTime }}" id="card-result-container">
                {#each cardResults as card}
                    <Card title="{card.name}" subtitles="{card.defs}">
                        <button on:click={() => { popupAddCard(card) } } class="accent-button card-add">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </Card>
                {/each}
            </div>
        </div>

        <!-- Deck results- -->
        <div>
            {#if hasSearched}
                <h3>Top Deck Results</h3>
            {:else}
                <h3>Trending Decks</h3>
            {/if}
            <div id="deck-result-container">
                {#each deckResults as deck}
                    <Card title="{deck.name}" subtitles="{[deck.cards.length + ' cards']}">
                        <button on:click={() => {popupAddDeck(deck)}} class="accent-button deck-add">
                            <i class="fa-solid fa-plus"></i> Add Deck
                        </button>
                        <button on:click={() => {popupViewDeck(deck)}} class="accent-button deck-view">
                            <i class="fa-solid fa-eye"></i> View Deck
                        </button>
                    </Card>
                {/each}
            </div>
        </div>
    </div>
    {/await}


    <div style="background: #9dc88d;">
        <br/><br/><br/><br/><br/><br/>

        <h3 style="text-align: center;">
            Marketplace is under construction. Check back soon!
        </h3>

        <br/><br/><br/><br/><br/><br/>
    </div>

    <Footer />
</main>

<style>
    main {
        background: white;
    }

    h3 {
        margin-left: 5px;
    }

    .results {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
    }

    .results > * {
        width: max-content;
    }

    .top-bar {
        width: 100%;
        height: 50px;
        padding: 10px;
        background-color: var(--aceit-secondary);
        display: flex;
    }

    .search-input {
        padding: 0px 5px;
        margin: 0px 0px 0px 5px;
        border-radius: 5px;
        display: flex;
    }

    .input-button {
        border-radius: 5px;
        background-color: white;
        display: flex;

        margin-left: 2px;
    }

    #card-result-container,
    #deck-result-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;

        width: min-content;
        padding: 10px;
    }

    .accent-button {
        background-color: var(--aceit-accent);
        color: white;
        border: none;
        border-radius: 5px;

        transition: background-color 0.2s ease;
    }

    .accent-button:hover {
        background-color: var(--aceit-bs-accent);
        cursor: pointer;
    }

    .card-add {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: 0;
    }

    .dropdown {
        width: 100px;
        height: fit-content;
        border: 2px solid black;
        border-radius: 5px;
    }

    .dropdown-closed {
        display: none;
        height: 0px;
    }

    .dropdown-open {
        display: block;
        height: 100px;
    }

    .dropdown-entry {
        padding: 2px;
        border-left: 1px solid transparent;
    }

    .dropdown-entry:hover {
        border-left: 1px solid blue;
    }

    .input-label {
        font-size: smaller;
        font-weight: bold;
        margin-bottom: 2px;
        padding: 0;
    }
</style>
