<template>
  <div>
    <span>Spells:</span>
    <hr>
    <button class="btn btn-info mbuttons" v-for="(value, spell) in spells" :key="spell">{{spell}}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "spellList",
  data() {
    return {
    };
  },
  computed:{
    spells: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.spells);
      }
    }
  },
  methods: {
  }
};
</script>
<style scoped>
.mbuttons {
    margin-left: 3px;
    margin-top: 3px;
}
</style>