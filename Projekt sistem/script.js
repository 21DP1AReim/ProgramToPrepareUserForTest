
const question = document.getElementById('question');
// Izveido masīvu ar 4  elementiem, katrs atbilst uz vienu no 4 izvēles opcijām, kas ir testā
// Atsķirt izvēli vienu no otras izmantojot dataset, katrai izvēlei ir savs īpaš cipars pie 'number'
const choices = Array.from(document.getElementsByClassName('izveles-text'));
let questionCountPerTheme = 0
let currentQuestionIndex = 0
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
    document.getElementById("c1").style.display = "flex";
    document.getElementById("c2").style.display = "flex";
    document.getElementById("c3").style.display = "flex";
    document.getElementById("c4").style.display = "flex";
    document.getElementById("question").style.display = "inline";

    choices.forEach((choice) =>{
        choice.addEventListener('click', (event) =>{
            const selectedChoice = event.target;
            const selectedAnswer = selectedChoice.dataset['number']
            currentQuestionIndex++;
            nextQuestion();
        })
    })

    

};

function nextQuestion(){
    if(testQuestions.length == currentQuestionIndex){
        alert("Tests Beidzies!")
        return;
    }
    let currentQuestion = testQuestions[currentQuestionIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })

}

function previousQuestion(){};
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

