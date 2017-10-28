<template>
  <div class="row">
    <div class="form-group row col-sm-6" v-for="skill in skills" :key="skill.name">
      <label for="skill" class="col-sm-7 col-form-label">{{firstLetterCapitalized(skill.name)}}</label>
      <div class="col-sm-3">
        <span type="text" class="form-control" v-bind:class="[skill.color ? good : bad]" :value="skill.val">{{skill.val}}</span>
      </div>
      <div class="col-sm-2 text-center">
        <input class="form-check-input" :value="skill.name" @click="update" type="checkbox" v-model="skill.prof">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
var _ = require('lodash');

export default {
  name: "skills",
  data() {
    return {
      good: "good",
      bad: "bad"
    };
  },
  computed:{
    skills: {
      get() {
        let newVar = _.cloneDeep(this.$store.state.CharStore.character.info.skills);
        return newVar;
      },
      set(value) {
        // NEVER INVOKED
      }
    }
  },
  created: function () {
    this.$store.commit("calculateSkills");
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