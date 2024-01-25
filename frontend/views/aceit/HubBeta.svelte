<script>

    // import svelte components
    import Header from '../aceit/sections/Header.svelte';

    // import js stuff
    import { Card, MoveableCard } from "./Card.js";
    import Hub from "./Hub.js"
    import request from "../api.js";
    import { Deck } from "./Deck.js"
    import { onMount } from 'svelte';

    // let data = getTest();

    let data = request('api/aceit_cards/owner/-1', 'GET');


    async function getTest() {
        const response = await fetch('api/aceit_cards/owner/-1', {
			method: 'GET',
			// body: JSON.stringify({
			// 	title,
			// 	description,
			// 	published
			// }),	
 			headers: {
			  "content-type": "application/json"
			}
		})
        const text = await response.text();

        if(response.ok) {
            return text;
        } else {
            throw new Error(text);
        }
    }


    async function handleClick() {
        data = Deck.generateFromCardIDs('-1', '-1', 'hi', 'hi2', false, [9,14,13,12,6]);

        

        console.log(data);
    }

    onMount(() => {
        const cards = request('api/aceit_cards/owner/-1', 'GET');

        cards.then((res) => {
            console.log(res)
        })
    })




</script>

<body>

    <Header/>

    <button on:click={handleClick}>thingy</button>

    {#await data}
        <p>waiting...</p>
    {:then res} 
        <p>{res}</p>
    {/await}




</body>