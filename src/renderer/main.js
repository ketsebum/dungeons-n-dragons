import BoostrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

/* Temporary Remove after next 2.5.2 upgrade */
let originalVueComponent = Vue.component
Vue.component = function(name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
/* Temporary Remove after next 2.5.2 upgrade */

Vue.use(BoostrapVue);

/* Temporary Remove after next 2.5.2 upgrade */
Vue.component = originalVueComponent
/* Temporary Remove after next 2.5.2 upgrade */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
