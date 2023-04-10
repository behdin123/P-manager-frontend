import { ref } from 'vue';
import validator from 'validator';

export { popupVisible, popupContent, openPopup, closePopup, submitLogin, submitRegister };

const popupVisible = ref(false);
const popupContent = ref(0);

const openPopup = (content) => {
  popupContent.value = content;
  popupVisible.value = true;
};

const closePopup = () => {
  popupVisible.value = false;
};


const displayError = (message) => {
  alert(message);
};

const isLoginFormValid = (username, password) => {

  if (!username || !password) {
    displayError('Please fill in all fields');
    return false;
  }

  // Validate username with length and allowed characters
  if (!validator.isLength(username, { min: 3, max: 20 }) || !validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
    displayError('Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores');
    return false;
  }

  // Validate password with length
  if (!validator.isLength(password, { min: 6 })) {
    displayError('Password must be at least 6 characters long');
    return false;
  }

  return true;
};


const isRegisterFormValid = (username, email, password, confirmPassword) => {

  if (!username || !email || !password || !confirmPassword) {
    displayError('Please fill in all fields');
    return false;
  }

   // Validate username with length and allowed characters
   if (!validator.isLength(username, { min: 3, max: 20 }) || !validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
    displayError('Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores');
    return false;
  }

  if (!validator.isEmail(email)) {
    displayError('Please enter a valid email address');
    return false;
  }

  // Validate password with length
  if (!validator.isLength(password, { min: 6 })) {
    displayError('Password must be at least 6 characters long');
    return false;
  }

  if (password !== confirmPassword) {
    displayError('Passwords do not match');
    return false;
  }

  return true;
};

const submitRegister = () => {
  // Retrieve the username, email, password, and confirmPassword values entered by the user
  const enteredUsername = username.value;
  const enteredEmail = email.value;
  const enteredPassword = password.value;
  const enteredConfirmPassword = confirmPassword.value;

  if (!isRegisterFormValid(enteredUsername, enteredEmail, enteredPassword, enteredConfirmPassword)) {
    return;
  }

  closePopup();
};

const submitLogin = () => {
  // Retrieve the username and password values entered by the user
  const enteredUsername = username.value;
  const enteredPassword = password.value;

  if (!isLoginFormValid(enteredUsername, enteredPassword)) {
    return;
  }
  // Jwt token

  closePopup();
};

