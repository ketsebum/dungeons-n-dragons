<template>
  <div class="hello margins">
    <div class="row">
      <form class="col">
        <general></general>
        <div class="row">
          <div class="col-md-4">
            <stats></stats>
            <hr>
            <skills></skills>
          </div>
          <div class="col-md-4">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="armor">Armor Class</label>
                <input type="text" class="form-control" id="armor" v-model="char.info.armorClass" placeholder="10">
              </div>
              <div class="form-group col-md-4">
                <label for="init">Initiative</label>
                <input type="text" class="form-control" id="init" v-model="char.info.initiative" placeholder="0">
              </div>
              <div class="form-group col-md-4">
                <label for="speed">Speed</label>
                <input type="text" class="form-control" id="speed" v-model="char.info.speed" placeholder="30">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="mhp">Max Hit Points</label>
                <input type="text" class="form-control" id="mhp" v-model="char.info.maxHitPoints" placeholder="10">
              </div>
              <div class="form-group col-md-4">
                <label for="hp">Hit Points</label>
                <input type="text" class="form-control" id="hp" v-model="char.info.currHitPoints" placeholder="0">
              </div>
              <div class="form-group col-md-4">
                <label for="thp">Temp</label>
                <input type="text" class="form-control" id="thp" v-model="char.info.tempHitPoints" placeholder="0">
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-row">
              <div class="form-group col-md-12" v-for="(value, name) in char.info.personality" :key="name">
                <label for="mhp">{{firstLetterCapitalized(name)}}</label>
                <textarea type="textarea" class="form-control" id="mhp" v-model='value.val' placeholder="" />
              </div>
            </div>
            <button type="submit" @click="save" class="btn btn-primary">Save</button>
            <router-link class="btn btn-dark" to="/">Go to Main</router-link>
            <router-link class="btn btn-dark" to="/spells">Go to Spell Page</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import Skills from './Skills'
  import Stats from './Stats'
  import General from './General'
  import Character from '../../models/Character'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    Skills,
    Stats,
    General
  },
  data() {
    return {
      good: "good",
      bad: "bad",
      // char: new Character(),
      store: new Store({
        configName: 'characterSheet',
        defaults: {
          character: this.char
        }
      })
    };
  },
  computed: mapState({
    // map this.character to store.state.character
    char: state => state.CharStore.character,
  }),
  created: function () {
    //Load char with the last used character
    this.loadCharacter();
    // this.calculateStats();
  },
  methods: {
    loadCharacter: function() {
      this.$store.commit("loadCharacter");
    },
    save: function() {
      // console.log(this.char.info.skills);
      // this.store.set('character', new Character());
      // this.$store.commit("calculateSkills");
    },
    firstLetterCapitalized: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style scoped>
.margins {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}
.good {
  border-color: #28a745;
}
.bad {
  border-color: #dc3545;
}
</style>
