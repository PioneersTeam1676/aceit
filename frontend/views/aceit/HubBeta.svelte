<script>
    import { onMount } from "svelte";

    import { Card, MoveableCard } from "./Card.js";







onMount(async () => {

    const response = await fetch("/api/aceit_deck");

    const data = await response.text();
    loginFrameSrc = "https://portal.team1676.com/api.php?key=" + data + "&callback=" + callback + "&app_name=" + app_name;

})


</script>