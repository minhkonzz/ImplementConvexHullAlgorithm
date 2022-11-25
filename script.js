/* Get DOMElements */
const addPointBtn = document.getElementById("add-point-btn"); 
const pointsContainer = document.querySelector(".points-container"); 
const XInput = document.getElementById("x-inp"); 
const YInput = document.getElementById("y-inp"); 

/* Initialize custom variables */
let points = []; 


addPointBtn.addEventListener("click", function() {
  const XValue = XInput.value; 
  const YValue = YInput.value; 
  console.log(XValue, YValue); 
});