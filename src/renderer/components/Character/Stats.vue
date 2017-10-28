<template>
<div>
  <div class="row">
    <span class="col-sm-2 text-center"><strong><u>Name</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Value</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Check</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Save</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Prof</u></strong></span>
  </div>
  <div class="form-group row" v-for="stat in stats" :key="stat.name">
    <label for="stat" class="col-sm-2 col-form-label">{{firstLetterCapitalized(stat.name)}}</label>
    <div class="col-sm-2">
      <input type="text" class="form-control" :id="stat.name" placeholder="10" v-model.number="stat.val">
    </div>
    <div class="col-sm-2">
      <input type="text" class="form-control" :id="stat.name" v-bind:class="[stat.bcolor ? good : bad]" placeholder="0" v-model.number="stat.bonus">
    </div>
    <div class="col-sm-2">
      <input type="text" class="form-control" :id="stat.name" v-bind:class="[stat.scolor ? good : bad]" placeholder="0" v-model.number="stat.save">
    </div>
    <div class="col-sm-2 text-center">
      <input class="form-check-input" type="checkbox" v-model.number="stat.prof">
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "stats",
  data() {
    return {
      good: "good",
      bad: "bad",
    };
  },
  computed:{
    stats: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.stats);
      },
      set(value) {
        // NEVER INVOKED
      }
    }
  },
  created: function () {
    this.$store.commit("calculateStats");
  },
  methods: {
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>
<style scoped>
.good {
  border-color: #28a745;
}

.bad {
  border-color: #dc3545;
}
</style>