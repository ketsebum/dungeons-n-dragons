<template>
  <div class="row">
    <div class="form-group row col-sm-6" v-for="skill in skills" :key="skill.name">
      <label for="skill" class="col-sm-6 col-form-label">{{firstLetterCapitalized(skill.name)}}</label>
      <div class="col-sm-3">
        <span type="text" class="form-control" v-bind:class="[skill.color ? good : bad]">{{skill.val}}</span>
      </div>
      <div class="col-sm-3">
        <div class="btn-group-toggle" data-toggle="buttons">
          <label class="btn" v-bind:class="skill.prof ? success : failure">
            <input class="form-check-input" :value="skill.name" @click="update" type="checkbox" v-model="skill.prof"> P
          </label>
        </div>
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
      success: "btn-success",
      failure: "btn-secondary",
      good: "good",
      bad: "bad"
    };
  },
  computed:{
    skills: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.skills);
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