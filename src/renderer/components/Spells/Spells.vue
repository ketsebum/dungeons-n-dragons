<template>
  <div class="bg">
    <div class="spells margins">
      <div class="row" style="margin-left: -1px">
        <navigation></navigation>
        <input type="text" class="top-bar" v-model="searchStr" placeholder="Search..."/>
        <div class="btn-group top-bar" data-toggle="buttons">
          <label class="btn btn-success top-bar" v-bind:class="{active: mySpells}">
            <input type="checkbox" v-model="mySpells">My Spells
          </label>
        </div>
        <div class="btn-group top-bar" data-toggle="buttons">
          <label class="btn btn-secondary" v-bind:class="{active: classd.active}" v-for="classd in filterSpells.class.options" :key="classd.name" >
            <input type="checkbox" :value="classd.name" @click="filterClass"> {{classd.name}}
          </label>
        </div>
      </div>
      <div class="row">
          <div v-bind:class="displayClass"  v-for="(value, spell) in search(spells)" :key="spell">
            <b-card class="mb2" v-bind:class="{ myspell: value.active }">
              <div slot="header">
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

                <span class="title"><strong>Save:</strong> </span>
                <span>{{ value.save }}</span>
                <br>
                <br>

                <span class="title"><strong>Description:</strong> </span>
                <span>{{ value.description }}</span>
                <br>
                <br>
              </div>
              <small slot="footer">
                <div class="row">
                  <span class="mx-auto">{{ value.components }} - Book: {{value.book}} pg. {{value.page}} - Classes: {{ value.classes }}</span>
                </div>
                <div class="row">
                <div class="mx-auto">
                  <button class="btn btn-primary" v-if="!value.active" @click="add" :value="spell">Add Spell</button>
                  <button class="btn btn-danger" v-else @click="remove" :value="spell">Remove Spell</button>
                </div>
                </div>
              </small>
            </b-card>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import fs from "fs";
import path from "path";
  import Navigation from '../Navigation/Navigation'

export default {
  name: "spells",
  components: {
    Navigation
  },
  data() {
    return {
      spellsFile: "static/spells.json",
      mySpells: true,
      checked: {},
      filterSpells: {
        active: false,
        class: {
          options: [
            {
              name: "Bard",
              value: "B",
              active: false
            }, {
              name: "Cleric",
              value: "C",
              active: false
            }, {
              name: "Druid",
              value: "D",
              active: false
            }, {
              name: "Monk",
              value: "M",
              active: false
            }, {
              name: "Paladin",
              value: "P",
              active: false
            }, {
              name: "Ranger",
              value: "R",
              active: false
            }, {
              name: "Sorcerer",
              value: "S",
              active: false
            }, {
              name: "Warlock",
              value: "W",
              active: false
            }, {
              name: "Wizard",
              value: "Z",
              active: false
            }
          ]
        }
      },
      spells: {},
      searchStr: ""
    };
  },
  computed: {
    userSpells: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.spells);
      }
    },
    displayClass: function() {
      if (this.searchStr === "") {
        return "col-sm-6 col-md-4 col-lg-3";
      } else {
        return "col-sm-12 col-md-12 col-lg-6";
      }
    }
  },
  created: function() {
    if (this.$store.state.CharStore.character.info === undefined) this.loadCharacter();
    let fileContents = fs.readFileSync(path.join(this.spellsFile), "utf8");
    this.spells = JSON.parse(fileContents);
    for (let userSpell in this.userSpells) {
      this.spells[userSpell].active = true;
    }
  },
  methods: {
    loadCharacter: function() {
      this.$store.commit("loadCharacter");
    },
    search: function(spells) {
      return this.filter(spells);
    },
    filter: function(spells) {
      var searchResult = {},
        filterResult = {};
      if (this.mySpells) {
        searchResult = this.searchFilter(this.userSpells, this.searchStr);
      } else {
        searchResult = this.searchFilter(spells, this.searchStr);
      }

      if (this.filterSpells.class.active) {
          filterResult = this.classFilter(searchResult)
        } else {
          filterResult = searchResult;
        }
      return filterResult;
    },
    searchFilter: function(arr, str) {
      let temp = {}, key;
      if (str !== "") {
        for (key in arr) {
          if (key.toUpperCase().includes(str.toUpperCase())) {
            temp[key] = arr[key];
          }
        }
      } else {
        temp = arr;
      }
      return temp;
    },
    classFilter: function(arr) {
      let temp = {}, key;
      this.filterSpells.class.options.forEach((v, i) => {
        if (v.active) {
          for (key in arr) {
            if (arr[key].classes.toUpperCase().includes(v.value.toUpperCase())) {
              temp[key] = arr[key];
            }
          }
        }
      });
      return temp;
    },
    add: function(elem) {
      this.userSpells[elem.target.value] = this.spells[elem.target.value];
      this.spells[elem.target.value].active = true;
      this.$store.commit("saveSpells", this.userSpells);
    },
    remove: function(elem) {
      delete this.userSpells[elem.target.value];
      this.spells[elem.target.value].active = false;
      this.$store.commit("saveSpells", this.userSpells);
    },
    filterClass: function(elem) {
      let count = 0;
      this.filterSpells.class.options.forEach((v, i) => {
        if (v.name === elem.target.value) {
          v.active = !v.active;
        }
        if (v.active) {
          count++;
        }
      });
      this.filterSpells.class.active = count > 0;
    }
  }
};
</script>

<style scoped>
.body {
  height: 300px;
  overflow-y: auto;
}
.mb2 {
  margin-top: 7px;
  margin-bottom: 5px;
  color: black;
}
.myspell {
  background-color: springgreen;
}
.footer-margin {
  margin-right: 5px;
}
.btn {
  margin-top: 3px;
}
.top-bar {
  margin-left: 5px;
}
.bg {
  background: url("~@/assets/wizard-bg.jpg") no-repeat center center fixed;
  color: white;
  height: 100vh;
}
</style>