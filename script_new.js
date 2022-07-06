

async function loadQuiz() {
    let res = await fetch('https://the-trivia-api.com/api/questions?categories=general_knowledge,history,science,sport_and_leisure&limit=10&region=IN&difficulty=easy');
    console.log(res);
    let queAns = await res.json();
    console.log(queAns);


    let innerDiv = document.querySelector('.inner-div');
    let qCount = 0;
    function generateQuiz() {

        let queAnsHtmlString = queAns.map(({ question, incorrectAnswers, correctAnswer, category }) => {
            let questionlist = queAns[qCount];
            //console.log(questionlist);
            //let newquestionlist=questionlist.slice(0);
            let questions = questionlist.question;
            let answers = questionlist.incorrectAnswers;
            let coranswers = questionlist.correctAnswer;
            //console.log(newquestionlist);
            // console.log(answers);
            // console.log(coranswers);

            return (
                `
          <div id=catgryName>Category: ${category}</div></br></br>
                 
          <form id="quiz">
          <label> ${questions}</label></br></br>
          <label><input type="radio" class="answer" name="testquiz" value="${answers[0]}" >  ${answers[0]} </label></br>
          <label><input type="radio" class="answer" name="testquiz" value="${answers[1]}"> ${answers[1]} </label></br>
          <label><input type="radio" class="answer" name="testquiz" value="${answers[2]}"> ${answers[2]} </label></br>
          <label><input type="radio" class="answer" name="testquiz" value="${coranswers}"> ${coranswers} </label></br>
  
          </br></br>
          <div id="submit> <button> Submit </button> </div>
          
  </form>
          `);


        });
        let extract = queAnsHtmlString[qCount];
        //console.log(extract);
        //console.log(jsn);
        innerDiv.innerHTML = extract;

        let submit = document.getElementById("submit");
        let answers = document.querySelectorAll('.answer');
        let score = 0;
        let answer;
        queAns.map(({ correctAnswer }) => {
            let finalRes = correctAnswer;
            //console.log(finalRes);
            submit.addEventListener('click', () => {
                let checkedAnswer = () => {
                    answers.forEach((curAns) => {
                        if (curAns.checked) {
                            answer = curAns.value;
                            //console.log(answer);
                        }
                    })

                }

                checkedAnswer();
                let scores = document.getElementById("score");
                if (answer == finalRes) {
                    //console.log("correct answer");
                    score++;
                    scores.innerHTML = "You have scored: " + score;
                    console.log("score is " + score);

                    console.log("Question count is " + qCount);
                }
                qCount++;

                if (qCount < queAns.length) {
                    //console.log(jsn.length);
                    generateQuiz();
                }
                else {

                    submit.innerHTML = "Play Again";
                }
            })
        });


    }


    generateQuiz();

}
loadQuiz();
