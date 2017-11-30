<template>
  <div class="bg">
    <div class="row margins">
      <form class="col">
        <div class="row">
          <div class="col-md-8">
            <battles></battles>
            <battle-spell></battle-spell>
          </div>
          <div class="col-md-4">
            <navigation></navigation>
            <br>
            <stats></stats>
            <skills></skills>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import Character from '../../models/Character'
  import Navigation from '../Navigation/Navigation'
  import Skills from '../Character/Skills'
  import Stats from '../Character/Stats'
  import Battles from '../Character/Battles'
  import BattleSpell from './BattleSpell'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    Navigation,
    BattleSpell,
    Skills,
    Stats,
    Battles
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
  background: url("~@/assets/battle-bg.jpg") no-repeat center center fixed;
  min-height: 100eh;
  color: white;
}
</style>