<script>

    import Header from '../sections/Header.svelte';
    import Footer from '../sections/Footer.svelte';

    let quizlet_cards = [
      {'term': 'Faire des châteaux de sable', 'definition': 'To make sandcastles'},
      {'term': 'Jouer à la poupée', 'definition': 'To play with dolls'},
      {'term': 'Sauter à la corde', 'definition': 'Jumprope'},
      {'term': 'Faire du manège', 'definition': 'To ride rides at the fair'},
      {'term': 'Jouer à chat perché', 'definition': 'To play tag'},
      {'term': 'Faire de la balançoire', 'definition': 'To go on the swings'},
    //   {'term': 'Jouer à la marelle', 'definition': 'To play hopscotch'},
    //   {'term': 'Jouer au train électrique', 'definition': 'To play with an electric train'},
    //   {'term': 'Jouer au ballon', 'definition': 'To play ball'},
    //   {'term': 'Grimper aux arbres', 'definition': 'To climb trees'},
    //   {'term': 'Jouer aux dames', 'definition': 'To play checkers'},
    //   {'term': 'Jouer aux petits voitures', 'definition': 'To play with cars'},
    //   {'term': 'Aller au cirque', 'definition': 'To go to the circus'},
    //   {'term': 'Faire des farces', 'definition': 'To play pranks'},
    //   {'term': 'Regarder des dessins animés', 'definition': 'To watch cartoons'},
    //   {'term': 'Collectionner des timbres', 'definition': 'To collect stamps'},
    //   {'term': 'Jouer aux billes', 'definition': 'To play marbles'},
    //   {'term': 'Faire de la bascule', 'definition': 'To go on the see-saw'},
    //   {'term': 'Sauter sur un trampoline', 'definition': 'To jump on the trampoline'},
    //   {'term': 'Jouer dans le parc', 'definition': 'To play in the park'},
    //   {'term': 'Jouer à faire semblant', 'definition': 'To play pretend'}
    ];

    let mastery = [];

    for (let i = 0; i < quizlet_cards.length; i++)
    {
        mastery.push(0);
    }



    let question_type = "start";
    let multiple_choices = [];
    let answer = "";
    let answerIndex = 0;
    let clicked = false;
    let correct = false;
    let correctIndex = 0;

    function ifWin() {
        for (let i = 0; i < mastery.length; i++)
        {
            if (mastery[i] < 100)
            {
                return false;
            }
        }
        return true;
    }


    function nextQuestion() {

        clicked = false;
        console.log("clicked: "+clicked);

        if (ifWin())
        {
            question_type = "won";
            return;
        }

        //make sure new correct index is different from last correct index
        let temp = correctIndex;
        do
        {
            correctIndex = Math.floor(Math.random() * quizlet_cards.length);
        }
        while (correctIndex === temp || mastery[correctIndex] >= 100);

        if (mastery[correctIndex] < 30)
        {
            console.log(correctIndex+" MASTERY:"+mastery[correctIndex]);
            makeTrueOrFalseQuestion();
        }
        else if (mastery[correctIndex] >= 60)
        {
            console.log(correctIndex+" MASTERY:"+mastery[correctIndex]);
            makeWrittenQuestion();
        }
        else
        {
            console.log(correctIndex+" MASTERY:"+mastery[correctIndex]);
            makeMultipleChoiceQuestion();
        }

    }

    function makeMultipleChoiceQuestion() {
        question_type = "multiple choice";
        multiple_choices = [];

        for (let i = 0; i < 3; i++)
        {
            let str;

            do
            {
                str = quizlet_cards[Math.floor(Math.random() * quizlet_cards.length)];
                console.log("i: "+i+" "+str.term)
            }
            while(multiple_choices.includes(str) || quizlet_cards.indexOf(str)===correctIndex);

            multiple_choices.push(str);
        }

        //add correct answer at random position between wrong answers

        answerIndex = Math.floor(Math.random() * multiple_choices.length);
        multiple_choices.splice(answerIndex, 0, quizlet_cards[correctIndex]);

        answer = multiple_choices[answerIndex].definition;

        console.log("multiple choice question. answer = "+answer);
    }

    function makeWrittenQuestion() {
        question_type = "written";
        multiple_choices = [];

        let str = quizlet_cards[correctIndex];
        multiple_choices.push(str);

        answerIndex = 0;
        answer = multiple_choices[answerIndex].definition;

        //clear input box
        // document.getElementById("written-input").value = "";

        console.log("written question. answer = "+answer);
    }

    function makeTrueOrFalseQuestion() {
        question_type = "true or false";
        multiple_choices = [];

        let str = quizlet_cards[correctIndex];
        multiple_choices.push(str);

        if (Math.random() > 0.5)
        {
            //true
            multiple_choices.push(str);
            answerIndex = 0;
            answer = "true";
        }
        else
        {
            //false
            let str;
            do
            {
                str = quizlet_cards[Math.floor(Math.random() * quizlet_cards.length)];
                console.log(str.term)
            }
            while(multiple_choices.includes(str) || quizlet_cards.indexOf(str)===correctIndex);
            multiple_choices.push(str);
            answerIndex = 1;
            answer = "false";

        }

        console.log("true or false question. answer = "+answer);
    }

    async function correctClick() {
        console.log("correct click");
        clicked = true;
        correct = true;

        mastery[correctIndex] += 20;
        // if (question_type==="true or false")
        // {
        //     // add 10 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] += 10;
        // }
        // else if (question_type==="multiple choice")
        // {
        //     // add 20 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] += 20;
        // }
        // else if (question_type==="written")
        // {
        //     //add 50 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] += 50;
        // }

        console.log(mastery);


        await new Promise(resolve => setTimeout(resolve, 3000));
        nextQuestion();
    }

    async function wrongClick() {
        console.log("wrong click");
        clicked = true;
        correct = false;

        mastery[correctIndex] -= 20;
        if (mastery[correctIndex] < 0) mastery[correctIndex] = 0;
        // if (question_type==="true or false")
        // {
        //     // subtract 10 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] -= 10;
        // }
        // else if (question_type==="multiple choice")
        // {
        //     // subtract 20 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] -= 20;
        // }
        // else if (question_type==="written")
        // {
        //     // subtract 50 mastery
        //     mastery[quizlet_cards.indexOf(multiple_choices[answerIndex])] -= 50;
        // }

        console.log(mastery);

        await new Promise(resolve => setTimeout(resolve, 3000));
        nextQuestion();

    }

    // nextQuestion();



    //string similarity stuff
    //https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

</script>

<main>
    <Header />

    {#if question_type==="multiple choice"}
    <div class="multiple-choice-question">
        <!-- title -->
        <h1>Multiple Choice Question</h1><br><br>
        <h3>{clicked ? ((correct ? "CORRECT" : "WRONG") + (" "+mastery[correctIndex]+"% mastery")) : ""}</h3><br><br>
        Which one matches with: "{multiple_choices[answerIndex].term}"?

        <!-- multiple choices inputs -->
        {#each multiple_choices as {term, definition}, i}
            <br><br>
            <button on:click={(!clicked) ? ((definition===answer) ? correctClick : wrongClick) : ""}>{i}: "{definition}"</button>
        {/each}

    </div>
    {:else if question_type==="written"}
    <div class="written-question">
        <!-- title -->
        <h1>Written question</h1> <br> <br>
        <h3>{clicked ? ((correct ? "CORRECT" : "WRONG") + (" "+mastery[correctIndex]+"% mastery")) : ""}</h3><br><br>

        "{multiple_choices[0].term}" matches with: <br> <br>

        <!-- written inputs -->
        <input type="text" id="written-input">
        <button on:click={(!clicked) ? ((similarity(document.getElementById("written-input").value, answer) > 0.75) ? correctClick : wrongClick) : ""}>Submit</button>

    </div>
    {:else if question_type==="true or false"}
    <div class="true-false-question">
        <!-- title -->
        <h1>True or False Question</h1> <br> <br>
        <h3>{clicked ? ((correct ? "CORRECT" : "WRONG") + (" "+mastery[correctIndex]+"% mastery")) : ""}</h3><br><br>

        "{multiple_choices[0].term}" matches with "{multiple_choices[1].definition}" <br> <br>

        <!-- true or false inputs -->
        <button on:click={(!clicked) ? (("true"===answer) ? correctClick : wrongClick) : ""}>True</button> <br> <br>
        <button on:click={(!clicked) ? (("false"===answer) ? correctClick : wrongClick) : ""}>False</button>

    </div>
    {:else if question_type==="start"}
    <div class="aceit-win-screen">
        <h1>Answer the questions correctly to move on.</h1>
        <button on:click|once={nextQuestion}>Start learn mode</button>
    </div>
    {:else if question_type==="won"}
    <div class="aceit-win-screen">
        <h1>You have completed the learn mode.</h1>
        <a href="https://apps.team1676.com/aceit/learn">
            <button>Learn Again</button>
        </a>
    </div>
    {/if}
    <Footer />
</main>

<style>
    /* Set default font and colors */
    main {
        font-family: Arial, sans-serif;
        color: #333;
        background: var(--aceit-secondary) !important;
    }

    /* Style multiple choice question */
    .multiple-choice-question {
        /* padding: 20px; */
        background-color: var(--aceit-secondary);
        /* border: 1px solid #ddd; */
        border-radius: 5px;
        font-size: 24px;
        padding: 50px 175px 50px 175px;
        text-align: center;
    }

    .multiple-choice-question h1 {
        font-size: 48px;
        margin-bottom: -48px;
    }

    .multiple-choice-question h3 {
        /* font-size: 48px; */
        margin-bottom: -48px;
    }

    .multiple-choice-question button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-bottom: -20px;
        font-size: 24px;
        background-color: var(--aceit-primary);
        border: none;
        border-radius: 5px;
        text-align: center;
        height: 80px;
        transition: background-color 150ms;
    }

    .multiple-choice-question button:hover {
        background-color: var(--aceit-bs-primary);
    }

    /* Style written question */
    .written-question {
        padding: 50px 250px 50px 250px;
        background-color: var(--aceit-secondary);
        /* border: 1px solid #ddd; */
        border-radius: 5px;
        text-align: center;
        font-size: 32px;
    }

    .written-question h1 {
        font-size: 48px;
        margin-bottom: 10px;
    }

    .written-question h3 {
        /* font-size: 48px; */
        margin-bottom: 10px;
    }

    .written-question input[type="text"] {
        display: block;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        background-color: var(--aceit-bs-gray);
        border: none;
        border-radius: 5px;
    }

    .written-question button {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background-color: var(--aceit-primary);
        border: none;
        border-radius: 5px;
        text-align: center;
        transition: background-color 150ms;
        margin-bottom: 360px;
    }

    .written-question button:hover {
        background-color: var(--aceit-bs-primary);
    }

    /* Style true or false question */
    .true-false-question {
        padding: 50px 250px 50px 250px;
        background-color: var(--aceit-secondary);
        /* border: 1px solid #ddd; */
        font-size: 24px;
        border-radius: 5px;
        text-align: center;
    }

    .true-false-question h1 {
        font-size: 48px;
        margin-bottom: -50px;
    }

    .true-false-question h3 {
        /* font-size: 48px; */
        margin-bottom: -50px;
    }

    .true-false-question button {
        display: block;
        width: 100%;
        height: 26vh;
        padding: 10px;
        margin-bottom: -8px;
        font-size: 32px;
        background: var(--aceit-primary);
        border: none;
        border-radius: 5px;
        text-align: center;
        transition: background-color 150ms;
    }

    .true-false-question button:hover {
        background: var(--aceit-bs-primary);
    }

    /* win screen
    .win-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .win-screen button {
        font-size: 50px;
        padding: 20px 40px;
        margin-top: 50px;
        background-color: var(--aceit-primary);
        transition: background-color 150ms;
        border: none;
        border-radius: 5px;
    }

    .win-screen button:hover {
        background-color: var(--aceit-bs-primary);
    } */

</style>


<!--
    TODO


    not imperative to gameplay:
        maybe make string similarity accuracy change on string size

        clear inputbox between questions (may not work due to svelte removing the element inbewteen)


    show actual answer when typing
    show mastery level
    put "correct" and "wrong" elsewhere
 -->