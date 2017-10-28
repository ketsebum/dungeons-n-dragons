<template>
  <div class="bg">
    <div class="row margins">
      <form class="col">
        <div class="row">
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
            <button type="submit" @click="save" class="btn btn-primary">Save</button>
            <button type="submit" @click="reset" class="btn btn-danger">Reset</button>
            <router-link class="btn btn-dark" to="/">Character Sheet</router-link>
            <router-link class="btn btn-dark" to="/spells">Spell Book</router-link>
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
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
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