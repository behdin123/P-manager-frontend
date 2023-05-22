<template>
    <div class="team-edit-container" v-if="team">
      <div class="team-edit-popup">
        <h2>Edit Team</h2>
  
        <button id="button" class="button" @click="toggleEditMode">{{ buttonText }}</button>

        <div class="flex" v-if="editMode">
          <label class="input-label"> Name:
            <input type="text" v-model="team.name" />
          </label>
  
          <label class="input-label"> Team members:
            <input type="text" v-model="usernames" />
          </label>
  
          <label class="input-label"> Description:
            <input type="text" v-model="team.description" />
          </label>
        </div>

        <div class="flex" v-else>
            <label class="input-label"> 
               <div> Name:</div>
               <span>{{ team.name }}</span>
            </label>

            <label class="input-label"> 
                <div> Team members:</div>
                <span>{{ team.users.join(', ') }}</span>
            </label>

            <label class="input-label"> 
                <div>Description:</div>
                <span>{{ team.description }}</span>
            </label>
        </div>

        <button v-if="editMode" class="button Update-button" @click="updateTeamhandler">Update Team</button>
        <button v-else class="button button-color" @click="removeTeamhandler(team)">Remove</button>
  
        <!-- The close button -->
        <button class="close" @click="close">x</button>
      </div>
    </div>
  </template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { updateTeam } from '../../modules/Crud_operator/team/teamUpdateCrud';
import { removeTeamById } from '../../modules/Crud_operator/team/teamRemoveCrud';


const props = defineProps({
  team: Object,
});

const emit = defineEmits(['team-updated', 'close']);

const usernames = ref('');

const updateTeamhandler = async () => {
  const updatedTeam = { ...props.team, users: usernames.value.split(',').map((username) => username.trim()) };
  const isSuccess = await updateTeam(updatedTeam._id, updatedTeam);
  if (isSuccess) {
    close();
    emit('team-updated');
  }
};

const close = () => {
  emit('close');
};

const removeTeamhandler = async (team) => {
  const confirmDelete = confirm('Are you sure you want to delete this team?');
  if (confirmDelete) {
    const isSuccess = await removeTeamById(team._id);
    close();
    emit('team-updated');
    if (isSuccess) {
      getTeams(); // Refresh the teams list
    }
  }
};


const editMode = ref(false);
const buttonText = ref('Switch to Edit Mode');

const toggleEditMode = () => {
  editMode.value = !editMode.value;
  buttonText.value = editMode.value ? 'Cancel' : 'Switch to Edit Mode';
};

</script>


<style lang="scss" scoped>
@import "@/assets/global.scss";
.team-edit-container {
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

.team-edit-popup {
  background-color: var(--primary-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: var(--tertiary-color);
  width: 30%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  border-radius: 8px;
}

#button{
    margin-bottom: 30px !important;
}

.input-label {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: auto !important;
}

.buttons-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}

.button-color {
  background-color: #e53935;
}

.flex{
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;

}

</style>
  