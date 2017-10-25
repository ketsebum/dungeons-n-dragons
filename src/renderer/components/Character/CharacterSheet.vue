<template>
  <div class="hello margins">
    <div class="row">
      <form class="col">
        <div class="form-row">
          <div class="form-group col-md-2">
            <label for="character-name">Character Name</label>
            <input type="text" class="form-control" id="character-name" v-model="char.info.name" placeholder="Character's Name">
          </div>
          <div class="form-group col-md-2">
            <label for="class">Class</label>
            <input type="text" class="form-control" id="class" v-model="char.info.dclass" placeholder="Class">
          </div>
          <div class="form-group col-md-1">
            <label for="level">Level</label>
            <input type="number" class="form-control" id="level" v-model="char.info.level" placeholder="1">
          </div>
          <div class="form-group col-md-2">
            <label for="race">Race</label>
            <input type="text" class="form-control" id="race" v-model="char.info.race" placeholder="Race">
          </div>
          <div class="form-group col-md-2">
            <label for="school">School</label>
            <input type="text" class="form-control" id="school" v-model="char.info.school" placeholder="School">
          </div>
          <div class="form-group col-md-1">
            <label for="background">Background</label>
            <input type="text" class="form-control" id="background" v-model="char.info.background" placeholder="Background">
          </div>
          <div class="form-group col-md-2">
            <label for="alignment">Alignment</label>
            <input type="text" class="form-control" id="alignment" v-model="char.info.alignment" placeholder="Alignment">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <!-- Stats -->
            <stats></stats>
            <hr>
            <!-- Skills -->
            <skills></skills>
            <!-- -->
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
  import Character from '../../models/Character'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    Skills,
    Stats
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
    this.calculateStats();
  },
  methods: {
    loadCharacter: function() {
      this.$store.commit("loadCharacter");
    },
    save: function() {
      this.store.set('character', this.char);
    },
    calculateStats: function() {
      for(let stat in this.char.info.stats) {
        let modifier = this.char.info.stats[stat].val;
        this.char.info.stats[stat].bonus = (modifier / 2) - 5;
        this.char.info.stats[stat].save = this.char.info.stats[stat].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
        this.char.info.stats[stat].bcolor = this.char.info.stats[stat].bonus >= 0;
        this.char.info.stats[stat].scolor = this.char.info.stats[stat].save >= 0;
      }
      for(let skill in this.char.info.skills) {
        let lStat = this.char.info.skills[skill].stat;
        let modifier = this.char.info.stats[lStat].val;
        this.char.info.skills[skill].val = this.char.info.skills[skill].prof ? (modifier / 2) - 3 : (modifier / 2) - 5;
        this.char.info.skills[skill].color = this.char.info.skills[skill].val >= 0;
      }
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
