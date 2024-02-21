<script>

	/** @type {Boolean} */
	export let showModal;
	/** @type {Function}*/
	export let onConfirm;
	/** @type {Function}*/
	export let onClose;

	
	/** @type {HTMLDialogElement}*/
	let dialog;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="header">
			<slot name="header" />
		</div>
		<hr>
		<div class="content">
			<slot name="content" />
		</div>
		<hr>
		<div class="button-row">
			<button class="confirm" on:click={() => {onConfirm(); dialog.close();}}>Confirm</button>
			<!-- svelte-ignore a11y-autofocus -->
			<button class="cancel" autofocus on:click={() => {onClose(); dialog.close();}}>Cancel</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: 330px;
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0px 5px;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
		border-radius: 5px;
		transition: box-shadow 0.2s;
	}

	button:hover {
		box-shadow: 0px 0px 5px rgba(100,100,100,0.4);
	}

	.button-row {
		display: flex;
		justify-content: space-between;
		width: 150px;
	}

	.confirm {
		background-color: #86c8ff;
		border: 1px solid blue;
	}

	.header {
		font-size: 20px;
		font-weight: bolder;
		text-align: center;
	}
</style>
