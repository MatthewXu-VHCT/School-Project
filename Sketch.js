let serial;
let latestData = "waiting for data";
let x, y;
let heartRate = 60;
let calo = 0;
let frame_1, frame_2, frame_3, status, pad, heart, leg, calory, wrong, result;
let situpReps = 0;
let screen = 0;

let timer = 1;
let a = 0;
let b = 0;
let c = 0;
let confirm = 0;


//references from https://editor.p5js.org/ehersh/sketches/Hk52gNXR7

function setup() {
    //    frameRate(30);

    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();
    serial.list();
    serial.open("/dev/tty.usbmodem141401");
    serial.on('connected', serverConnected);
    serial.on('list', gotList);
    serial.on('data', gotData);
    serial.on('error', gotError);
    serial.on('open', gotOpen);
    serial.on('close', gotClose);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);

    myRec = new p5.SpeechRec();
    myRec.continous = true;
    myRec.interimResults = true;
    myRec.onResult = parseResult;
    myRec.start();

    legStay = loadImage("avatar/leg.svg");
    frame_1 = loadImage("avatar/one_1.svg");
    frame_2 = loadImage("avatar/two_1.svg");
    frame_3 = loadImage("avatar/three.svg");
    pad = loadImage("avatar/yoga_pad.svg");
    status = loadImage("avatar/status.svg");
    heart = loadImage("avatar/heart.svg");
    calory = loadImage("avatar/1180285-200.png");
    wrong = loadImage("avatar/wrong.svg")

    textFont('Futura');
}

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");
    // theList is an array of their names
    for (let i = 0; i < thelist.length; i++) {
        // Display in the console
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
    // read the incoming string
    trim(currentString);
    if (!currentString) return;
    latestData = currentString;
    // save it for the draw method
}

function gotRawData(thedata) {
    print("gotRawData" + thedata);
}

function draw() {
    let padBack, sit_up_1, sit_up_2, sit_up_3, sit_wrong;
    //    let count = 5;
    background(255, 255, 255);

    text(latestData, width / 2, 50);
    fill(0, 0, 0);
    noStroke();
    textSize(16);
    noFill();

    text("Sit Up", width / 2, 50);


    //frame count
    //Reference from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
    if (frameCount % 60 == 0 && timer > 0 && latestData <= 100) {
        //    if (frameCount % 60 == 0 && timer > 0 && latestData <= 100) {
        timer--;
    } else if (timer == 0) {
        timer = 1;
    }
    //Reference from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-


    fill(0, 0, 0);
    textSize(14);
    //timer and confirm
    //    text("timer " + timer, width / 2, 10);
    //    text("confirm " + confirm, width / 2, 30)

    //    if (latestData < 100 && frameCount % 60 == 15) {
    if (latestData <= 100 && timer == 1) {
        situpReps += 1;
    }
    result = (situpReps) / 60;

    textSize(26);
    fill(0, 0, 0);
    //    text(situpReps + " Reps", width / 2 - 16, 220);
    text(int(result) + " Reps", width / 2 - 16, 220);

    stroke(0, 0, 0);
    noFill();
    rect(width * 0.1, height * 0.15, width * 0.8, height * 0.7);
    rect(width * 0.1, height * 0.15, width * 0.8, height * 0.04);

    //action
    textSize(14);
    padBack = image(pad, width / 4, height / 2, 661, 92);


    if (latestData > 480) {
        sit_wrong = image(wrong, width / 2.65, height / 2.18, 200, 121);
        noStroke();
        fill(255, 88, 80);
        ellipse(width / 2, 600, 30, 30);
    } else if (latestData > 360) {
        sit_up_1 = image(frame_1, width / 2.65, height / 2.18, 200, 121);
        noStroke();
        fill(170, 170, 170);
        ellipse(width / 2, 600, 30, 30);
    } else if (latestData > 200) {
        sit_up_2 = image(frame_2, width / 2.55, height / 2.76);
        noStroke();
        fill(255, 238, 85);
        ellipse(width / 2, 600, 30, 30);
    } else {
        sit_up_3 = image(frame_3, width / 2.39, height / 3, 160, 172);
        noStroke();
        fill(99, 255, 77);
        ellipse(width / 2, 600, 30, 30);
    }
    legs = image(legStay, width / 1.95, height / 2.7);


    if (latestData < 400) {
        confirm += 3;
        if (latestData < 200) {
            confirm += 3;
            if (latestData < 100) {
                confirm += 4;
            }
        }
    }


    //Health status
    stroke(0, 0, 0);
    fill(118, 226, 226);
    rect(width * 0.05, height * 0.07, width * 0.32, height * 0.155);
    fill(255, 255, 255);
    rect(width * 0.05, height * 0.07, width * 0.32, height * 0.04);

    stroke(255, 255, 255);
    fill(0, 0, 0);

    textSize(14);
    text('Weight Status', width * 0.06, 75);
    let HealthBar = image(status, width * 0.32, height * 0.085, 56, 10);

    fill(0, 0, 0);
    stroke(0, 0, 0);
    strokeWeight(1);
    textSize(18);
    text('Emelia Ford', width * 0.06, 120);

    //full weight bar
    fill(255, 255, 255);
    noStroke();
    rect(width * 0.06, 138, width * 0.3, 20);

    //cut weight bar
    fill(63, 198, 198);

    x = int(result) * 2;
    //    rect(width * 0.36 - x, 138, x, 20);
    rect(width * 0.06, 138, x, 20);


    //Cardio
    stroke(0, 0, 0);
    fill(118, 226, 226);
    rect(width * 0.75, height * 0.07, width * 0.20, height * 0.3);
    fill(255, 255, 255);
    rect(width * 0.75, height * 0.07, width * 0.2, height * 0.04);
    noStroke();
    fill(0, 0, 0);
    textSize(14);
    text('Cardio', width * 0.76, 75);
    let CardioBar = image(status, width * 0.899, height * 0.085, 56, 10);

    let heartbeat = image(heart, width * 0.76, height * 0.16, 71, 49);
    textSize(14);
    text('Heart Rate', width * 0.82, height * 0.16);

    textSize(28);


    if (latestData <= 100 && timer == 1) {
        heartRate = heartRate + x / 6000;
    }
    text(int(heartRate) + " bpm", width * 0.85, height * 0.21);


    let calories = image(calory, width * 0.76, height * 0.265, 50, 50);
    textSize(14);
    text("Calories burned", width * 0.8, height * 0.305);

    if (latestData < 100 && timer == 1) {
        calo += x / 6000;
    }
    textSize(28);
    text(int(calo), width * 0.905, height * 0.31);


    //Device
    fill(118, 226, 226);
    stroke(0, 0, 0);
    rect(width * 0.05, height * 0.7, width * 0.27, height * 0.2);

    fill(255, 255, 255);
    rect(width * 0.05, height * 0.7, width * 0.27, height * 0.04);
    noStroke();
    fill(0, 0, 0);
    textSize(14);
    text('Device', width * 0.06, height * 0.725);
    let DeviceBar = image(status, width * 0.27, height * 0.715, 56, 10);

    text("Smart Pack", width * 0.15, height * 0.8);
    textSize(26);
    if (latestData >= 0) {
        text("Connected", width * 0.13, height * 0.85);
    } else {
        text("Disconnected", width * 0.13, height * 0.85)
    }


    //Equipment
    fill(118, 226, 226);
    stroke(0, 0, 0);
    rect(width * 0.68, height * 0.7, width * 0.27, height * 0.2);
    fill(255, 255, 255);
    rect(width * 0.68, height * 0.7, width * 0.27, height * 0.04);

    textSize(14);
    fill(0, 0, 0);
    noStroke();
    text("Equipment", width * 0.695, height * 0.725);

    let EquipBar = image(status, width * 0.895, height * 0.715, 56, 10);
    textSize(26);
    text("None", width * 0.79, height * 0.83);

}


function parseResult() {
    // recognition system will often append words into phrases.
    var mostrecentword = myRec.resultString.split(' ').pop();

    if (mostrecentword.indexOf("left") !== -1) {
        serial.write('H');
        LEFTFra = 0.9;
        LeftPlus = 160;
        RightFra = 0;
        RightPlus = 0;
        //rightAngle = latestData * 0.9;
    } else if (mostrecentword.indexOf("right") !== -1) {
        serial.write('L');
        //leftAngle = -latestData * 0.9;
        LEFTFra = 0;
        RightFra = 0.9;
        LeftPlus = 0;
        RightPlus = -160;
    } else if (mostrecentword.indexOf("both") !== -1) {
        serial.write('H');
        //LEFTFra = 160;
        //RightFra = -160;
        LEFTFra = 0.9;
        RightFra = 0.9;
        LeftPlus = 160;
        RightPlus = -160;
    };
    //    console.log("myRec.resultString" + myRec.resultString);

    if (myRec.resultValue == true) {
        fill(255, 255, 255);
        text(myRec.resultString, width / 2, height / 2);
    }
}
