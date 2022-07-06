

async function loadQuiz() {
    let res = await fetch('https://the-trivia-api.com/api/questions?categories=general_knowledge,history,science,sport_and_leisure&limit=5&region=IN&difficulty=easy');
    console.log(res);
    let jsn = await res.json();
    console.log(jsn);

 
    let innerDiv = document.querySelector('.inner-div');
   
    function generateQuiz() {

        const generateQueAns = jsn.map(({ question, incorrectAnswers, correctAnswer, category }) => {
            let questionlist=question;
            console.log(questionlist);
            
            return (
                `
        <div id=catgryName>Category: ${category}</div></br></br>
               
        <form id="quiz">
        <label> ${question}</label></br></br>
        <label><input type="radio" class="answer" name="testquiz" value="${incorrectAnswers[0]}" >  ${incorrectAnswers[0]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${incorrectAnswers[1]}"> ${incorrectAnswers[1]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${incorrectAnswers[2]}"> ${incorrectAnswers[2]} </label></br>
        <label><input type="radio" class="answer" name="testquiz" value="${correctAnswer}"> ${correctAnswer} </label></br>

        </br></br>
        <div id="submit> <button> Submit </button> </div>
        
</form>
        `);
            
    
        });

        let quizdiv = generateQueAns.join("");
        innerDiv.innerHTML = quizdiv;

        let submit = document.getElementById("submit");
        let answers = document.querySelectorAll('.answer');
        let score=0;
        let answer;
        
            jsn.map(({ correctAnswer }) => {
                let finalRes = correctAnswer;
                //console.log(finalRes);
submit.addEventListener('click',() =>{
    let checkedAnswer = ()=>{
    answers.forEach((curAns)=>{
        if(curAns.checked){
            answer=curAns.value;
            //console.log(answer);
        }
    })
}
checkedAnswer();
let scores = document.getElementById("score");
if(answer==finalRes){
    //console.log("correct answer");
    score++;
    console.log(score);
    scores.innerHTML="You have scored: " + score;
}
})
        });


    

}

generateQuiz();
}
loadQuiz();
