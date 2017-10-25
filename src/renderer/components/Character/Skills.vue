<template>
  <div class="row">
    <!-- <div class="form-group row col-sm-6" v-for="(value, skill) in char.info.skills" :key="skill">
    <label for="skill" class="col-sm-6 col-form-label">{{firstLetterCapitalized(skill)}}</label>
    <div class="col-sm-4">
      <input type="text" class="form-control" v-bind:class="[value.color ? good : bad]" id="skill" placeholder="10" v-model.number="value.val">
    </div>
    <div class="col-sm-2 text-center">
      <input class="form-check-input" type="checkbox" v-model.number="value.prof">
    </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "skills",
  data() {
    return {
      good: "good",
      bad: "bad",
    };
  },
  computed: mapState({
    char: {
      get () {
        console.log(this.$store.state.CharStore.character);
        return this.$store.state.CharStore.character
      },
      set (value) {
        console.log(value);
        // this.$store.commit('updateMessage', value)
      }
    },
  }),
  created: function () {
    console.log(this.char);
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