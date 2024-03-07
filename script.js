// Select all login buttons
let loginButtons = document.querySelectorAll(".log-btn");
// Select all registration buttons
let regButtons = document.querySelectorAll(".reg-btn");
// Select registration submit button
let regSubmitBtn = document.getElementById("reg-btn-submit");
// Select login submit button
let logSubmitBtn = document.getElementById("log-btn-submit");

// Array to store user data
let userData = [];

// Switch to the registration page
const registrationPage = () => {
  // Hide login div and show registration div
  document.querySelector("div.register").classList.remove("hide");
  document.querySelector("div.login").classList.add("hide");
  // Disable registration button and enable login button
  document.querySelector(".log-btn").removeAttribute("disabled");
  document.querySelector(".reg-btn").setAttribute("disabled", "");
  // Hide registration footer and show login footer
  document.querySelector("div.footer-log").classList.remove("hide");
  document.querySelector("div.footer-reg").classList.add("hide");
  // Change header text
  document.querySelector(".header>h1").innerText = "JavaScript Registration";
};

// Switch to the login page
const loginPage = () => {
  // Hide registration div and show login div
  document.querySelector("div.register").classList.add("hide");
  document.querySelector("div.login").classList.remove("hide");
  // Disable login button and enable registration button
  document.querySelector(".log-btn").setAttribute("disabled", "");
  document.querySelector(".reg-btn").removeAttribute("disabled");
  // Hide login footer and show registration footer
  document.querySelector("div.footer-log").classList.add("hide");
  document.querySelector("div.footer-reg").classList.remove("hide");
  // Change header text
  document.querySelector(".header>h1").innerText = "JavaScript Login";
};

// Clear registration form fields
const clearRegForm = () => {
  document.getElementById("email-reg").value = "";
  document.getElementById("password-reg").value = "";
  document.getElementById("username-reg").value = "";
};

// Clear login form fields
const clearLogForm = () => {
  document.getElementById("username-log").value = "";
  document.getElementById("password-log").value = "";
};

// Add event listeners for each login button
loginButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginPage();
    clearLogForm();
    clearRegForm();
  });
});

// Add event listeners for each registration button
regButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    registrationPage();
    clearLogForm();
    clearRegForm();
  });
});

// Display a sweet alert message
const showAlert = (message, icon, title) => {
  Swal.fire({
    icon: icon,
    text: message,
    title: title,
    showConfirmButton: true,
    timer: 2500,
  });
};

// Add event listener for registration submit button
regSubmitBtn.addEventListener("click", () => {
  // Get values from registration form
  let regEmail = document.getElementById("email-reg").value;
  let regPassword = document.getElementById("password-reg").value;
  let regUsername = document.getElementById("username-reg").value;

  // Check if any field is empty
  if (regEmail == "" || regPassword == "" || regUsername == "") {
    showAlert("Please fill in all fields", "error");
  } else {
    // Retrieve stored user data from local storage
    let storedData = JSON.parse(localStorage.getItem("userData")) || [];

    // Check if email or username already exists
    let emailExists = storedData.some((user) => user.email === regEmail);
    let usernameExists = storedData.some(
      (user) => user.username === regUsername
    );

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (emailExists) {
      showAlert(
        "Please enter a new email or log in now",
        "error",
        "Email Already Exists"
      );
      clearRegForm();
    } else if (validateEmail(regEmail)) {
      showAlert("Please enter a valid email", "error", "Invalid Email");
      document.getElementById("email-reg").value = "";
    } else if (usernameExists) {
      showAlert(
        "Please enter a unique username",
        "error",
        "Username Already Exists"
      );
      clearRegForm();
    } else if (regPassword.length < 8) {
      showAlert(
        "Password must be at least 8 characters long",
        "error",
        "Password Too Short"
      );
      document.getElementById("password-reg").value = "";
    } else {
      // Add new user data to the array
      storedData.push({
        email: regEmail,
        username: regUsername,
        password: regPassword,
      });

      // Store updated user data in local storage
      localStorage.setItem("userData", JSON.stringify(storedData));

      showAlert(
        "You have registered successfully. Please log in now",
        "success",
        "Registration Success"
      );
      clearRegForm();
      loginPage();
    }
  }
});

// Add event listener for login submit button
logSubmitBtn.addEventListener("click", () => {
  // Get values from login form
  let logPassword = document.getElementById("password-log").value;
  let logUsername = document.getElementById("username-log").value;
  let storedData = JSON.parse(localStorage.getItem("userData")) || [];

  // Check if any field is empty
  if (logPassword == "" || logUsername == "") {
    showAlert("Please fill in all fields", "error");
  } else {
    // Find user with matching username
    let usernameRegistered = storedData.find(
      (user) => user.username === logUsername
    );

    if (usernameRegistered) {
      // Check if password matches
      if (logPassword === usernameRegistered.password) {
        showAlert(
          "Congratulations for successful login",
          "success",
          "Login Success"
        );
        clearLogForm();
      } else {
        showAlert(
          "Password does not match our records",
          "info",
          "Invalid Password"
        );
        document.getElementById("password-log").value = "";
      }
    } else {
      showAlert(
        "If not, please register first",
        "question",
        "Have You Registered?"
      );
      clearLogForm();
      registrationPage();
    }
  }
});

// // function for getting all data in console.

// const printUserData = () => {
//   let storedData = JSON.parse(localStorage.getItem("userData")) || [];

//   if (storedData.length > 0) {
//     console.log("Stored User Data:");
//     storedData.forEach((user, index) => {
//       console.log(`User ${index + 1}:`);
//       console.log(`  Email: ${user.email}`);
//       console.log(`  Username: ${user.username}`);
//       console.log(`  Password: ${user.password}`);
//     });
//   } else {
//     console.log("No user data stored yet.");
//   }
// };

// // Call the function to print user data
// printUserData();
