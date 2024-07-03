const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Basic arithmetic operations
function calculate(operation, num1, num2) {
  switch (operation) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
    default: return 'Error: Invalid operation';
  }
}

// Fitness calorie calculator
function calculateCalories(weight, height, age, gender, activityLevel) {
  const bmr = gender.toLowerCase() === 'male' 
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9
  };

  return Math.round(bmr * activityMultipliers[activityLevel.toLowerCase()]);
}

// Input validation
function validateNumber(input) {
  return !isNaN(input) && input !== '';
}

function validateGender(input) {
  return ['male', 'female'].includes(input.toLowerCase());
}

function validateActivityLevel(input) {
  return ['sedentary', 'light', 'moderate', 'active', 'veryactive'].includes(input.toLowerCase());
}

// Main calculator function
function startCalculator() {
  console.log('\n===== Calculator Menu =====');
  console.log('1. Basic Arithmetic (+, -, *, /)');
  console.log('2. Fitness Calorie Calculator');
  console.log('3. Exit');
  console.log('==========================\n');

  rl.question('Choose an option (1, 2, or 3): ', (choice) => {
    switch (choice) {
      case '1':
        handleArithmetic();
        break;
      case '2':
        handleFitness();
        break;
      case '3':
        console.log('Thank you for using the Calculator App. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        startCalculator();
    }
  });
}

function handleArithmetic() {
  rl.question('Enter operation (+, -, *, /): ', (operation) => {
    if (!['+', '-', '*', '/'].includes(operation)) {
      console.log('Invalid operation. Please try again.');
      handleArithmetic();
      return;
    }

    rl.question('Enter two numbers separated by space: ', (input) => {
      const [num1, num2] = input.split(' ').map(Number);
      if (!validateNumber(num1) || !validateNumber(num2)) {
        console.log('Invalid input. Please enter valid numbers.');
        handleArithmetic();
        return;
      }

      const result = calculate(operation, num1, num2);
      console.log(`Result: ${result}`);
      startCalculator();
    });
  });
}

function handleFitness() {
  rl.question('Enter weight (kg): ', (weight) => {
    if (!validateNumber(weight)) {
      console.log('Invalid weight. Please enter a valid number.');
      handleFitness();
      return;
    }

    rl.question('Enter height (cm): ', (height) => {
      if (!validateNumber(height)) {
        console.log('Invalid height. Please enter a valid number.');
        handleFitness();
        return;
      }

      rl.question('Enter age: ', (age) => {
        if (!validateNumber(age)) {
          console.log('Invalid age. Please enter a valid number.');
          handleFitness();
          return;
        }

        rl.question('Enter gender (male/female): ', (gender) => {
          if (!validateGender(gender)) {
            console.log('Invalid gender. Please enter either male or female.');
            handleFitness();
            return;
          }

          rl.question('Enter activity level (sedentary/light/moderate/active/veryActive): ', (activityLevel) => {
            if (!validateActivityLevel(activityLevel)) {
              console.log('Invalid activity level. Please choose from the given options.');
              handleFitness();
              return;
            }

            const calories = calculateCalories(parseFloat(weight), parseFloat(height), parseInt(age), gender, activityLevel);
            console.log(`Estimated daily calorie needs: ${calories}`);
            startCalculator();
          });
        });
      });
    });
  });
}

console.log('Welcome to the Calculator App!');
startCalculator();
