<template>
  <div class="form-row">
    <div class="form-group col-md-12" v-for="(value, name) in personality" :key="name">
      <label :for="name">{{firstLetterCapitalized(name)}}</label>
      <textarea type="textarea" :id="name" @keyup="update" class="form-control" v-model='value.val' placeholder="" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "general",
  data() {
    return {
      precursor: "form-group col-md-"
    };
  },
  computed:{
    personality: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.personality);
      }
    }
  },
  methods: {
    update: function(answer) {
      let send = {
        name: answer.target.id,
        value: answer.target.value
      }
      this.$store.commit("updatePersonalityValue", send);
    },
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>