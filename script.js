/* Get DOMElements */
const addPointBtn = document.getElementById("add-point-btn"); 
const pointsContainer = document.querySelector(".points-container"); 
const XInput = document.getElementById("x-inp"); 
const YInput = document.getElementById("y-inp"); 
const pointsViewer = document.querySelector("main"); 
const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");

function draw_line_between_2_points(startPoint, endPoint) {

  const X_StartPoint = Number(startPoint.style.left.slice(0, startPoint.style.left.length - 2));
  const Y_StartPoint = Number(startPoint.style.top.slice(0, startPoint.style.top.length - 2));
  const X_EndPoint = Number(endPoint.style.left.slice(0, endPoint.style.left.length - 2));
  const Y_EndPoint = Number(endPoint.style.top.slice(0, endPoint.style.top.length - 2));

  let startXOfLine = 0; 
  let startYOfLine = 0; 

  const newLine = document.createElement("span"); 
  newLine.setAttribute("class", "line"); 

  const c01 = X_StartPoint === X_EndPoint && Y_StartPoint > Y_EndPoint;
  const c02 = X_StartPoint === X_EndPoint && Y_StartPoint < Y_EndPoint;
  const c03 = Y_StartPoint === Y_EndPoint && X_StartPoint < X_EndPoint; 
  const c04 = Y_StartPoint === Y_EndPoint && X_StartPoint > X_EndPoint;

  if (c01 || c02) {
    startXOfLine = (c01 ? X_EndPoint : X_StartPoint) + 10; 
    startYOfLine = (c01 ? Y_EndPoint : Y_StartPoint) + 10;
    newLine.style.setProperty("left", `${startXOfLine}px`); 
    newLine.style.setProperty("top", `${startYOfLine}px`); 
    newLine.style.setProperty("width", "2px");
    newLine.style.setProperty("height", `${c01 ? Y_StartPoint - Y_EndPoint : Y_EndPoint - Y_StartPoint}px`)
    pointsViewer.appendChild(newLine);
    return; 
  }

  if (c03 || c04) {
    startXOfLine = (c04 ? X_EndPoint : X_StartPoint) + 10; 
    startYOfLine = (c04 ? Y_EndPoint : Y_StartPoint) + 10;
    newLine.style.setProperty("left", `${startXOfLine}px`); 
    newLine.style.setProperty("top", `${startYOfLine}px`); 
    newLine.style.setProperty("width", `${c04 ? X_StartPoint - X_EndPoint : X_EndPoint - X_StartPoint}px`);
    newLine.style.setProperty("height", "2px");
    pointsViewer.appendChild(newLine);
    return; 
  }

  startXOfLine = X_StartPoint + 10; 
  startYOfLine = Y_StartPoint + 10;
  newLine.style.setProperty("left", `${startXOfLine}px`);
  newLine.style.setProperty("top", `${startYOfLine}px`);
  newLine.style.setProperty("height", "2px");
  pointsViewer.appendChild(newLine);

  const c1 = Y_StartPoint > Y_EndPoint && X_StartPoint < X_EndPoint; 
  const c2 = Y_StartPoint < Y_EndPoint && X_StartPoint > X_EndPoint;
  const c3 = Y_StartPoint > Y_EndPoint && X_StartPoint > X_EndPoint;

  const { left: XOfLineBeforeRotate, top: YOfLineBeforeRotate } = newLine.getBoundingClientRect(); 

  const distanceHorizontal = Math.abs(X_StartPoint - X_EndPoint); 
  const distanceVertical = Math.abs(Y_StartPoint - Y_EndPoint);

  const huyen = Math.sqrt(Math.pow(distanceVertical, 2) + Math.pow(distanceHorizontal, 2));
  newLine.style.setProperty("width", `${huyen}px`);

  const sine_of_angle = distanceVertical / huyen; 
  let angle_rotate = Math.asin(sine_of_angle) / (Math.PI / 180);
  if (c1) angle_rotate = -angle_rotate;
  else if (c2) angle_rotate = angle_rotate + (180 - (angle_rotate * 2)); 
  else if (c3) angle_rotate = -(angle_rotate + (180 - (angle_rotate * 2)));
  newLine.style.setProperty("transform", `rotate(${Math.round(angle_rotate)}deg)`);

  const { left: XOfLineAfterRotate, top: YOfLineAfterRotate } = newLine.getBoundingClientRect();

  const translateX = -(XOfLineAfterRotate - XOfLineBeforeRotate + (c2 || c3 ? Math.abs(X_StartPoint - X_EndPoint) : 0));
  const translateY = c1 || c3 ? (YOfLineAfterRotate - YOfLineBeforeRotate) : YOfLineBeforeRotate - YOfLineAfterRotate;
  newLine.style.setProperty("transform", `translate(${translateX}px, ${translateY}px) rotate(${Math.round(angle_rotate)}deg)`);
}


draw_line_between_2_points(point1, point2);

/* Cac bien tu khoi tao */
let points = []; 

addPointBtn.addEventListener("click", function() {
  const XValue = Number(XInput.value); 
  const YValue = Number(YInput.value); 
  addNewPoint(XValue, YValue); 
});

function showPoints(points) {
  pointsContainer.innerHTML = ""; 
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i]; 
    const pointElement = document.createElement("span"); 
    pointElement.innerHTML = `${i+1}. (${x}, ${y})`;
    pointsContainer.appendChild(pointElement); 
  }
}

function addNewPoint(XValue, YValue) {
  const circlePoint = document.createElement("span"); 
  circlePoint.style.setProperty("top", `${YValue}px`); 
  circlePoint.style.setProperty("left", `${XValue}px`); 
  circlePoint.innerHTML = points.length + 1; 
  pointsViewer.appendChild(circlePoint); 
  points = [ ...points, { x: XValue, y: YValue } ]; 
  showPoints(points); 
  XInput.value = ""; 
  YInput.value = "";
}