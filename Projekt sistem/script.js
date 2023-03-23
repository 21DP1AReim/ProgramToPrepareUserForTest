submit = document.querySelector("#startTestBtn")
submit.addEventListener("click",funct)

function funct(){
    if(document.querySelector("#sports").checked){
        console.log("Hey")

    }else{
        console.log(":)")
    }
    
}

function startTest(){

    let checkboxes = document.querySelectorAll('input[name="Test"]:checked'); 
    if (checkboxes.length === 0){
        alert("Lūdzu izvēlaties vismaz vienu tēmu!");
        return;
    } 

    document.getElementById("checkboxes").style.display = "none";
    document.getElementById("startTestBtn").style.display ="none";
    document.getElementById("topBit").style.display="none";
    document.getElementById("radio").style.display="none";

}




