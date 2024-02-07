<!-- FOR DISPLAY PURPOSES ONLY! -->
<!-- This component does not handle API, requests, etc. -->

<script>
    
</script>

<div class="card">
   <h1 style="max-width:100%;">TITLE TITLE TITLE</h1>
    <div id="splitLine"></div>

</div>

<style>
    .card {
        background-color: var(--aceit-primary);
        border: 2px solid black;
        border-radius: 5px;
        padding: 5px;
        width: 300px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: auto;
        text-align:center;

        transition: all 0.2s ease;
    }

    .card:hover {
        background-color: var(--aceit-bs-primary);
        box-shadow: 0px 0px 6px 1px rgba(100,100,100,0.5);
    }

    .title {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 32px;
        color: var(--aceit-accent);
    }

    .subtitle {
        color: white;
        font-size: smaller;
    }

    .subtitle-group {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    #splitLine
    {
        margin-left:2%;
        background-color:white;
        width:100%;
        height:1%;
    }
</style>