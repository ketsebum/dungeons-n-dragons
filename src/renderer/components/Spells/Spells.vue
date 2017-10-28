<template>
  <div class="spells margins">
    <div class="row" style="margin-left: -1px">
      <router-link class="btn btn-dark" style="margin-left: 5px" to="/">Go to Main</router-link>
      <router-link class="btn btn-dark" style="margin-left: 5px" to="/app">Go to App</router-link>
      <input type="text" v-model="searchStr" style="margin-left: 5px" />
    </div>
    <div class="row">
        <div v-bind:class="displayClass"  v-for="(value, spell) in search(spells)" :key="spell">
          <b-card class="mb2" v-bind:class="{ active: value.active }">
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
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import fs from 'fs'
  import path from 'path'

export default {
  name: 'spells',
  components: {
    
  },
  data() {
    return { 
      spellsFile: 'static/spells.json',
      spells : {},
      searchStr: "",
    };
  },
  computed: {
    userSpells: {
      get() {
        return _.cloneDeep(this.$store.state.CharStore.character.info.spells);
      }
    },
    displayClass: function() {
      if(this.searchStr === "") {
        return "col-sm-6 col-md-4 col-lg-3";
      } else {
        return "col-sm-12 col-md-12 col-lg-6";
      }
    }
  },
  created: function () {
    if(this.$store.state.CharStore.character.info === undefined) this.loadCharacter();
    let fileContents = fs.readFileSync(path.join(this.spellsFile), 'utf8');
    this.spells = JSON.parse(fileContents);
    for(let userSpell in this.userSpells) {
      this.spells[userSpell].active = true;
    }
  },
  methods: {
    loadCharacter: function() {
      this.$store.commit("loadCharacter");
    },
    search: function (spells) {
      return this.filter(spells)
    },
    filter: function( spells) {
      var result = {}, searchResult = {}, filterResult = {}, key;
      if(this.searchStr !== "") {
        for (key in spells) {
            if (key.toUpperCase().includes(this.searchStr.toUpperCase())) {
                searchResult[key] = spells[key];
            }
        }
      } else {
        searchResult = spells;
      }

      result = searchResult;
      return result;
    },
    add: function(elem) {
      this.userSpells[elem.target.value] = this.spells[elem.target.value];
      this.spells[elem.target.value].active = true;
    },
    remove: function(elem) {
      this.userSpells[elem.target.value] = null;
      this.spells[elem.target.value].active = false;
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
.body {
  height: 300px;
  overflow-y: auto;
}
.mb2 {
  margin-top: 7px;
  margin-bottom: 5px;
}
.active {
  background-color:springgreen;
}
.footer-margin {
  margin-right: 5px;
}
.btn {
  margin-top: 3px;
}
</style>
