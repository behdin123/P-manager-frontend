import {
    getTeams,
    teams
} from '../Crud_operator/team/teamGetCrud';

const refreshTeams = async () => {
    teams.value = await getTeams();
  };


export { refreshTeams };