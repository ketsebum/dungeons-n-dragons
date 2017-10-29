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
      <input type="text" class="form-control" @keyup="updateValue" :id="stat.name" placeholder="10" v-model.number="stat.val">
    </div>
    <div class="col-sm-2">
      <span type="text" class="form-control" :id="stat.name" v-bind:class="[stat.bcolor ? good : bad]">{{stat.bonus}}</span>
    </div>
    <div class="col-sm-2">
      <span type="text" class="form-control" :id="stat.name" v-bind:class="[stat.scolor ? good : bad]">{{stat.save}}</span>
    </div>
    <div class="col-sm-2 text-center">
      <div data-toggle="buttons">
        <label class="btn" v-bind:class="stat.prof ? success : failure">
          <input class="form-check-input" type="checkbox" @click="updateProf" :value="stat.name" v-model="stat.prof"> P
        </label>
      </div>
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
      success: "btn-success",
      failure: "btn-secondary",
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
    },
    updateValue: function(answer) {
      let send = {
        name: answer.target.id,
        value: answer.target.value
      }
      this.$store.dispatch("updateStatValue", send);
    },
    updateProf: function(answer) {
      this.$store.dispatch("toggleStatProf", answer.target.value);
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