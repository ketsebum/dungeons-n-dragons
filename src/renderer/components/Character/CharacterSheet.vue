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
            <navigation></navigation>
          </div>
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
  import Navigation from '../Navigation/Navigation'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    Skills,
    Stats,
    General,
    Personality,
    Battles,
    SpellList,
    Navigation
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
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>
<style scoped>
.bg {
  background: url("~@/assets/dragon-bg.jpg") no-repeat center;
  background-attachment: fixed;
  color: white;
  height: 100vh;
}
</style>