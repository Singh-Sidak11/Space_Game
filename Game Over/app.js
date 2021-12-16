const mode = localStorage.getItem("storage");
var text = document.getElementById('score');
const score = localStorage.getItem("storage1");
const result = localStorage.getItem("storage2");
if(result==='lost'){
    text.innerHTML = 'You Lost! Your Score is: ' + score;
}
else if(result==='won'){
    text.innerHTML = 'You Won! Your Score is: ' + score;
}
else{
    text.innerHTML = 'Try Again';
}

//function for redirecting the user to different levels

function redirect(){
    if(mode==='1'){
        document.getElementById("page").href="../Easy/easy.html"; 
    }
    else if(mode==='2'){
        document.getElementById("page").href="../Medium/medium.html"; 
    }
    else if(mode==='3'){
        document.getElementById("page").href="../Hard/hard.html"; 
    }
}