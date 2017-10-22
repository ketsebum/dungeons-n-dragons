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
            <div class="row">
              <span class="col-sm-2 text-center"><strong><u>Name</u></strong></span>
              <span class="col-sm-2 text-center"><strong><u>Value</u></strong></span>
              <span class="col-sm-2 text-center"><strong><u>Check</u></strong></span>
              <span class="col-sm-2 text-center"><strong><u>Save</u></strong></span>
              <span class="col-sm-2 text-center"><strong><u>Prof</u></strong></span>
            </div>
            <!-- Stats -->
            <div class="form-group row" v-for="(value, stat) in char.info.stats" :key="stat">
              <label for="stat" class="col-sm-2 col-form-label">{{firstLetterCapitalized(stat)}}</label>
              <div class="col-sm-2">
                <input type="text" class="form-control" id="stat" placeholder="10" v-model.number="value.val">
              </div>
              <div class="col-sm-2">
                <input type="text" class="form-control" id="" v-bind:class="[value.bcolor ? good : bad]" placeholder="0" v-model.number="value.bonus">
              </div>
              <div class="col-sm-2">
                <input type="text" class="form-control" id="" v-bind:class="[value.scolor ? good : bad]" placeholder="0" v-model.number="value.save">
              </div>
              <div class="col-sm-2 text-center">
                <input class="form-check-input" type="checkbox" v-model.number="value.prof">
              </div>
            </div>
            <hr>
            <!-- Skills -->
            <div class="row">
              <div class="form-group row col-sm-6" v-for="(value, skill) in char.info.skills" :key="skill">
                <label for="skill" class="col-sm-6 col-form-label">{{firstLetterCapitalized(skill)}}</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" v-bind:class="[value.color ? good : bad]" id="skill" placeholder="10" v-model.number="value.val">
                </div>
                <div class="col-sm-2 text-center">
                  <input class="form-check-input" type="checkbox" v-model.number="value.prof">
                </div>
              </div>
            </div>
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
        </div>
        <button type="submit" @click="save" class="btn btn-primary">Save</button>
        <router-link class="btn btn-dark" to="/">Go to Main</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import Character from '../../models/Character'
  import Store from '../../../main/store'

export default {
  name: 'hello',
  components: {
    
  },
  data() {
    return {
      good: "good",
      bad: "bad",
      char: new Character(),
      store: new Store({
        configName: 'characterSheet',
        defaults: {
          character: this.char
        }
      })
    };
  },
  computed: mapState([
    // map this.people to store.state.people
    'people'
  ]),
  created: function () {
    //Load char with the last used character
    this.loadCharacter();
    this.calculateStats();
  },
  methods: {
    loadCharacter: function() {
      let load = this.store.get('character');
      if(load !== undefined) this.char = load;
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
.loader-text {
  color: #42b983;
}
.title {
  font-weight: bold;
  color: #42b983;
}
.mb2 {
  margin-bottom: 2px;
}
.card-overlay {
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0.35;
  z-index: 2000;
  display: block;
  background-color: black;
  height: 100%;
  width: 100%;
}
.loader {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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
