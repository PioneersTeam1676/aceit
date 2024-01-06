<!-- FOR DISPLAY PURPOSES ONLY! -->
<!-- This component does not handle API, requests, etc. -->

<script>
    export let title, subtitles;
</script>

<div class="card">
    <div class="item-title">
        <span class="title">{title}</span>
        <div class="subtitle-group">
            {#each subtitles as subtitle}
                <span class="subtitle">{subtitle}</span>
            {/each}
        </div>
    </div>

    <div>
        <slot></slot>
    </div>
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
</style>