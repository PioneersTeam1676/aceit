<script>

	import API from '../../js/api.js'

	const api = new API();
	console.log(api.getCards());

		let result = "";
	const runTest = async () => {
		result = await api.getUserCards(-1);
		console.log(result)

	}



	//cards
	let owner = -1;
	let term = "term";
	let definition = "definition";
	let image = "img-url";
	let labels = "debug, data";

	//labels
	// let ownerLabel = -1;
	let name = "debug";
	let color = "255, 204, 0";
	let contributors = "-420, -69, -1676";
	let cards = "4, 2, 0";

    async function newCard() {
		const res = await fetch('api/aceit_cards', {
			method: 'POST',
			body: JSON.stringify({
				owner,
				term,
				definition,
                image,
                labels,
			}),
 			headers: {
			  "content-type": "application/json"
			}
		})

		const json = await res.json()
		result = JSON.stringify(json)
	}


	async function newLabel() {
		const res = await fetch('api/aceit_labels', {
			method: 'POST',
			body: JSON.stringify({
				owner,
				name,
				color,
                contributors,
                cards,
			}),
 			headers: {
			  "content-type": "application/json"
			}
		})

		const json = await res.json()
		result = JSON.stringify(json)
	}

</script>
<main>

<button on:click={async () => await runTest()}> TEST</button>

	<div class="form" id="card-form">

		<div class=" bg-gray-600">
			<p class=" text-blue-800">Owner</p>
			<input bind:value={owner}/>
		</div>
		<div>
			<p>Term</p>
			<input bind:value={term}/>
		</div>
		<div>
			<p>Definition</p>
			<input bind:value={definition}/>
		</div>
		<div>
			<p>Image</p>
			<input bind:value={image}/>
		</div>
		<div>
			<p>Labels</p>
			<input bind:value={labels}/>
		</div>

		<button on:click={newCard}>SUBMIT CARD</button>
	</div>

	<div class="form" id="card-form">

		<div class=" ">
			<p class="">Owner</p>
			<input bind:value={owner}/>
		</div>
		<div>
			<p>Name</p>
			<input bind:value={name}/>
		</div>
		<div>
			<p>Color (r, g, b)</p>
			<input bind:value={color}/>
		</div>
		<div>
			<p>Contributers (csv)</p>
			<input bind:value={contributors}/>
		</div>
		<div>
			<p>Cards (csv)</p>
			<input bind:value={cards}/>
		</div>

		<button on:click={newLabel}>SUBMIT LABEL</button>
	</div>

    <p>RESULT:</p>
    <p>{result}</p>
</main>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;


	.form {
		display:flex
	}
</style>