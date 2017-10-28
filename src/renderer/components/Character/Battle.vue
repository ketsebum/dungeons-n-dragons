<template>
  <div class="form-row">
    <div class="form-group col-md-4" v-for="battle in battles" :key="battle.name">
      <label :for="battle.name">{{battle.display}}</label>
      <input type="text" class="form-control" @keyup="update" :id="battle.name" :value="battle.val">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "general",
  computed:{
    battles: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.battles);
      }
    }
  },
  methods: {
    update: function(answer) {
      let send = {
        name: answer.target.id,
        value: answer.target.value
      }
      this.$store.commit("updateBattleValue", send);
    }
  }
};
</script>