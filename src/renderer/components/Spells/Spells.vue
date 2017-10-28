<template>
  <div class="spells margins">
    <div class="row" style="margin-left: -1px">
      <router-link class="btn btn-dark" style="margin-left: 5px" to="/">Go to Main</router-link>
      <router-link class="btn btn-dark" style="margin-left: 5px" to="/app">Go to App</router-link>
      <input type="text" v-model="searchStr" style="margin-left: 5px" />
    </div>
    <div class="row">
        <div v-bind:class="classSize" v-for="(value, spell) in search(spells)" :key="spell">
          <b-card class="mb2">
            <div slot="header">
              <span class="header" >{{spell}} - Level {{value.level}} - {{value.school}}</span>
            </div>

            <div class="body">
              <span class="title"><strong>Casting Time:</strong> </span>
              <span>{{ value.casting_time }}</span>
              <br>
              <br>

              <span class="title"><strong>Duration:</strong> </span>
              <span>{{ value.duration }}</span>
              <br>
              <br>

              <span class="title"><strong>Description:</strong> </span>
              <span>{{ value.description }}</span>
              <br>
              <br>
            </div>
            <small slot="footer">
              <div class="row">
                <span class="col-8">{{ value.components }}</span>
                <div class="col-4">
                  <button class="btn btn-primary">Add Spell</button>
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
    classSize: function() {
      if(this.searchStr === "") {
        return "col-sm-6 col-md-4 col-lg-3";
      } else {
        return "col-sm-12 col-md-12 col-lg-6";
      }
    }
  },
  created: function () {
    let fileContents = fs.readFileSync(path.join(this.spellsFile), 'utf8');
    this.spells = JSON.parse(fileContents);
  },
  methods: {
    search: function (spells) {
      return this.filter(spells)
    },
    filter: function( obj) {
      var result = {}, key;

      for (key in obj) {
          if (key.toUpperCase().includes(this.searchStr.toUpperCase())) {
              result[key] = obj[key];
          }
      }
      return result;
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
</style>
