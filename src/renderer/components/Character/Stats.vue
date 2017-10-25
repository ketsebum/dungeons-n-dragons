<template>
<div>
  <div class="row">
    <span class="col-sm-2 text-center"><strong><u>Name</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Value</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Check</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Save</u></strong></span>
    <span class="col-sm-2 text-center"><strong><u>Prof</u></strong></span>
  </div>
  <div class="form-group row" v-for="(value, stat) in char.info.stats" :key="stat">
    <label for="stat" class="col-sm-2 col-form-label">{{firstLetterCapitalized(stat)}}</label>
    <div class="col-sm-2">
      <input type="text" class="form-control" id="stat" placeholder="10" v-model.number="value.val">
    </div>
    <div class="col-sm-2">
      <input type="text" class="form-control" id="" v-bind:class="[value.bcolor ? good : bad]" placeholder="0" v-model.number="value.bonus">
    </div>
    <div class="col-sm-2">
      <input type="text" class="form-control" id="" v-bind:class="[value.scolor ? good : bad]" placeholder="0" v-model.number="value.save">
    </div>
    <div class="col-sm-2 text-center">
      <input class="form-check-input" type="checkbox" v-model.number="value.prof">
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
  computed: mapState({
    char: state => state.CharStore.character,
  }),
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