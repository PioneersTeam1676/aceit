

export default class API {





    async getCards() {



        const res = await fetch('api/aceit_cards', {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})
			.then((response) => response.json())



		const finish = async () => {
			const result = await res;
			return result;
		}

		return(finish())



    }

	async getCardById(id) {

        const res = await fetch(`api/aceit_cards/${id}`, {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})
			.then((response) => response.json())



		const finish = async () => {
			const result = await res;
			return result;
		}

		return(finish())



    }

	async getUserCards(userID) {

		const res = await fetch(`api/aceit_cards/owner/${userID}`, {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})

		const json = await res.json()
		let result = json;
		return result

	}

    async newCard(owner, term, definition, image, labels) {
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
		return json
    }

	async getLabels() {

		const res = await fetch(`api/aceit_labels`, {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})
			.then((response) => response.json())



		const finish = async () => {
			const result = await res;
			return result;
		}

		return(finish())
	}

	async getLabelById(id) {
        const res = await fetch(`api/aceit_labels/${id}`, {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})
			.then((response) => response.json())



		const finish = async () => {
			const result = await res;
			return result;
		}

		return(finish())

	}

	async getUserLabels(userID) {
		const res = await fetch(`api/aceit_labels/owner/${userID}`, {
			method: 'GET',
 			headers: {
			  "content-type": "application/json"
			}
		})
			.then((response) => response.json())



		const finish = async () => {
			const result = await res;
			return result;
		}

		return(finish())

	}

	async getUserLabelByName(userID, name) {
		const res = await fetch(`api/aceit_labels/name`, {
			method: 'GET',
			body: JSON.stringify({
				userID,
				name
			}),
			headers: {
				"content-type": "application/json"
			}
		})
		.then((response) => {
			let tempJSON = response.json();
			console.log(tempJSON);
		})

		const json = await res.json();
		return json;
	}


	async newLabel(owner, name, color, contributors, cards) {
		// not sure if there is a more proper way to check if a user already has a label with the same name but this is how it will work for now lol
		const nameCheck = await fetch('api/aceit_labels')

		const res = await fetch('api/aceit_labels', {
			method: 'POST',
			body: JSON.stringify({
				owner,
				name,
				color,
                contributors,
                cards
			}),
 			headers: {
			  "content-type": "application/json"
			}
		})
		.then((response) => {
			let tempJSON = response.json();
			console.log(tempJSON)
		})

		const json = await res.json()
		return json
	}


}