img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('computer.jpg');
}

function setup() {
    canvas = createCanvas(640, 350);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);

    objects = results;

  }

function draw() {
    image(img, 0, 50, 640, 350);

    if(status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("number").innerHTML = "There is 1 object detected by Coco SSD model";
        }
    }

}