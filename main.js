image="";
status="";
objects=[];
song="";

function preload(){
   song = loadSound("alaram_digital.mp3");
}

function setup(){
    canvas = createCanvas(350,275);
    canvas.position(560,250);
    video = createCapture(VIDEO);
    video.hide();
    objectdectection = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Object(s)";
    document.getElementById("status2").innerHTML= "Baby Not Found";

}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){

    image(video,0,0,350,275);
    objectdectection.detect(video,gotResults);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML= "Status : Object(s) Detected";
        percent = floor(objects[i].confidence * 100);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y+15);
        if(objects[i].label == "person"){
            document.getElementById("status2").innerHTML= "Baby is found";
            song.play();
        }
        else{
            document.getElementById("status2").innerHTML= "Baby not found";
            song.stop
        }
        }
    }
}
