<script>
    import { onMount } from 'svelte';
    export let params;

    let error = null;

    onMount(() => {
        // Get parameters from URL
        const token = params.token;
        const redirectUrl = localStorage.getItem("redirect_post_login");

        (async () => {

            // Check if redirect exists
            if (!redirectUrl) {
                error = 'Redirect URL is required';
                return;
            }

            if (token) {
                let response = await fetch('https://portal.team1676.com/api.php?session=' + token, { method: 'GET' });
                let uuid = await response.json();
                // uuid = JSON.stringify(uuid);
                try {
                    let user_id = uuid.uuid.substring(4);
                    localStorage.setItem('user_id', user_id);
                } catch (e) {
                    error = 'Failed to store UUID in localStorage';
                    return;
                }
            }


            // Store token in localStorage if it exists
            if (token) {
                try {
                    localStorage.setItem('sess_token', token);
                } catch (e) {
                    error = 'Failed to store token in localStorage';
                    return;
                }
            }

            // Perform redirect with validation
            try {
                new URL(redirectUrl);
                
                // Optional security check
                const allowedDomains = ['1676.team', 'team1676.com', 'aceit.team1676.com'];
                const urlObj = new URL(redirectUrl);
                if (!allowedDomains.some(domain => urlObj.hostname.includes(domain))) {
                    throw new Error('Redirect not allowed');
                }

                window.location.href = redirectUrl;
            } catch (e) {
                error = 'Invalid or unauthorized redirect URL';
            }


        })();
    });
</script>

{#if error}
    <p class="error">{error}</p>
{/if}

<style>
    .error {
        color: red;
    }
</style>