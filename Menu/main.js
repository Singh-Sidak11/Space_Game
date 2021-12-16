var audio=document.getElementById('aud');
var btn=document.getElementById('song');
var flag=0;
//function for playing bgm
function play(){
    if(flag==0)
    {
        flag=1;
        audio.play();
        btn.innerHTML='🔊';
    }
    else{
        flag=0;
        audio.pause();
        btn.innerHTML='🔈';
    }
}
