import Store from '../../../main/store'

const state = {
  main: 0,
  alert: {
    type: 'info',
    msg: 'No alert',
    countdown: 0
  },
  character: {},
  people: []
}

let localStore = new Store({
  configName: 'characterSheet',
  defaults: {
    character: state.character
  }
});

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
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
  calculateStats: function() {
    for(let stat in state.character.info.stats) {
      let modifier = state.character.info.stats[stat].val;
      state.character.info.stats[stat].bonus = (modifier / 2) - 5;
      state.character.info.stats[stat].save = state.character.info.stats[stat].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
      state.character.info.stats[stat].bcolor = state.character.info.stats[stat].bonus >= 0;
      state.character.info.stats[stat].scolor = state.character.info.stats[stat].save >= 0;
    }
    for(let skill in state.character.info.skills) {
      let lStat = state.character.info.skills[skill].stat;
      let modifier = state.character.info.stats[lStat].val;
      state.character.info.skills[skill].val = state.character.info.skills[skill].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
      state.character.info.skills[skill].color = state.character.info.skills[skill].val >= 0;
    }
  },
  toggleSkillProf ({ commit }, value) {
    commit('toggleSkillProf', value);
    commit('calculateSkills');
  },
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  decrementAsync ({ commit }) {
    setTimeout(() => {
      commit('decrementAlert')
    }, 1000)
  },
}

export default {
  state,
  mutations,
  actions
}
