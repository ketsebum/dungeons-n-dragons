import Store from '../../../main/store'

const state = {
  character: {},
}

let localStore = new Store({
  configName: 'characterSheet',
  defaults: {
    character: state.character
  }
});

const mutations = {
  loadCharacter: (state, character) => state.character = localStore.get('character'),
  updateSkill: (state, skill) => {
    for(let i = 0; i < state.character.info.skills.length; i++) {
      if(state.character.info.skills[i].name === skill.name) {
        for(let j = 0; j < state.character.info.stats.length; j++) {
          if(state.character.info.stats[j].name === state.character.info.skills[i].stat) {
            let modifier = state.character.info.stats[j].val;
            state.character.info.skills[i].val = state.character.info.skills[i].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
            state.character.info.skills[i].color = state.character.info.skills[i].val >= 0;
            break;
          }
        }
        break;
      }
    }
  },
  calculateStats: (state) => {
    for(let i = 0; i < state.character.info.stats.length; i++) {
      let modifier = state.character.info.stats[i].val;
      state.character.info.stats[i].bonus = (modifier / 2) - 5;
      state.character.info.stats[i].save = state.character.info.stats[i].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
      state.character.info.stats[i].bcolor = state.character.info.stats[i].bonus >= 0;
      state.character.info.stats[i].scolor = state.character.info.stats[i].save >= 0;
    }
  },
  calculateSkills: (state) => {
    for(let i = 0; i < state.character.info.skills.length; i++) {
      for(let j = 0; j < state.character.info.stats.length; j++) {
        if(state.character.info.stats[j].name === state.character.info.skills[i].stat) {
          let modifier = state.character.info.stats[j].val;
          state.character.info.skills[i].val = state.character.info.skills[i].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
          state.character.info.skills[i].color = state.character.info.skills[i].val >= 0;
          break;
        }
      }
    }
  },
  toggleSkillProf: (state, name) => {
    for(let i = 0; i < state.character.info.skills.length; i++) {
      if(state.character.info.skills[i].name === name) {
        state.character.info.skills[i].prof = !state.character.info.skills[i].prof;
        break;
      }
    }
  },
  saveSkills: (state, skills) => state.character.info.skills = skills,
  saveSpell: (state, spell) => state.character.info.spells.push(spell),
}

const actions = {
  toggleSkillProf ({ commit }, value) {
    commit('toggleSkillProf', value);
    commit('calculateSkills');
  }
}

export default {
  state,
  mutations,
  actions
}
