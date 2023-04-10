<template>
  <div class="modal" v-show="modelValue" :class="{ 'is-active': modelValue }">
      <div class="modal-card">
        <div class="modal-card-head">
          <p class="modal-card-title">Share Project</p>
          <button class="close" @click="modelValue = false">x</button>
        </div>
        <section class="modal-card-body">
          <!-- Share link section -->
          <div>
            <p>Your shareable link is:</p>
            <input type="text" v-model="shareableLink" readonly ref="shareableLinkInput" />
            <button @click="copyLinkToClipboard">Copy Link</button>
          </div>
          <!-- Add user section -->
          <div>
            <p>Add a user to the project:</p>
            <input type="email" v-model="userEmail" placeholder="User email" />
            <button @click="addUserToProject">Add User</button>
          </div>
        </section>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits('update:modelValue', false);
const shareableLink = ref('');
const userEmail = ref('');
const shareableLinkInput = ref('');

/* const closeModal = () => {

  emit('update:modelValue', false);
};
 */
const generateShareableLink = () => {
  shareableLink.value = `https://${window.location.host}/board/${Math.random()
    .toString(36)
    .substring(2)}`;
};

const copyLinkToClipboard = () => {
  shareableLinkInput.value.select();
  document.execCommand('copy');
  alert('The link has been copied to the clipboard!');
};

const addUserToProject = () => {
  console.log(`Add user with email: ${userEmail.value}`);
  userEmail.value = '';
};

watch(() => props.showModal, (newVal) => {
  if (newVal) {
    generateShareableLink();
  }
});
</script>

<style lang="scss">
@import "@/assets/global.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000 !important;
}

.modal.is-active {
  opacity: 1;
  transition: opacity 1.3s ease;
}

.modal-card {
  position: relative;
  padding: 20px;
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  width: 80%;
  max-width: 500px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  font-size: 14px !important;
}

.modal-card-head {
  padding: 0;
  margin-bottom: 20px;
}

.modal-card-title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  text-decoration: none;
  color: var(--tertiary-color);
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}

.close:hover {
  color: var(--primary-hover-color);
}

.modal-card-body input[type="text"],
.modal-card-body input[type="email"],
.modal-card-body button {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--tertiary-color);
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.modal-card-body input[type="text"]:focus,
.modal-card-body input[type="email"]:focus {
  outline: none;
  border-color: var(--quaternary-color);
}

.modal-card-body button {
  background-color: var(--quaternary-color);
  color: #ffffff;
  cursor: pointer;
  border: none;
  font-size: 18px;
  font-weight: bold;
}

.modal-card-body button:hover {
  background-color: var(--primary-hover-color);
}
</style>