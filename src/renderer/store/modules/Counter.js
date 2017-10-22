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

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  decrementAlert: state => state.alert.countdown <= 0 ? state.alert.countdown = 0 : state.alert.countdown--,
  sendAlert: (state, alert) => state.alert = alert,
  loadCharacter: (state, character) => state.character = character,
  saveSpell: (state, spell) => state.character.info.spells.push(spell),
  loadPeople: (state, people) => state.people = people,
  addPerson: (state, person) => state.people.push(person),
  updatePerson: (state, person) => {
    var id = person.id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.firstName = person.firstName;
        v.lastName = person.lastName;
        v.dob = person.dob;
        v.zipCode = person.zipCode;
        v.phoneNumber = person.phoneNumber;
        v.edit = false;
        v.loading = false;
      }
    });
  },
  toggleEditOn: (state, id) => {
    var id = id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.edit = true;
      } else {
        v.edit = false;
      }
    });
  },
  toggleEditOff: (state, id) => {
    var id = id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.edit = false;
      }
    });
  },
  turnLoadingOn: (state, id) => {
    var id = id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.loading = true;
      }
    });
  },
  turnLoadingOff: (state, id) => {
    var id = id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.loading = false;
      }
    });
  },
  removePerson: (state, id) => {
    var index = -1;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        index = i;
      }
    });
    state.people.splice(index, 1);
  }
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
