import { ref } from 'vue';
import { fetchProjects } from '../Crud_operator/Project/projectGetCrud';
import { useRouter } from 'vue-router';


const useRouterCustom = () => {
  
  const router = useRouter();

  // To open a project interface and edit the tasks inside the project overview
  const openProject = (project) => {
    router.push({ name: 'ProjectBoard', params: { id: project._id } });
  };
  return {
    openProject
  }
}

const { openProject } = useRouterCustom();

/*
*
* Logic & Variables for showing Project Create popup and hanle it  
*
*/
// Create project popup
const showProjectCreation = ref(false);

const openProjectCreation = (imageSrc) => {
  showProjectCreation.value = true;
};

const closeProjectCreation = () => {
  showProjectCreation.value = false;
};

const projectBackgroundImage = (project) => {
  return `url(${project.image})`;
};


/*
*
* Logic & Variables for showing Project Update popup and hanle it  
*
*/
// To control the visibility of the projectUpdateComponent.vue popup
const showProjectUpdate = ref(false);

// To store the selected project for updating
const selectedProject = ref('');

// To open the projectUpdateComponent.vue popup with the selected project
const openProjectUpdatePopup = (project) => {
  selectedProject.value = project;
  showProjectUpdate.value = true;
};

// To close the projectUpdateComponent.vue popup and refresh the projects list
const onUpdateFinished = () => {
  showProjectUpdate.value = false;
  fetchProjects();
};




export{
    // To open a project interface
    openProject,
 
    // Create project popup functions & variables
    showProjectCreation,
    openProjectCreation,
    closeProjectCreation,
    projectBackgroundImage,

    // Update project popup functions & variables
    showProjectUpdate,
    selectedProject,
    openProjectUpdatePopup,
    onUpdateFinished,
};