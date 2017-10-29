<template>
  <div>
    <button type="submit" @click="save" class="btn btn-primary">Save</button>
    <!--<button type="submit" @click="reset" class="btn btn-danger">Reset</button>-->
    <router-link class="btn btn-dark" v-if="$route.path !== '/'" to="/">Character Sheet</router-link>
    <router-link class="btn btn-dark" v-if="$route.path !== '/battle'" to="/battle">Battle Screen</router-link>
    <router-link class="btn btn-dark" v-if="$route.path !== '/spells'" to="/spells">Spell Book</router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Character from '../../models/Character'

export default {
  name: 'navigation',
  methods: {
    save: function() {
      this.$store.dispatch("saveToDisk");
    },
    reset: function() {
      this.$store.dispatch("resetDisk", new Character());
    },
  }
};
</script>