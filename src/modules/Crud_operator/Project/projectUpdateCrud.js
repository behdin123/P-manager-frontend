  import { ref } from 'vue';
  import projectApi from '../../../api/projectApi.js';

  const { updateProject, updateProjectImage } = projectApi;

  const updatedProject = ref({
    _id: '',
    title: '',
    description: '',
    private: '',
    tags: [],
  });

  const tagsInput = ref('');
  const imageFile = ref(null);

  const onFileChange = (e) => {
    imageFile.value = e.target.files[0];
  };

  const handleUpdateProject = async () => {
      try {
        updatedProject.value.tags = tagsInput.value.split(',').map((tag) => tag.trim());
    
        await projectApi.updateProject(updatedProject.value._id, updatedProject.value);
    
        if (imageFile.value) {
          await projectApi.updateProjectImage(updatedProject.value._id, imageFile.value);
        }
    
        return true;
      } catch (error) {
        console.error('Error updating project:', error);
        return false;
      }
    };

  export {
    onFileChange,
    handleUpdateProject,
    updatedProject,
    tagsInput
  }; 