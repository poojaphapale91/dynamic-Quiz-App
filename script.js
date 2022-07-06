

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
        <div class="header">
        <div id="catgryName"><strong>Category:</strong> ${category}</div>
        
          </div>     
        <form id="quiz">
        <label><strong> ${questions} </strong></label></br></br>
        <label><input type="radio" class="answer" name="testquiz" value="${answers[0]}">  ${answers[0]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${answers[1]}"> ${answers[1]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${answers[2]}"> ${answers[2]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${coranswers}"> ${coranswers} </label></br>

        </br>
        <div id="score"> </div>
     
        
</form>
        `);


    });
    let extract = queAnsHtmlString[qCount];
    //console.log(extract);
    //console.log(jsn);
    innerDiv.innerHTML = extract;
  }

  generateQuiz();






  let score = 0;
  let nextQue = document.getElementById('nextQue');
  let submit = document.getElementById("submit");
  submit.addEventListener('click', () => {


    if (qCount <= queAns.length) {
      nextQue.style.display = "none";
      let showScore = document.getElementById("score");
      showScore.innerHTML = `Score:  ${score} / ${qCount}`;
      console.log("Final Score is: " + score);
      submit.innerHTML = "Submit";
    }
  })

  nextQue.addEventListener('click', () => {
    let ansd = document.querySelector("input[type='radio'][name=testquiz]:checked").value;
    // console.log(ansd);
    let correctAnsStore = queAns[qCount].correctAnswer;
    if (ansd == correctAnsStore) {
      score++;
      console.log("Score is: " + score);

    }
    qCount++;
    if (qCount < queAns.length) {
      generateQuiz();
    }
    else {
      nextQue.style.display = "none";
      submit.style.display = "block";
    }
  })

}
loadQuiz();





