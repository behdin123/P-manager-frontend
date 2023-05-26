import { ref } from 'vue';
import validator from 'validator';

import api from '../../../api/authApi.js';
import Cookies from 'js-cookie';

const popupVisible = ref(false);
const popupContent = ref(0);


// for open the popup, bouth login & register 
const openPopup = (content) => {
  popupContent.value = content;
  popupVisible.value = true;
};


// for close the popup, bouth login & register 
const closePopup = () => {
  popupVisible.value = false;
};

const errorMessage = ref('');
const successMessage = ref('');

const displayError = (message) => {
  alert(message);
};



// validates user registration form input for username, mobile, email, password, and confirmPassword
const isRegisterFormValid = (username, mobile, email, password , confirmPassword) => {

  if (!username || !mobile || !email || !password || !confirmPassword ) {
    return 'Please fill in all fields';
  }

   // Validate username with length and allowed characters
   if (!validator.isLength(username, { min: 3, max: 20 }) || !validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
    return 'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores';
  }

  if (!validator.isMobilePhone(mobile)) {
    return 'Please enter a valid mobile number';
  }

  if (!validator.isEmail(email)) {
    return 'Please enter a valid email address';
  }

  if (!validator.isLength(password, { min: 6 })) {
    return 'Password must be at least 6 characters long';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
 
  return true;
};


// variables to store user registration values
const registerUsername = ref('');
const registerMobile = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');



async function submitRegister() {
  // Validate user input with isRegisterFormValid function
  const validationResult = isRegisterFormValid(registerUsername.value, registerMobile.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value);
  
  // If input is valid, make an API request to register user
  if (validationResult == true) {
    try {
      await api.register({
        username: registerUsername.value,
        mobile: registerMobile.value,
        email: registerEmail.value,
        password: registerPassword.value,
        confirmPassword: registerConfirmPassword.value,
      })

      // Show success message
      successMessage.value = 'Registration successful!';
      popupVisible.value = false;
    

    } catch (error) {
      // Show error message
      if (error.response) {
        console.error("Error:", error.response.data);
        errorMessage.textContent = error.response.data.message;
      } else {
        console.error("Error:", error.message);
        errorMessage.textContent = "An error occurred. Please try again later.";
      }
    }
  } 
  
  else {
    displayError(validationResult);
  }
}





// Validate user login form input
const isLoginFormValid = (username, password) => {

  if (!username || !password) {
    return 'Please fill in all fields';
  }

  // Validate username with length and allowed characters
  if (!validator.isLength(username, { min: 3, max: 20 }) || !validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
    return 'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores';
  }

  // Validate password with length
  if (!validator.isLength(password, { min: 6 })) {
    return 'Password must be at least 6 characters long';
  }

  return true;
};


// variable to check the loggin status - if the user is logged in or not
const isLoggedIn = ref(false);

const loginUsername = ref('');
const loginPassword = ref('');



// Function to handle user login form submission
async function submitLogin() {

  // Validate user input with isLoginFormValid function
  const validationResult = isLoginFormValid(loginUsername.value, loginPassword.value);

  // If input is valid, make an API request to login user
  if (validationResult === true) {
    try {
      const response = await api.login({
        username: loginUsername.value,
        password: loginPassword.value,
      });

      // Store the token in a cookie
      Cookies.set('jwt', response.data.token, {
        secure: true,
        sameSite: 'lax',
        expires: 1, // 1 day
      });

      closePopup();

      // Show success message
      successMessage.value = "You're successfully logged in";

      // Set isLoggedIn to true
      isLoggedIn.value = true;
      

    } catch (error) {
      // Show error message
      if (error.response) {
        console.error("Error:", error.response.data);
        errorMessage.textContent = error.response.data.message;
   
      } else {
        console.error("Error:", error.message);
        errorMessage.textContent = "An error occurred. Please try again later.";
      }
    }
  } 
  else {
    displayError(validationResult);
  }
}


// Function to handle user logout form submission
async function submitLogout() {

  // Remove the token from the cookie
  Cookies.remove('jwt');

  // Set isLoggedIn to false
  isLoggedIn.value = false;

  // Clear the loginUsername and loginPassword
  loginUsername.value = '';
  loginPassword.value = '';

  // Do not show success message
  successMessage.value = "";

  // Optional: Show a success message
  successMessage.value = "You've successfully logged out!";

}


export {
  popupVisible,
  popupContent,
  openPopup,
  closePopup,
  submitLogin,
  submitRegister,
  submitLogout,
  errorMessage,
  successMessage,
  isLoggedIn,
  loginUsername,
  loginPassword,
  registerUsername,
  registerMobile,
  registerEmail,
  registerPassword,
  registerConfirmPassword
};



