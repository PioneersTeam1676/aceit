<!-- FOR DISPLAY PURPOSES ONLY! -->
<!-- This component does not handle API, requests, etc. -->

<script>
    
    export let title, subtitles, definition, style; 
    export let extraFunc, extraClass, extraText;
</script>

<div class="card" style="{style != undefined ? style : ''}">



        
    <div class="item-title">
        <div class="title-group">

            <span class="title">{title}</span>


            {#if extraFunc != undefined && extraText != undefined} 
        
                <button class="{extraClass != undefined ? extraClass : ""}" on:click={extraFunc} style="width: min-content; height: min-content;">{extraText}</button>
            
            {/if}

        </div>
        <span class="definition">{definition}</span>
        <div class="subtitle-group">

            {#if subtitles != undefined}
                {#each subtitles as subtitle}
                    <span class="subtitle">{subtitle}</span>
                {/each}
            {/if}
            
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
        width: 18.75rem;
        height: 12.5rem;
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
    .definition {
        color: white;
        font-size: smaller;
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
    .title-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>