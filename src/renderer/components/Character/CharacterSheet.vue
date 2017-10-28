<template>
  <div class="bg">
    <div class="row margins">
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
            <spell-list></spell-list>
          </div>
          <div class="col-md-4">
            <personality></personality>
            <button type="submit" @click="save" class="btn btn-primary">Save</button>
            <button type="submit" @click="reset" class="btn btn-danger">Reset</button>
            <router-link class="btn btn-dark" to="/battle">Battle Sreen</router-link>
            <router-link class="btn btn-dark" to="/spells">Spell Book</router-link></div>
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
  import SpellList from './SpellList'
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
    Battles,
    SpellList
  },
  data() {
    return {
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
    if (this.$store.state.CharStore.character.info === undefined) this.loadCharacter();
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
.bg {
  background: url("~@/assets/dragon-bg.jpg") no-repeat center center fixed;
  color: white;
  height: 100vh;
}
</style>