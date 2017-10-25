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
  saveSpell: (state, spell) => state.character.info.spells.push(spell),
}

const actions = {
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
