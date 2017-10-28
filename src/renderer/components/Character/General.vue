<template>
  <div class="form-row">
    <div :class="precursor+gen.size"  v-for="gen in general" :key="gen.name">
      <label :for="gen.name">{{gen.display}}</label>
      <input type="text" class="form-control" @keyup="update" :id="gen.name" v-model="gen.val" :placeholder="gen.placeholder">
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
    general: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.general);
      }
    }
  },
  methods: {
    update: function(answer) {
      let send = {
        name: answer.target.id,
        value: answer.target.value
      }
      this.$store.commit("updateGeneralValue", send);
    }
  }
};
</script>