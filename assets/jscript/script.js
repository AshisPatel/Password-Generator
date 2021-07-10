// Assignment code here

// Arrays that hold the characters that can make up the password


var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z'];
var upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// Establish variable to countdown the amount of characters are still needed to add to the password
var passwordLength = 0;
// Create a check to verify that the created password meets the user-specified criteria 

// Confirm which characters the user would like in their password

var userPrompts = function () {

  var lowerConfirm = window.confirm("Would you like to include lowercase letters in your password?");
  var upperConfirm = window.confirm("Would you like to include uppercase letters in your password?");
  var numberConfirm = window.confirm("Would you like to include numbers in your password?");
  var specialConfirm = window.confirm("Would you like to include special characters in your password?");

  // Verify that the user selects at least one type of character , else loop back to prompts
  if (!lowerConfirm && !upperConfirm && !numberConfirm && !specialConfirm) {
    window.alert("Please select at least one character type!");
    return
  }
// Prompt user for password length, must be between 8 and 128 characters 

var lengthCheck = true; //Will this while loop structure work? , replace with general variable for all checks called "check?"

while (lengthCheck) {
  var passwordLength = window.prompt("How long would you like your password to be?")
  passwordLength = parseInt(passwordLength);
  // Check to see if user input is a valid integer 

  if (!Number.isInteger(passwordLength)) {
    window.alert("Please enter a whole number between 8 and 128 for the length of the password.");
  }

  // Make sure user input is within the appropriate bounds 

  else if (passwordLength < 8 || passwordLength > 128) {
    window.alert("Please enter a whole number between 8 and 128 for the length of the password.");
  }

  else {
    break;
  }

}

var userAnswers = {
  lowerConfirm,
  upperConfirm,
  numberConfirm,
  specialConfirm,
  passwordLength
};
console.log(userAnswers);
return userAnswers;

}
// roll a 4-sided die, each side relating to the type of criteria 1 -> Lower, 2 -> Upper , 3 -> Number 4 -> Special if the criteria is selected & true, 
// pick a random character from that array to add to the password
// loop until length of password is equal to the desired user input

function randomDraw(array) {
  var roll = Math.floor(Math.random() * array.length);
  return array[roll];
}


var generatePassword = function () {
  //reset all variables for generatePassword function 

  var answers = userPrompts();
  var password = [];
  var characters = [];
  var needed = [];

  if (answers.lowerConfirm) {
    characters = characters.concat(lowerCaseLetters);
    needed.push(randomDraw(lowerCaseLetters));
  }

  if (answers.upperConfirm) {
    characters = characters.concat(upperCaseLetters);
    needed.push(randomDraw(upperCaseLetters));
  }


  if (answers.numberConfirm) {
    characters = characters.concat(numbers);
    needed.push(randomDraw(numbers));
  }

  if (answers.specialConfirm) {
    characters = characters.concat(special);
    needed.push(randomDraw(special));
  }

  for (let index = 0; index < answers.passwordLength; index++) {
    password.push(randomDraw(characters));
    console.log(password);
  }

  for (let index = 0; index < needed.length; index++) {
    password[index] = needed[index];
  }

  console.log(characters);
  console.log(needed);
  console.log(password);
  return password.join("");
}




// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.textContent = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
