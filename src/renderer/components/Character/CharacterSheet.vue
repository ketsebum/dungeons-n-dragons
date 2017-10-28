<template>
  <div class="margins">
    <div class="row">
      <form class="col">
        <general></general>
        <div class="row">
          <div class="col-md-4">
            <stats></stats>
            <hr>
            <skills></skills>
          </div>
          <div class="col-md-4">
            <battles></battles>
          </div>
          <div class="col-md-4">
            <personality></personality>
            <button type="submit" @click="save" class="btn btn-primary">Save</button>
            <button type="submit" @click="reset" class="btn btn-danger">Reset</button>
            <router-link class="btn btn-dark" to="/">Go to Main</router-link>
            <router-link class="btn btn-dark" to="/spells">Go to Spell Page</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import Skills from './Skills'
  import Stats from './Stats'
  import General from './General'
  import Personality from './Personality'
  import Battles from './Battles'
  import Character from '../../models/Character'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    Skills,
    Stats,
    General,
    Personality,
    Battles
  },
  data() {
    return {
      good: "good",
      bad: "bad",
      // char: new Character(),
      store: new Store({
        configName: 'characterSheet',
        defaults: {
          character: this.char
        }
      })
    };
  },
  computed: mapState({
    // map this.character to store.state.character
    char: state => state.CharStore.character,
  }),
  created: function () {
    //Load char with the last used character
    this.loadCharacter();
    // this.calculateStats();
  },
  methods: {
    loadCharacter: function() {
      this.$store.commit("loadCharacter");
    },
    save: function() {
      this.$store.dispatch("saveToDisk");
    },
    reset: function() {
      this.$store.dispatch("resetDisk", new Character());
    },
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style scoped>
.margins {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}
.good {
  border-color: #28a745;
}
.bad {
  border-color: #dc3545;
}
</style>
