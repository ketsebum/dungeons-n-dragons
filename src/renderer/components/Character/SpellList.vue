<template>
  <div>
    <span>Spells:</span>
    <hr>
    <button class="btn btn-info mbuttons" @click="selectSpell" :value="spell" v-for="(value, spell) in spells" :key="spell">{{spell}}</button>
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
    },
    selectedSpell: {
      get() {
        if(this.$store.state.CharStore.character.info.selectedSpell === undefined) {
          this.$store.state.CharStore.character.info.selectedSpell = "";
        }
        return this.$store.state.CharStore.character.info.selectedSpell;
      }
    }
  },
  methods: {
    selectSpell: function(elem) {
      this.$store.commit("selectSpell", elem.target.value);
      this.$router.push('spells');
    }
  }
};
</script>
<style scoped>
.mbuttons {
    margin-left: 3px;
    margin-top: 3px;
}
</style>