let socket = io(); 
let bgButton, circleButton;
let bgcolor;
let circles = []; 

function setup() {
  createCanvas(1200, 600);
  bgcolor = 'pink'; 

  //button to change background to a random color
  bgButton = createButton("Background");
  bgButton.position(50, 15);
  bgButton.mousePressed(randomColor);

  //button to create random circles
  circleButton = createButton("Circle");
  circleButton.position(150, 15);
  circleButton.mousePressed(createRandomCircle);

  socket.on('data', function(data) {
    if (data.type === "background") {
      bgcolor = data.color; 
    } else if (data.type === "circle") {
      circles.push(data); 
    }
  });
}

function draw() {
  background(bgcolor);

  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size);
  }
}

function randomColor() {
  bgcolor = [random(255), random(255), random(255)];
  socket.emit('data', { type: "background", color: bgcolor });
}

function createRandomCircle() {
  let circle = {
    type: "circle",
    x: random(width),      
    y: random(height),      
    size: random(10, 80),   
    color: [random(255), random(255), random(255)] 
  };
  socket.emit('data', circle);
  circles.push(circle);
}
