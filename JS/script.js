'use strict';

//Getting DOM Elements
const billElement = document.querySelector('.bill');
const defaultTips = document.querySelectorAll('.default-tip');
const customTip = document.querySelector('.custom-btn');
const numOfPeople = document.querySelector('.numofpeopleinput');
const tipPerPersonEl = document.querySelector('.tip-per-person');
const totalPerPersonEl = document.querySelector('.total-per-person');
const resetButton = document.querySelector('.reset');
const errorMessage = document.querySelector('#error');

// State Variables
let tipPercentage = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

//function to reset default tip button background color
const resetBtnBg = function(){
  for (let btn of defaultTips){
    if (btn.classList.contains('btn-active-bg')){
      btn.classList.remove('btn-active-bg');
      }
    }
}
// Setting Initial text content of the below Elements to 0
tipPerPersonEl.textContent = Number(tipPerPerson).toFixed(2);
totalPerPersonEl.textContent = Number(tipPerPerson).toFixed(2);

//Adding Event Listeners to the default tip percentage buttons
for (let tipBtn of defaultTips){
  tipBtn.addEventListener('click', function(){
    tipPercentage = tipBtn.textContent.slice(0, tipBtn.textContent.length - 1);
    tipPercentage = Number(tipPercentage);
    
    resetBtnBg();
    this.classList.add('btn-active-bg');
  });
}

//Adding Event Listeners to set the tip percentage to the custom value if the user inputs one
customTip.addEventListener('input', function(){
  resetBtnBg();
  tipPercentage = Number(customTip.value);
});

//Event Listener to calculate tip per person and total per person when the user inputs the number of persons
numOfPeople.addEventListener('input', function(){
  if (!Number(numOfPeople.value) <= 0){
    let bill = billElement.value;
    let tip = (bill / 100) * tipPercentage;
    
    tipPerPerson = tip / Number(numOfPeople.value);
    totalPerPerson = (bill / Number(numOfPeople.value)) + tipPerPerson;
    
    tipPerPersonEl.textContent = tipPerPerson.toFixed(2);
    totalPerPersonEl.textContent = totalPerPerson.toFixed(2); 
    
  } else{
    //displays error message if the number of persons entered by the user is less than 1
    errorMessage.style.display = 'inline';
    numOfPeople.style.outlineColor = 'red';
    setTimeout(function() {
      errorMessage.style.display = 'none';
      numOfPeople.style.outlineColor = 'initial';
    }, 2000);
  }
});

//Event Listener for resetting all fields
resetButton.addEventListener('click', function(){
  billElement.value = "";
  customTip.value = "";
  numOfPeople.value = "";
  resetBtnBg();
  tipPerPerson = 0;
  totalPerPerson = 0;
  tipPerPersonEl.textContent = tipPerPerson.toFixed(2);
  totalPerPersonEl.textContent = totalPerPerson.toFixed(2);
});