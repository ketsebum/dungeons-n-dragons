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
      state.character.info.stats[i].bonus = Math.floor((modifier / 2) - 5);
      let save = Math.floor(state.character.info.stats[i].prof ? (modifier / 2) - 3 : (modifier / 2) - 5);
      state.character.info.stats[i].save = save;
      state.character.info.stats[i].bcolor = state.character.info.stats[i].bonus >= 0;
      state.character.info.stats[i].scolor = state.character.info.stats[i].save >= 0;
    }
  },
  calculateSkills: (state) => {
    for(let i = 0; i < state.character.info.skills.length; i++) {
      for(let j = 0; j < state.character.info.stats.length; j++) {
        if(state.character.info.stats[j].name === state.character.info.skills[i].stat) {
          let modifier = state.character.info.stats[j].val;
          let val = Math.floor(state.character.info.skills[i].prof ? (modifier / 2) - 3 : (modifier / 2) - 5);
          state.character.info.skills[i].val = val;
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
  toggleStatProf: (state, name) => {
    for(let i = 0; i < state.character.info.stats.length; i++) {
      if(state.character.info.stats[i].name === name) {
        state.character.info.stats[i].prof = !state.character.info.stats[i].prof;
        break;
      }
    }
  },
  updateStatValue: (state, stat) => {
    for(let i = 0; i < state.character.info.stats.length; i++) {
      if(state.character.info.stats[i].name === stat.name) {
        state.character.info.stats[i].val = stat.value;
        break;
      }
    }
  },
  updateGeneralValue: (state, gen) => {
    for(let i = 0; i < state.character.info.general.length; i++) {
      if(state.character.info.general[i].name === gen.name) {
        state.character.info.general[i].val = gen.value;
        break;
      }
    }
  },
  updateBattleValue: (state, battle) => {
    for(let i = 0; i < state.character.info.battles.length; i++) {
      if(state.character.info.battles[i].name === battle.name) {
        state.character.info.battles[i].val = battle.value;
        break;
      }
    }
  },
  updatePersonalityValue: (state, personality) => {
    state.character.info.personality[personality.name].val = personality.value;
  },
  saveSkills: (state, skills) => state.character.info.skills = skills,
  saveSpell: (state, spell) => state.character.info.spells.push(spell),
}

const actions = {
  toggleSkillProf ({ commit }, value) {
    commit('toggleSkillProf', value);
    commit('calculateSkills');
  },
  toggleStatProf ({ commit }, value) {
    commit('toggleStatProf', value);
    commit('calculateStats');
  },
  updateStatValue ({ commit }, stat) {
    commit('updateStatValue', stat);
    commit('calculateStats');
    commit('calculateSkills');
  },
  saveToDisk ({ commit }) {
    localStore.set('character', state.character);
  },
  resetDisk ({ commit }, input) {
    localStore.set('character', input);
  }
}

export default {
  state,
  mutations,
  actions
}
