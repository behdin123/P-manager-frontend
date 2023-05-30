<template>
    <div> 

        <!-- The popup -->
        <div class="popup">
            <div class="popup__content">

                <!-- The popup for cropping the image -->
                <div v-show="showCropper" class="cropper-popup">
                    <img :src="selectedImageUrl" ref="imageSource" />
                    <div class="crop-btn-div">
                      <button class="button Update-button" @click="cropImage">Crop</button>
                      <button class="button" @click="cancelCrop">Cancel</button>
                    </div> 
                </div>

                <div class="image-container">
                    <!-- The profile picture -->
                    <img :src="profile_image" alt="Profile Picture">
                    <div class="overlay">
                      <input class="input uploadBtn" type="file" @change="onImageChange" accept="image/*" ref="fileInput">
                      <div class="text newImage" @click="promptFileUpload">Upload new Image</div>
                    </div>
                </div>

                <button class="button editing-toggle" @click="toggleEditing">{{ editing ? 'Cancel' : 'Edit Profile' }}</button>

                <!-- The user information -->
                <div class="profile-info">

                    <label class="input-contain"> <b>First Name:</b>
                        <span v-if="!editing">{{ first_name }}</span>
                        <input v-else type="text" v-model="first_name">
                    </label>

                    <label class="input-contain"> <b>Last Name:</b>
                        <span v-if="!editing">{{ last_name }}</span> 
                        <input v-else type="text" v-model="last_name">
                    </label>

                    <label class="input-contain"> <b>Username:</b>
                        <span v-if="!editing">{{ username }}</span>
                        <input v-else type="text" v-model="username">
                    </label>

                    <label class="input-contain"> <b>Email:</b>
                        <span v-if="!editing">{{ email }}</span>
                        <input v-else type="text" v-model="email">
                    </label>

                    <label class="input-contain"> <b>Mobile Number:</b>
                        <span v-if="!editing">{{ mobile }}</span>
                        <input v-else type="text" v-model="mobile">
                    </label>

                    <label class="input-contain"> <b>Skills:</b>
                        <span v-if="!editing">{{ skills }}</span>
                        <input v-else type="text" v-model="skills">
                    </label>

                    <label class="input-contain"> <b>Team:</b>
                        <span v-if="!editing">{{ teams }}</span>
                        <input v-else type="text" v-model="teams">
                    </label>
                </div>

                    <button class="button Update-button" v-if="editing" @click="updateAndClose">Update Info</button>

                    <!-- The close button -->
                    <button class="close-popup" @click="showPopup = false">x</button>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted, computed } from 'vue';
import api from '../../api/userApi.js';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import {
    showPopup
} from '../../modules/Main_logic/UserProfile';

import {
    username,
    profile_image,
    first_name,
    last_name,
    mobile,
    email,
    skills,
    teams, 
} from '../../modules/Crud_operator/User/userGetCrud';

// to change between the edit profile mode and show profile information mode
const editing = ref(false);

const toggleEditing = () => {
    editing.value = !editing.value;
};


const showCropper = ref(false);

// Create reference to the image element for the cropper
const imageSource = ref(null);
let cropper = null;
const selectedImage = ref(null);

// Compute the URL of the selected image
const selectedImageUrl = computed(() => {
  return selectedImage.value ? URL.createObjectURL(selectedImage.value) : '';
});

let objectUrl = '';

const onImageChange = (e) => {
    const file = e.target.files[0];
    selectedImage.value = file;
    
    // Revoke the previous object URL if it exists
    if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
    }

    const url = URL.createObjectURL(file);
    showCropper.value = true;

     // Remove the previous cropper if it exists
     if (cropper) {
        cropper.destroy();
        cropper = null;
    }

    // Ensure the image is fully loaded before initializing the cropper
    imageSource.value.onload = () => {
        cropper = new Cropper(imageSource.value, {
            aspectRatio: 1,
            viewMode: 1
        });
    };

    // Make sure to set the src *after* the onload event listener
    imageSource.value.src = url;
};

// clean up the onload event listener
onUnmounted(() => {
    if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
    }
    if (imageSource.value) {
        imageSource.value.onload = null;
    }
});




// Add a new function to crop the image and upload it
const cropImage = async () => {

// Getting the cropped image
const croppedCanvas = cropper.getCroppedCanvas();

// save the cropped image URL as a jpeg with 70% quality, to reduce the size
const dataUrl = croppedCanvas.toDataURL('image/jpeg');

const response = await fetch(dataUrl);
const croppedImage = await response.blob();


// Create a FormData object and append the image file
const formData = new FormData();
croppedImage.name = "profile_image.jpg";
formData.append('image', croppedImage, croppedImage.name);

try {

  // Call the API to upload the profile image
  const response = await api.uploadProfileImage(formData);

  /* console.log('Upload response:', response); */

  // Create a blob URL
  let blobURL = URL.createObjectURL(croppedImage);

  // Set profile image value
  profile_image.value = blobURL;
  showCropper.value = false;
} catch (error) {
  console.error('Error uploading profile image:', error);

  if (croppedImage.size > 4 * 2024*2024) {
    errorMessage.value = 'Image size should be less than 4 MB.';
  } else {
    // Set a general error message for other errors
    errorMessage.value = 'Error uploading profile image. Please try again.';
  }
}
cropper.destroy();
cropper = null;
};



// function to cancel the cropping process
const cancelCrop = () => {
    showCropper.value = false;
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
};

const fileInput = ref(null);

const promptFileUpload = () => {
    // click the file input
    fileInput.value.click();
};

const { updateUserInfo } = api;

const onSubmit = async () => {
  const data = {
    first_name: first_name.value,
    last_name: last_name.value,
    username: username.value,
    email: email.value,
    mobile: mobile.value,
    skills: skills.value,
    teams: teams.value,
  };

  await updateUserInfo(data);
};

const updateAndClose = async () => {
  await onSubmit();
  showPopup.value = !showPopup.value;
};

</script>


<style lang="scss" scoped>
@import "@/assets/global.scss";

/* Styling for the popup */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup__content {
  background-color: var(--primary-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}

.cropper-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.cropper-popup img {
  max-width: 60%;
  max-height: 60%;
  margin-bottom: 0 !important;
  width: auto;
  height: 50%;
}




.crop-btn-div{
  z-index: 100;
  margin-top: 30%;
  width: 30%;
  display: flex;
  justify-content: space-between;
}


.input-contain{
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: var(--white-black-color);
  margin-bottom: 10px;
}

.input-contain input{
  margin-left: 50px;
  padding-left: 6px;
}

.editing-toggle{
    margin-bottom: 30px;
}

/* Styling for the profile picture */
img {
  max-width: 100%;
  max-height: 10rem;
  margin-bottom: 1rem;
}

.image-container {
  position: relative;
  max-height: 10rem;
  cursor: pointer;
  margin-bottom: 40px;
}

.profile-image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: rgba(0,0,0,0.6);
}

.image-container:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.newImage{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploadBtn{
  display: none;
}

/* Styling for the profile information */
.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  min-width: 70%;
}

.button {
  background-color: var(--quaternary-color);
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 12px 30px;
  transition: background-color 0.2s ease-in-out;
}
</style>