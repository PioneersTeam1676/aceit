/**
 * @callback requestCallback
 * @param {Object} res the data that is returned by the server
 * 
 */

/**
 * Make a request to the server
 * @param {String} path the path in the backend to the data
 * @param {String} method the method you want to run. GET, POST etc.
 * @param {Object} [body] the optional body object for storing data to send to the server
 * @returns {Promise.<>} a promise for the JSON data of the request, or an error if something fails.
 * 
 * @example 
 * //Gets all the cards for the user with an id of -1
 * const cards = request('api/aceit_cards/owner/-1', 'GET');
 * // cards is now a promise that will return the array of all the cards owned by the user
 * cards.then((res) => {
 *  console.log(res);
 * });
 * // this will now print out the array in the console once it is returned by the promise
 * 
 * @example
 * // Create a new card in the database
 *  const newCard = request('api/aceit_cards' , 'POST', {
 *      owner,
 *      term,
 *      definition,
 *      image,
 *      labels,
 *      public
 *  });
 * // in this example owner, term, etc. would all be variables with the name the same as the backend BUT if you had variable names differnt from the backend OR no variables you would need to change your code to look like something like this: 
 *  const newCard2 = request('api/aceit_cards', 'POST', {
 *      owner: cardOwner,
 *      term: "example term",
 *      definition: def,
 *      image: "",
 *      labels: labels,
 *      public: false
 * });
 * // this example uses a combination of both variables and literal values but notice that they correspond to the name of the variable in the backend via the term to the left of the colon
 */
const request = async (path, method, body) => {

    const res = await fetch(path, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }

    });

    const text = await res.text();

    if(res.ok) {

        try {
            return await JSON.parse(text);
        } catch {
            return text;
        }
    } else {
        throw new Error(text);
    }

}

export default request;