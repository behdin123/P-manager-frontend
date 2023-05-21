import { ref, watchEffect} from 'vue';

import api from '../../../api/userApi.js';

import { isLoggedIn } from './login.js';

// variables for information of the user
let profile_image = ref('');
let first_name = ref('');
let last_name = ref('');
let username = ref('');
let mobile = ref('');
let email = ref('');
let skills = ref('');
let teams = ref('');

// if user logged in - then get user profile image and username to show in the navigation
watchEffect(async () => {
  if (isLoggedIn.value) {
    try {
      const res = await api.getProfile();
      first_name.value = res.user.first_name;
      last_name.value = res.user.last_name;
      username.value = res.user.username;
      mobile.value = res.user.mobile;
      email.value = res.user.email;
      skills.value = res.user.skills;
      teams.value = res.user.teams;
      profile_image.value = res.user.profile_image;

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
});


export {
    username,
    profile_image,
    first_name,
    last_name,
    mobile,
    email,
    skills,
    teams,
};