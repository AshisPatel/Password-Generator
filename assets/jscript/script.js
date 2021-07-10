// Assignment code here

// Create function to prompt user for the type of characters they would like to use
var userPrompts = function () {
  // Prompt user for criteria 
  var characterConfirm = true;
  while (characterConfirm) {
    var lowerConfirm = window.confirm("Would you like to include lowercase letters in your password?");
    var upperConfirm = window.confirm("Would you like to include uppercase letters in your password?");
    var numberConfirm = window.confirm("Would you like to include numbers in your password?");
    var specialConfirm = window.confirm("Would you like to include special characters in your password?");

    // Verify that the user selects at least one type of character , else loop back to prompts
    if (lowerConfirm || upperConfirm || numberConfirm || specialConfirm) {
      break;
    }

    else {
      window.alert("You must select at least one character type! Please answer the prompts again.");
    }
  }
  // Prompt user for password length, must be between 8 and 128 characters 

  var lengthCheck = true;
  while (lengthCheck) {
    var passwordLength = window.prompt("How long would you like your password to be?");
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
  // Return prompt answers as an object to be used in the password generation 
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
// Function to select a element from an array 
function randomRoll(array) {
  var roll = Math.floor(Math.random() * array.length);
  return array[roll];
}

// Function to perform the Fisher-Yates shuffle 

function shuffle(array) {

  var arrayLength = array.length; // Determines the number of swaps that need to take place in the shuffle
  var randomSelect = 0; // Will select one random character in the array in the back portion of the array 

  // While loop iterates the number of times equal to the number of characters in the password array 
  while (arrayLength > 0) {
    randomSelect = Math.floor(Math.random() * arrayLength); // Select a random character from the portion of the array that does not have a previously swapped character
    arrayLength--; // Counts down number of swaps 
    [array[arrayLength], array[randomSelect]] = [array[randomSelect], array[arrayLength]]; // The random character is swapped with the character at the index of the current swap remaining counter
    // In other words, swap will place the new swapped character right before the previously swapped character 
  }
  return array;
}


var generatePassword = function () {

  // Arrays that hold the characters that can make up the password
  var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')','<','>','?','-','+','~','`',';',':','{','{','[',']'];
  var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z'];
  var upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  var answers = userPrompts(); // Grab the criteria required and the length of password from userPrompts function 
  var password = []; // Initialize blank array to hold the final generated password 
  var characters = []; // Initialize blank array to hold all potential characters based on user selected criteria 
  var needed = []; // Initialize blank array to hold the at least one character of each needed criteria 

  // Conditionals will check to which character types are allowed in the password and get added to the 'characters' array
  // Conditionals will also add one of the required characters to the 'needed' array 
  if (answers.lowerConfirm) {
    characters = characters.concat(lowerCaseLetters);
    needed.push(randomRoll(lowerCaseLetters));
  }

  if (answers.upperConfirm) {
    characters = characters.concat(upperCaseLetters);
    needed.push(randomRoll(upperCaseLetters));
  }

  if (answers.numberConfirm) {
    characters = characters.concat(numbers);
    needed.push(randomRoll(numbers));
  }

  if (answers.specialConfirm) {
    characters = characters.concat(special);
    needed.push(randomRoll(special));
  }
  // Add random characters from the allowed characters array to the password array
  for (let index = 0; index < answers.passwordLength; index++) {
    password.push(randomRoll(characters));
  }

  // Replaces first x characters with the types of characters that need to be in the array 
  for (let index = 0; index < needed.length; index++) {
    password[index] = needed[index];
  }
  // Shuffle password array a few times to ensure randomness amongst required characters 
  for (i = 0; i < 2; i++) {
    shuffle(password);
  }

  // Return the password array after converting it as a string 
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
