// Assignment code here

// Arrays that hold the characters that can make up the password
 

numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9']; 
special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z']; 

// Confirm which characters the user would like in their password

var characterCheck = true; 
while (characterCheck) {
  var lowerConfirm = window.confirm("Would you like to include lowercase letters in your password?");
  var upperConfirm = window.confirm("Would you like to include uppercase letters in your password?");
  var numberConfirm = window.confirm("Would you like to include numbers in your password?");
  var specialConfirm = window.confirm("Would you like to include special characters in your password?"); 

  // Verify that the user selects at least one type of character , else loop back to prompts
  if( lowerConfirm || upperConfirm || numberConfirm || specialConfirm ) {
    break; 
  }

  else {
    window.alert("You must have atleast one type of character in your password!"); 
  }
}

// Prompt user for password length, must be between 8 and 128 characters 

var lengthCheck = true; //Will this while loop structure work? , replace with general variable for all checks called "check?"

while (lengthCheck) {
  var passwordLength = window.prompt("How long would you like your password to be?")
  passwordLength = parseInt(passwordLength); 
  // Check to see if user input is a valid integer 

  if (!Number.isInteger(passwordLength)){
    window.alert("Please enter a whole number between 8 and 128 for the length of the password.");
  }

  // Make sure user input is within the appropriate bounds 

  else if(passwordLength < 8 || passwordLength > 128) {
    window.alert("Please enter a whole number between 8 and 128 for the length of the password.");
  }

  else {
    break; 
  }

}

// roll a 4-sided die, each side relating to the type of criteria 1 -> Lower, 2 -> Upper , 3 -> Number 4 -> Special if the criteria is selected & true, 
// pick a random character from that array to add to the password
// loop until length of password is equal to the desired user input
var password = ""; 
// Establish variable to countdown the amount of characters are still needed to add to the password
var passwordLengthCheck = passwordLength; 

// Create a check to verify that the created password meets the user-specified criteria 
var lowerCheck = false;
var upperCheck = false;
var numberCheck = false;
var specialCheck = false; 

var generatePassword = function() {
  //reset all variables for generatePassword function 
  password = ""; 
  passwordLengthCheck = passwordLength;  
  lowerCheck = false;
  upperCheck = false;
  numberCheck = false;
  specialCheck = false; 

  while ( passwordLengthCheck > 0) {
    var roll= Math.floor(Math.random()*4) + 1; 

    if (roll === 1 && lowerConfirm) {
      randChar = letters[Math.floor(Math.random()*letters.length)];
      password = password + randChar;
      lowerCheck = true; 
      passwordLengthCheck--; 

    }

    else if (roll === 2 && upperConfirm) {
      randChar = letters[Math.floor(Math.random()*letters.length)].toUpperCase();
      password = password + randChar;
      upperCheck = true; 
      passwordLengthCheck--;  
    }

    else if (roll === 3 && numberConfirm) {
      randChar = numbers[Math.floor(Math.random()*numbers.length)]; 
      password = password + randChar;
      numberCheck = true; 
      passwordLengthCheck--;  
    }

    else if (roll === 4 && specialConfirm) {
      randChar = special[Math.floor(Math.random()*special.length)];
      password = password + randChar;
      specialCheck = true; 
      passwordLengthCheck--;   
    }
  }
}

// Determine the number of criteria numerically, and then add up the check to verify that
// all of the criteria has been met

var check = false; 

var testPassword = function(check) {
  generatePassword();
  var numCriteria = 0; 
  var validateCriteria = 0; 
  
  if (lowerConfirm) {
    numCriteria++; 
  }

  if (upperConfirm) {
    numCriteria++;
  }

  if (numberConfirm) {
    numCriteria++;
  }

  if (specialConfirm) {
     numCriteria++; 
  }

  if (lowerConfirm && lowerCheck) {
    validateCriteria++;
  }

  if (upperConfirm && upperCheck) {
    validateCriteria++;
  }

  if (numberConfirm && numberCheck) {
    validateCriteria++;
  }

  if (specialConfirm && specialCheck) {
    validateCriteria++; 
  }
  console.log(specialCheck); 
  console.log(validateCriteria + " " + numCriteria); 

  if (validateCriteria === numCriteria) {
    window.alert("This password meets the criteria!\n" + password);
    check = true;
    return check;  
  }

  else {
    window.alert("This password did not meet the criteria!\n" + password);
    check = false;
    return check; 
  }
}

test = true;
while (test) {
  var breakLoop = testPassword(); 
  if (breakLoop)
  {
    break; 
  }
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
