var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;
statuses = "";
item = "";
objects = [];
function speak(){
    synth = window.speechSynthesis; 
    speak_data = item + " found";
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function start(){
    document.getElementById("status").innerHTML = "Status :  detecting objects...";
    objdetector = ml5.objectDetector("cocossd", modelloaded);
    item = document.getElementById("objectishere").value;
}
function modelloaded(){
    console.log("model loaded");
    statuses = true;
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(405, 250);
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if(statuses != ""){
        objdetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status :  Object detected!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == item) {
                speak();
                document.getElementById("detectedornot").innerHTML = item + " found";
            } else {
                document.getElementById("detectedornot").innerHTML = item + " not found";
            }
        }
    }
}
function gotResults(error, results) {
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}