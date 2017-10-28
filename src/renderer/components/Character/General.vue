<template>
  <div class="form-row">
    <div :class="precursor+gen.size"  v-for="gen in general" :key="gen.name">
      <label :for="gen.name">{{gen.display}}</label>
      <input type="text" class="form-control" :id="gen.name" v-model="gen.val" :placeholder="gen.placeholder">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
var _ = require('lodash');

export default {
  name: "general",
  data() {
    return {
      good: "good",
      bad: "bad",
      precursor: "form-group col-md-"
    };
  },
  computed:{
    general: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.general);
      },
      set(value) {
        // NEVER INVOKED
      }
    }
  },
  methods: {
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    update: function(answer) {
      this.$store.dispatch("toggleSkillProf", answer.target.value);
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