
const question = document.getElementById('question');
// Izveido masīvu ar 4  elementiem, katrs atbilst uz vienu no 4 izvēles opcijām, kas ir testā
// Atsķirt izvēli vienu no otras izmantojot dataset, katrai izvēlei ir savs īpaš cipars pie 'number'
const choices = Array.from(document.getElementsByClassName('izveles-text'));
let questionCountPerTheme = 0
let currentQuestionIndex = 0
let correctQuestionArray = []
let userAnswerArray = []
let selectedChoice = 0;

let selectedAnswer;
let correctAnswer;

let testQuestions = []
let arrLength = 0
let pvQuestions = [ // programmēšanas valodu jautājumi
{
    question: "Programmēšanas valodas jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Programmēšanas valodas jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}

]

let dbQuestions = [ // Datu bazu jautajumi 
{
    question: "Datu bāzu jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Datu bāzu jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]
let adtsQuestions = [ // alrogirtmu, datu tipu, struktūras jautājumi
{
    question: "Algoritmu datu tipi, struktūras jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Algoritmu datu tipi, struktūras jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]

let wppQuestions = [ //  WEB programmēšanas pamatu jautājumi
{
    question: "WEB  programmēšanas pamatu jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1   
},
{
    question: "WEB  programmēšanas pamatu jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "WEB  programmēšanas pamatu jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]

let osQuestions = [ // operētājsistēmu jautājumi
{
    question: "Operētājsistēmu jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Operētājsistēmu jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]

let btQuestions = [ // biroja tehnikas jautājumi
{
    question: "Biroja tehnikas jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Biroja tehnikas jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]

let vnapQuestions = [ // valsts normatīvo aktu prasību jautājumi
{
    question: "Valsts normatīvo aktu prasības jautājums 1",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 2",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 3",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 4",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 5",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 6",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 7",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 8",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 9",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
},
{
    question: "Valsts normatīvo aktu prasības jautājums 10",
    choice1: "Yes",
    choice2: "No",
    choice3: "Perhaps",
    choice4: "Perhaps not",
    answer: 1
}
]


function startTest(){
    
    let checkboxes = document.querySelectorAll('input[name="Test"]:checked'); 
    if (checkboxes.length === 0){
        alert("Lūdzu izvēlaties vismaz vienu tēmu!");
        return;
    } 
    let checkedBoxes = document.querySelectorAll('input[name="Test"]:checked');
    let values = [];
    checkedBoxes.forEach((checkbox) =>{
        values.push(checkbox.value)
    });
    
    if(document.getElementById("radio2").checked){
        questionCountPerTheme = 5
    }else if(document.getElementById("radio3").checked){
        questionCountPerTheme = 10
    }else{
        questionCountPerTheme = 3
    }
    

    values.includes("Programmēšanas valodas") ? addPVQuestions() : null;
    values.includes("Algoritmi, datu tipi, struktūras") ? addADTSQuestions() : null;
    values.includes("Datu bāzu tehnoloģijas") ? addDBQuestions() : null;
    values.includes("Web programmēsanas pamati") ? addWPPQuestions() : null;
    values.includes("Operētājsistēmas, operētājsistēmu uzbūves pamati") ? addOSQuestions() : null;
    values.includes("Biroja tehnika") ? addBTQuestions() : null;
    values.includes("Valsts normatīvo aktu prasības") ? addVNAPQuestions() : null;
    

    let currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })

    document.getElementById("checkboxes").style.display = "none";
    document.getElementById("startTestBtn").style.display ="none";
    document.getElementById("topBit").style.display="none";
    document.getElementById("startRadio").style.display="none";

    // Shows questions and choice answers
    document.getElementById("nxtQuestion").style.display = "inline";
    document.getElementById("prevQuestion").style.display = "inline";

    document.getElementById("c1").style.display = "flex";
    document.getElementById("c2").style.display = "flex";
    document.getElementById("c3").style.display = "flex";
    document.getElementById("c4").style.display = "flex";
    document.getElementById("question").style.display = "inline";

    choices.forEach((choice) =>{
        choice.addEventListener('click', (event) =>{
            
            selectedChoice = event.target;
            removeSelect()


            selectedChoice.classList.add("selected");
            console.log(selectedChoice)

            
            
            

        })
    })

    

};

function nextQuestion(){

    if(testQuestions.length-1 == currentQuestionIndex){
        selectedAnswer = selectedChoice.dataset['number']
        correctAnswer = testQuestions[currentQuestionIndex].answer;
    
        
        userAnswerArray[currentQuestionIndex] = selectedAnswer
        correctQuestionArray[currentQuestionIndex] = correctAnswer;

        console.log(userAnswerArray)
        console.log(correctQuestionArray)
    

        alert("Tests Beidzies!")
        return;
    }

    if(selectedChoice == "None" || selectedChoice == 0){
        alert("Please select a choice!")
        return;
    }
    if(userAnswerArray.length >= 0 ){ // WHY DOES THIS FIX EVERYTHING
        selectedChoice.classList.remove("selected")
    }
    


    
    




    
    
    selectedAnswer = selectedChoice.dataset['number']
    correctAnswer = testQuestions[currentQuestionIndex].answer;

    

    userAnswerArray[currentQuestionIndex] = selectedAnswer
    correctQuestionArray[currentQuestionIndex] = correctAnswer;


    currentQuestionIndex++;

    console.log(userAnswerArray)
    console.log(correctQuestionArray)





    
    let currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question

    if(userAnswerArray.length > currentQuestionIndex){
        // when user goes back to previous question and comes back to next question, the selected question doesn't show up
           document.querySelector(`[data-number="${userAnswerArray[currentQuestionIndex]}"]`).classList.add("selected")
        }

/* 
    if(userAnswerArray.length > currentQuestionIndex){

        
        if(currentQuestionIndex == 0){
            document.querySelector(`[data-number="${userAnswerArray[0]}"]`).classList.add("selected")
        }
        if(currentQuestionIndex == 1){
            document.querySelector(`[data-number="${userAnswerArray[1]}"]`).classList.add("selected")
        }
        if(currentQuestionIndex == 2){
            document.querySelector(`[data-number="${userAnswerArray[2]}"]`).classList.add("selected")
        }
        if(currentQuestionIndex == 3){
            document.querySelector(`[data-number="${userAnswerArray[3]}"]`).classList.add("selected")
        }
        if(currentQuestionIndex == 4){
            document.querySelector(`[data-number="${userAnswerArray[4]}"]`).classList.add("selected")
        }
    }
    */
    choices.forEach((choice) =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })
    selectedChoice = "None"
}

function previousQuestion(){
    if(currentQuestionIndex == 0){
        alert("Testa sākums")
        return;
    }


    currentQuestionIndex--;
    // document.querySelector('[data-number="%d"]', userAnswerArray[currentQuestionIndex]).classList.add("selected")
    removeSelect();
    document.querySelector(`[data-number="${userAnswerArray[currentQuestionIndex]}"]`).classList.add("selected")
    let currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question
    

    choices.forEach((choice) =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })
    

};
function finishTest(){};
function goHome(){};

function addPVQuestions(){
    arrLength = pvQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(pvQuestions[arr[i]])
    }
}
function addDBQuestions(){
    arrLength = dbQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(dbQuestions[arr[i]])
    }
}
function addADTSQuestions(){
    arrLength = adtsQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(adtsQuestions[arr[i]])
    }
}
function addWPPQuestions(){
    arrLength = wppQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(wppQuestions[arr[i]])
    }
}
function addOSQuestions(){
    arrLength = osQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(osQuestions[arr[i]])
    }
}
function addBTQuestions(){
    arrLength = btQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(btQuestions[arr[i]])
    }
}
function addVNAPQuestions(){
    arrLength = vnapQuestions.length;
    let arr = chooseTestQuestions(arrLength);
    for(let i = 0; i < questionCountPerTheme; i++){
        testQuestions.push(vnapQuestions[arr[i]])
    }
}

function chooseTestQuestions(arrayLength){
    let usedQuestions = [];
    let wantQuestionCount = 0;
    let randNum = 0;

    while(wantQuestionCount != questionCountPerTheme){
        randNum = Math.floor(Math.random() * arrayLength)
        if(usedQuestions.includes(randNum)){
            continue;
        }else{
            usedQuestions.push(randNum);
            wantQuestionCount++;

        }
        
    }
    return usedQuestions;
}

function removeSelect(){
    document.querySelector('[data-number="4"]').classList.remove("selected")
    document.querySelector('[data-number="3"]').classList.remove("selected")
    document.querySelector('[data-number="2"]').classList.remove("selected")
    document.querySelector('[data-number="1"]').classList.remove("selected")
};

