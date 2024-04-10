<script>

import request from "../api.js";

let key = "";
let uid = "";

function login() {

    /**
     * THIS IS REALLY BAD CODE WE NEED TO GET RID OF THIS WHEN THE LOGIN IS WORKING (its not we it will probably end up being me)
    */
    localStorage.setItem("user_id", uid)

    const req = request('/api/users/login/init', 'GET');

    req.then((res) => {
        console.log(res);
        key = res.key;

    })

    key = key;

}

</script>

<form on:submit|preventDefault={login}>

    <label for="email">Email:</label>
    <br/>
    <input for="email"/>
    <br/>
    <label for="">Other thing: </label>
    <input bind:value={uid} />

    <button>Submit</button>

</form>

<div bind:this={key} style="width:100%; height:100%;">

</div>