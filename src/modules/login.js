import { ref } from 'vue';
import validator from 'validator';

import api from '../api/api.js';
import Cookies from 'js-cookie';

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

const popupVisible = ref(false);
const popupContent = ref(0);

const openPopup = (content) => {
  popupContent.value = content;
  popupVisible.value = true;
};

const closePopup = () => {
  popupVisible.value = false;
};

const errorMessage = ref('');
const successMessage = ref('');

const displayError = (message) => {
  alert(message);
};


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

  // Validate password with length
  if (!validator.isLength(password, { min: 6 })) {
    return 'Password must be at least 6 characters long';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
 
  return true;
};


const registerUsername = ref('');
const registerMobile = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');


async function submitRegister() {

  const validationResult = isRegisterFormValid(registerUsername.value, registerMobile.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value);

  if (validationResult == true) {
    try {
      console.log("Request body:", validationResult);
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

const isLoggedIn = ref(false);

const loginUsername = ref('');
const loginPassword = ref('');

async function submitLogin() {
  const validationResult = isLoginFormValid(loginUsername.value, loginPassword.value);

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

  // Redirect to login page or another appropriate page
  const router = useRouter();
  router.push('/login');

  // Optional: Show a success message
  successMessage.value = "You've successfully logged out!";

}



