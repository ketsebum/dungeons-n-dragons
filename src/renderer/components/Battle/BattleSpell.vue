<template>
  <div class="spells">
    <span style="background-color: lightblue; padding: 10px">Spells: Level 2 ({{level2}}/{{level2max}}) Level1 ({{level1}}/{{level1max}})</span>
    <button class="btn btn-warning" @click="ar1">Arcane Recovery 1</button>
    <button class="btn btn-warning" @click="ar2">Arcane Recovery 2</button>
    <button class="btn btn-warning" @click="lr">Long Rest</button>
    <br>
    <div class="row">
      <div class="col-md-4" v-for="(value, spell) in spells" :key="spell">
        <b-card class="mb2" v-bind:class="{ myspell: value.active }">
          <div slot="header" @click="expand">
            <span class="header" >{{spell}} - Level {{value.level}} - {{value.school}}</span>
          </div>

          <div class="body">
            <span class="title"><strong>Casting Time:</strong> </span>
            <span>{{ value.casting_time }}</span>
            <br>

            <span class="title"><strong>Duration:</strong> </span>
            <span>{{ value.duration }}</span>
            <br>

            <span class="title"><strong>Range:</strong> </span>
            <span>{{ value.range }}</span>
            <br>

            <div v-if="value.save !== ''">
              <span class="title"><strong>Save:</strong> </span>
              <span>{{ value.save }}</span>
              <br>
            </div>

            <span class="title"><strong>Description:</strong> </span>
            <span>{{ value.description }}</span>
          </div>
          <small slot="footer">
            <div class="row">
              <button class="btn btn-primary btn-block" @click="use" :value="spell">Use Spell</button>
            </div>
          </small>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "battlespell",
  data() {
    return {
      level1: 0,
      level2: 0,
      level1max: 4,
      level2max: 3
    };
  },
  computed:{
    spells: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.spells);
      }
    }
  },
  methods: {
    use: function(elem) {
      if(this.spells[elem.target.value].level === "1") this.level1++;
      if(this.spells[elem.target.value].level === "2") this.level2++;
    },
    ar1: function() {
      this.level1 = (this.level1 - 2) > 0 ? (this.level1 - 2) : 0;
    },
    ar2: function() {
      this.level2 = (this.level2 - 1) > 0 ? (this.level2 - 1) : 0;
    },
    lr: function() {
      this.level1 = 0;
      this.level2 = 0;
    },
    expand: function(elem) {
      if(elem.srcElement.parentNode.parentNode.parentNode.className.includes("mb2")) {
        if(elem.srcElement.parentNode.parentNode.parentNode.parentNode.className === 'col-md-4')
          elem.srcElement.parentNode.parentNode.parentNode.parentNode.className = 'col-md-12';
        else {
          elem.srcElement.parentNode.parentNode.parentNode.parentNode.className = 'col-md-4';
        }
      } else {
        if(elem.srcElement.parentNode.parentNode.parentNode.className === 'col-md-4')
          elem.srcElement.parentNode.parentNode.parentNode.className = 'col-md-12';
        else {
          elem.srcElement.parentNode.parentNode.parentNode.className = 'col-md-4';
        }
      }
    }
  }
};
</script>
<style scoped>
.spells {
  color: black;
}
.mbuttons {
    margin-left: 3px;
    margin-top: 3px;
}
.body {
  height: 100px;
  overflow-y: auto;
}
.mb2 {
  margin-top: 7px;
  margin-bottom: 5px;
  color: black;
}
</style>